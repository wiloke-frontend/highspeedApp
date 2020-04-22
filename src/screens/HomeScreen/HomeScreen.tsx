import React from 'react';
import { View, Container, FlatList, useMount } from 'shared';
import SectionLoading from 'screens/HomeScreen/SectionLoading';
import Retry from 'components/Retry/Retry';
import AsyncComponent from 'components/AsyncComponent/AsyncComponent';
import { useSelector } from 'react-redux';
import { homeSkeletonSelector, homeSectionsSelector } from './selectors';
import { useHomeMounted } from './actions/actionHome';
import { ScreenFC } from 'navigation';
import Section from './Section';
import HeaderDefault from 'components/HeaderDefault/HeaderDefault';
import ScreenContainer from 'components/ScreenContainer/ScreenContainer';

const HomeScreen: ScreenFC = ({ navigation }) => {
  const homeMounted = useHomeMounted();
  const homeSkeleton = useSelector(homeSkeletonSelector);
  const homeSections = useSelector(homeSectionsSelector);

  useMount(() => {
    homeMounted();
  });

  // return (
  //   <ZoomHandler>
  //     <Image uri={`https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500`} />
  //   </ZoomHandler>
  // );

  return (
    <ScreenContainer
      Header={
        <Container>
          <HeaderDefault />
        </Container>
      }
      safeAreaView
    >
      <View flex>
        <AsyncComponent
          status={homeSkeleton?.status}
          Request={<SectionLoading />}
          Success={
            <FlatList
              navigation={navigation}
              data={homeSkeleton?.data}
              keyExtractor={item => item.uid}
              extraData={homeSections.status === 'success'}
              renderItem={({ item, index }) => {
                return <Section sectionSkeleton={item} sectionIndex={index} />;
              }}
              initialNumToRender={2}
              showsVerticalScrollIndicator={false}
              refreshing={homeSkeleton?.status === 'loading'}
              onRefresh={homeMounted}
            />
          }
          Failure={<Retry tachyons={['pv4', 'mt3']} onPress={homeMounted} />}
        />
      </View>
    </ScreenContainer>
  );
};

export default HomeScreen;
