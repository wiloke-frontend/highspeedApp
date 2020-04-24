import React from 'react';
import { View, useMount, Text, Button, Container, FlatList, withViewStyles } from 'shared';
import { ScreenFC } from 'navigation';
import HeaderDefault from 'components/HeaderDefault/HeaderDefault';
import { useGetNotificationsRequest } from './actions/actionNotifications';
import { useSelector } from 'react-redux';
import { notificationsSelector, pageSelector, maxNumPagesSelector } from './selectors';
import { ActivityIndicator as RNActivityIndicator, Image as RNImage } from 'react-native';
import AsyncComponent from 'components/AsyncComponent/AsyncComponent';
import { Notify } from 'api/Notifications';
import { isEmpty } from 'ramda';
import Empty from 'components/Empty/Empty';
import { isLoggedInSelector } from 'screens/AuthContainer/selectors';
import i18n from 'utils/functions/i18n';
import { onOpenModalLogin } from 'components/ModalLogin/ModalLogin';
import { ScreenParams } from 'types/ScreenParams';
import Retry from 'components/Retry/Retry';
import NotifyItem from './NotifyItem';
import ScreenContainer from 'components/ScreenContainer/ScreenContainer';

const ActivityIndicator = withViewStyles(RNActivityIndicator);
const Image = withViewStyles(RNImage);

const NotifyScreen: ScreenFC<ScreenParams> = ({ navigation }) => {
  const getNotificationsRequest = useGetNotificationsRequest();
  const notifications = useSelector(notificationsSelector);
  const isLoggedIn = useSelector(isLoggedInSelector);
  const page = useSelector(pageSelector);
  const maxNumPages = useSelector(maxNumPagesSelector);

  const handleGetNotifications = (page: number) => {
    if (isLoggedIn) {
      getNotificationsRequest({
        endpoint: 'notifications',
        params: { page, postsPerPage: 20 },
      });
    }
  };

  const handleLoadmore = () => {
    if (!!notifications.pageNext && !!notifications.data.pagination && !!maxNumPages && notifications.pageNext <= maxNumPages) {
      handleGetNotifications(notifications.pageNext);
    }
  };

  useMount(() => {
    handleGetNotifications(1);
  });

  const renderListFooterComponent = () => {
    if (!!page && !!maxNumPages && page <= maxNumPages) {
      return <ActivityIndicator size="small" tachyons="pv2" />;
    }
    return null;
  };

  const renderNotify = ({ item, index }: { item: Notify; index: number }) => {
    return <NotifyItem item={item} index={index} />;
  };

  return (
    <ScreenContainer
      Header={
        <Container>
          <HeaderDefault title={navigation.state?.params?.title} backButtonEnabled={navigation.state?.params?.backButtonEnabled} />
        </Container>
      }
      safeAreaView
    >
      {isLoggedIn ? (
        <View flex>
          <AsyncComponent
            status={notifications.status}
            isDataEmpty={isEmpty(notifications.data.data ?? [])}
            useOldData
            Success={
              <FlatList
                navigation={navigation}
                data={notifications.data.data ?? []}
                keyExtractor={item => String(item.id)}
                renderItem={renderNotify}
                refreshing={notifications.status === 'loading'}
                onRefresh={() => handleGetNotifications(1)}
                showsVerticalScrollIndicator={false}
                onEndReached={handleLoadmore}
                ListFooterComponent={renderListFooterComponent}
              />
            }
            Empty={<Empty />}
            Failure={<Retry onPress={() => handleGetNotifications(1)} tachyons={['pv4', 'mt3']} />}
          />
        </View>
      ) : (
        <Container flex tachyons="pa3">
          <View flex justifyContent="center" alignItems="center">
            <Text type="h5" tachyons={['mb2', 'tc']} color="dark2">
              {i18n.t('youNeedToLoginToShowNotifications')}
            </Text>
            <Image source={require('assets/vectors/notify.jpg')} tachyons={['w100', 'h50']} resizeMode="contain" />
            <Button borderRadius="round" size="medium" onPress={onOpenModalLogin}>
              <Text type="h7" tachyons="ph4" style={{ color: '#fff' }}>
                {i18n.t('login')}
              </Text>
            </Button>
          </View>
        </Container>
      )}
    </ScreenContainer>
  );
};

export default NotifyScreen;
