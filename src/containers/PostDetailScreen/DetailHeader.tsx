import React, { memo, FC } from 'react';
import { TouchableOpacity, ActivityIndicator, Share, ShareContent } from 'react-native';
import { Link } from 'navigation';
import BackButton from 'components/BackButton/BackButton';
import { Icons, HeaderBase, View, useTheme, Toast, Text } from 'shared';
import FontSizeConfig, { FontSizeConfigProps } from 'components/FontSizeConfig/FontSizeConfig';
import { useSelector } from 'react-redux';
import { postTextSizeSelector } from 'containers/PostDetailScreen/selectors';
import i18n from 'utils/functions/i18n';
import { useActionSheet } from '@expo/react-native-action-sheet';
import isIOS from 'shared/utils/isIOS';

export interface DetailHeaderProps {
  backText?: string;
  translucent?: boolean;
  backgroundColor?: string;
  isFavorite: boolean;
  isFavoriteLoading: boolean;
  detailWebLink: string;
  onAfterBack?: () => void;
  onChangeTextSize?: FontSizeConfigProps['onChange'];
  onFavorite: () => void;
  onNavigateToComment?: () => void;
}

const DetailHeader: FC<DetailHeaderProps> = ({
  backText = '',
  translucent = false,
  backgroundColor = '',
  onAfterBack,
  onChangeTextSize,
  onFavorite,
  onNavigateToComment,
  isFavorite,
  isFavoriteLoading,
  detailWebLink,
}) => {
  const postTextSize = useSelector(postTextSizeSelector);
  const { colors, sizes } = useTheme();
  const { showActionSheetWithOptions } = useActionSheet();
  const shareContentIOS: ShareContent = {
    message: '',
    url: detailWebLink,
  };
  const shareContentAndroid: ShareContent = {
    message: detailWebLink,
  };
  const shareContent = isIOS ? shareContentIOS : shareContentAndroid;

  const handleShare = async () => {
    try {
      const result = await Share.share(shareContent);
      if (result.action === Share.sharedAction) {
        if (isIOS) {
          const isCopy = result.activityType?.includes('CopyToPasteboard');
          const toastText = i18n.t(isCopy ? 'copy' : 'thankYouForSharing');
          Toast.show({
            content: (
              <View tachyons={['flexRow', 'justifyBetween', 'itemsCenter', 'pa2']}>
                <Icons.Feather name={isCopy ? 'copy' : 'heart'} color="dark4" size={20} />
                <Text color="dark4">{toastText}</Text>
              </View>
            ),
          });
        }
      }
    } catch {
      console.log('share error');
    }
  };

  const handleActionSheet = () => {
    showActionSheetWithOptions(
      {
        options: [i18n.t('share'), i18n.t('seeResponse'), i18n.t('cancel')],
        cancelButtonIndex: 2,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            return handleShare();
          case 1:
            return onNavigateToComment?.();
          default:
            return false;
        }
      },
    );
  };

  return (
    <>
      <HeaderBase
        backgroundColor={translucent ? 'transparent' : backgroundColor || colors.light}
        Left={<BackButton backText={backText} color="dark2" tachyons={['pa1', 'nl2', 'mr2']} onAfterBack={onAfterBack} />}
        Right={[
          <View key="item1" justifyContent="center" alignItems="center" tachyons={['w2', 'h2', 'mr1']}>
            <FontSizeConfig onChange={onChangeTextSize} fontSizeSelected={postTextSize} />
          </View>,
          <View key="item2" justifyContent="center" alignItems="center" tachyons={['w2', 'h2', 'mr1']}>
            {isFavoriteLoading ? (
              <ActivityIndicator size="small" />
            ) : (
              <TouchableOpacity activeOpacity={0.7} onPress={onFavorite}>
                <Icons.FontAwesome name={isFavorite ? 'heart' : 'heart-o'} size={sizes.base * 1.4} color={isFavorite ? 'tertiary' : 'dark2'} />
              </TouchableOpacity>
            )}
          </View>,
          <View key="item3" justifyContent="center" alignItems="center" tachyons={['w2', 'h2']}>
            <Link to="SearchScreen" params={{ backButtonEnabled: true }} activeOpacity={0.7}>
              <Icons.Feather name="search" size={sizes.base * 1.5} color="dark2" />
            </Link>
          </View>,
          <View key="item4" justifyContent="center" alignItems="center" tachyons={['w2', 'h2']}>
            <TouchableOpacity activeOpacity={0.7} onPress={handleActionSheet}>
              <Icons.Feather name="more-horizontal" size={sizes.base * 1.5} color="dark2" />
            </TouchableOpacity>
          </View>,
        ]}
      />
    </>
  );
};

export default memo(DetailHeader);
