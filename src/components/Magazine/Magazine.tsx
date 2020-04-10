import React, { FC, memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import * as R from 'ramda';
import { Link } from 'navigation';
import { View, FlatList, FlatListProps, useMount, Container } from 'shared';
import Post1 from 'components/Post1/Post1';
import PostList1 from 'components/PostList1/PostList1';
import Skeleton from 'components/Skeleton/Skeleton';
import { Post } from 'api/Post';

interface DataItemType extends Post {}

export type TypeProp = 'standard1' | 'standard2' | 'list1' | 'list2' | 'list3' | 'list4' | 'grid1' | 'grid2';

interface MagazineProps {
  data?: DataItemType[];
  isLoading?: boolean;
  loadingItems?: number;
  type?: TypeProp;
  firstType?: TypeProp;
  containerStyle?: StyleProp<ViewStyle>;
  useFlatList?: boolean;
  flatListProps?: Partial<Omit<FlatListProps<DataItemType>, 'renderItem' | 'numColumns' | 'data' | 'keyExtractor'>>;
  keyExtractor?: (item: DataItemType, index: number) => string;
  onMount?: () => void;
}

const Magazine: FC<MagazineProps> = ({
  data = [],
  isLoading = false,
  loadingItems = 5,
  type = 'standard1',
  firstType = 'standard1',
  containerStyle = {},
  useFlatList = false,
  flatListProps = {},
  keyExtractor = (_item: DataItemType, index: number) => String(index),
  onMount = () => {},
}) => {
  const dataLoading = R.range(0, loadingItems);
  const numColumns = type.includes('grid') ? 2 : 1;
  const dataRemoveFirstItem = data.filter((_, index) => !!index);
  const firstItem = data[0];

  useMount(() => {
    onMount();
  });

  const getColumn = (index: number) => {
    const _type = index === 0 ? firstType : type;
    return _type.includes('grid') ? '3/6' : '6/6';
  };

  const handleKeyExtractor = (item: DataItemType, index: number): string => {
    return String(item.id || index);
  };

  const checkRenderPost = (type: TypeProp, item: DataItemType) => {
    switch (type) {
      case 'standard1':
        return <Post1 {...item} imageRounded />;
      case 'standard2':
        return <Post1 {...item} type="creative" imageRounded />;
      case 'list1':
        return <PostList1 {...item} imageRounded />;
      case 'list2':
        return <PostList1 {...item} size="small" imageRounded />;
      case 'list3':
        return <PostList1 {...item} imageRounded inverted />;
      case 'list4':
        return <PostList1 {...item} size="small" imageRounded inverted />;
      case 'grid1':
        return <Post1 {...item} size="small" imageRounded />;
      case 'grid2':
        return <Post1 {...item} type="creative" size="small" imageRounded />;
      default:
        return null;
    }
  };

  const checkRenderLoading = (type: TypeProp) => {
    if (type.includes('standard') || type.includes('grid')) {
      return <Skeleton image content imageRounded />;
    }
    if (type.includes('list')) {
      return <Skeleton image content type="horizontal" imageRounded />;
    }
    return null;
  };

  const renderPostItem = (item: DataItemType, index: number) => {
    const _type = index === 0 ? firstType : type;
    return (
      <View key={keyExtractor(item, index)} column={getColumn(index)} tachyons={['pb3', 'ph2']}>
        <Link push="PostDetailNotGetureDistance" params={item} activeOpacity={0.8}>
          {checkRenderPost(_type, item)}
        </Link>
      </View>
    );
  };

  const renderPostItemFlatList = ({ item }: { item: DataItemType }) => {
    return (
      <View tachyons="pb3">
        <Link push="PostDetailNotGetureDistance" params={item} activeOpacity={0.8}>
          {checkRenderPost(type, item)}
        </Link>
      </View>
    );
  };

  const renderLoadingItem = (item: number, index: number) => {
    const _type = index === 0 ? firstType : type;
    return (
      <View key={String(item)} column={getColumn(index)} tachyons="pa2">
        {checkRenderLoading(_type)}
      </View>
    );
  };

  return (
    <View flex tachyons="mb2" style={containerStyle}>
      {isLoading ? (
        <Container flex>
          <View flexDirection="row" tachyons="na2">
            {dataLoading.map(renderLoadingItem)}
          </View>
        </Container>
      ) : (
        !R.isEmpty(data) &&
        (useFlatList ? (
          <FlatList
            {...flatListProps}
            data={dataRemoveFirstItem}
            keyExtractor={handleKeyExtractor}
            ListHeaderComponent={
              <View tachyons="mb3">
                <Link push="PostDetailNotGetureDistance" params={firstItem} activeOpacity={0.8}>
                  {checkRenderPost(firstType, firstItem)}
                </Link>
              </View>
            }
            renderItem={renderPostItemFlatList}
            numColumns={numColumns}
            numGap={30}
            removeClippedSubviews={true}
            useContainer
          />
        ) : (
          <Container>
            <View flexDirection="row" flex tachyons={['nl2', 'nr2']}>
              {data.map(renderPostItem)}
            </View>
          </Container>
        ))
      )}
    </View>
  );
};

export default memo(Magazine);
