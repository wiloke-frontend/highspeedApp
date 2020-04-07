import React from 'react';
import { View, Container, useMount } from 'shared';
import SectionLoading from 'screens/HomeScreen/SectionLoading';
import Retry from 'components/Retry/Retry';
import AsyncComponent from 'components/AsyncComponent/AsyncComponent';
import { useSelector } from 'react-redux';
import { homeSkeletonSelector, homeSectionsSelector } from './selectors';
import { useHomeMounted } from './actions/actionHome';
import { StackScreenFC } from 'types/Navigation';
import Section from './Section';
import { FlatList } from 'react-native';
import HeaderDefault from 'components/HeaderDefault/HeaderDefault';

// import TextInputMentions from 'components/TextInputMentions/TextInputMentions';
// import InputTagHighlight, { Ranges, Tag, Tags } from 'components/InputTagHighlight/InputTagHighlight';
// import { TouchableOpacity } from 'react-native';
// import { getDraftJsResultFromTagHighlight, getTagHighlightValuesFromDraftJs, Block, EntityMap } from 'utils/functions/supportDraftJs';
// import { UserComment } from 'api/Comment';

const HomeScreen: StackScreenFC = () => {
  const homeMounted = useHomeMounted();
  const homeSkeleton = useSelector(homeSkeletonSelector);
  const homeSections = useSelector(homeSectionsSelector);

  useMount(() => {
    homeMounted();
  });

  // const users = [
  //   { name: 'Wiloke Team', id: 1, avatar: '1', link: '1' },
  //   { name: 'Nguyen Long', id: 2, avatar: '2', link: '2' },
  //   { name: 'Wilcity', id: 3, avatar: '3', link: '3' },
  // ];

  // return (
  //   <View safeAreaView>
  //     <TextInputMentions
  //       users={users}
  //       keyExtractor={item => String(item.id)}
  //       renderUserItem={user => {
  //         return <Text>{user.name}</Text>;
  //       }}
  //       keyForMention="name"
  //       value="abcd Nguyen Long"
  //       entityMap={[
  //         {
  //           mentions: { name: 'Nguyen Long', id: 2, avatar: '2', link: '2' },
  //           range: { offset: 5, length: 11 },
  //         },
  //       ]}
  //       onChange={console.log}
  //       inputContainerStyle={{
  //         borderWidth: 1,
  //       }}
  //       userContainerStyle={{
  //         borderWidth: 1,
  //         borderColor: 'red',
  //       }}
  //     />

  //     <TextInputMentions
  //       readonly
  //       value="demo readonly Nguyen Long"
  //       keyForMention="name"
  //       entityMap={[
  //         {
  //           mentions: { name: 'Nguyen Long', id: 2, avatar: '2', link: '2' },
  //           range: { offset: 14, length: 11 },
  //         },
  //       ]}
  //       inputContainerStyle={{
  //         borderWidth: 1,
  //       }}
  //       mentionStyle={{
  //         backgroundColor: 'transparent',
  //         fontWeight: '700',
  //       }}
  //     />
  //   </View>
  // );

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
