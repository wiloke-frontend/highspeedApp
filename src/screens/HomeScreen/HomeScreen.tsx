import React from 'react';
import { View, Container, useMount } from 'shared';
import SectionLoading from 'screens/HomeScreen/SectionLoading';
import Retry from 'components/Retry/Retry';
import AsyncComponent from 'components/AsyncComponent/AsyncComponent';
import { useSelector } from 'react-redux';
import { homeSkeletonSelector, homeSectionsSelector } from './selectors';
import { useHomeMounted } from './actions/actionHome';
import { ScreenFC } from 'navigation';
import Section from './Section';
import { FlatList } from 'react-native';
import HeaderDefault from 'components/HeaderDefault/HeaderDefault';

const HomeScreen: ScreenFC = () => {
  const homeMounted = useHomeMounted();
  const homeSkeleton = useSelector(homeSkeletonSelector);
  const homeSections = useSelector(homeSectionsSelector);

  useMount(() => {
    homeMounted();
  });

  return (
    <View flex safeAreaView>
      <Container>
        <HeaderDefault />
      </Container>
      <View flex>
        <AsyncComponent
          status={homeSkeleton?.status}
          Request={<SectionLoading />}
          Success={
            <FlatList
              data={homeSkeleton?.data}
              keyExtractor={item => item.uid}
              extraData={homeSections.status === 'success'}
              renderItem={({ item, index }) => {
                return <Section sectionSkeleton={item} sectionIndex={index} />;
              }}
              initialNumToRender={2}
              showsVerticalScrollIndicator={false}
            />
          }
          Failure={<Retry tachyons={['pv4', 'mt3']} onPress={homeMounted} />}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
