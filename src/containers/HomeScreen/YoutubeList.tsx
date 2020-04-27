import React, { FC } from 'react';
import { homeSectionYoutubeListSelector } from './selectors';
import { useSelector } from 'react-redux';
import { YoutubeListVideoItem } from 'api/YoutubeListVideo';
import { View, FlatList, tachyons, useTheme } from 'shared';
import Video from 'components/Video/Video';
import { HomeDataItem } from 'api/Home';
import { SCREEN_WIDTH } from 'shared/utils/screen';
import { isEmpty } from 'ramda';

export interface YoutubeListProps {
  sectionId: HomeDataItem['uid'];
}

const YoutubeList: FC<YoutubeListProps> = ({ sectionId }) => {
  const { sizes } = useTheme();
  const homeSectionYoutubeList = useSelector(homeSectionYoutubeListSelector);
  const youtubeListData = homeSectionYoutubeList.data[sectionId] || [];
  const youtubeListDataNotLast =
    !!youtubeListData && !isEmpty(youtubeListData) ? youtubeListData.filter((_, index) => index !== youtubeListData.length - 1) : [];
  const youtubeLastItem = youtubeListData[youtubeListData.length - 1];

  const isContainer = SCREEN_WIDTH > sizes.container;
  const sizeContainer = isContainer ? sizes.container : SCREEN_WIDTH;
  const containerMarginLeft = isContainer ? (SCREEN_WIDTH - sizes.container) / 2 : tachyons.mr3.marginRight;
  const footerMarginRight = isContainer ? SCREEN_WIDTH - sizes.container : tachyons.mr4.marginRight;
  const itemWidth = sizeContainer / 2.5;

  const renderYoutubeItem = (hasTachyons: boolean) => ({ item }: { item: YoutubeListVideoItem; index: number }) => {
    const uri = `https://www.youtube.com/watch?v=${item?.contentDetails?.videoId || item.id}`;

    return (
      <View {...(hasTachyons ? { tachyons: 'mr3' } : {})} style={{ width: itemWidth }}>
        <View tachyons={['br2', 'truncate']}>
          <Video uri={uri} thumbnailUri={item.snippet.thumbnails.medium.url} />
        </View>
      </View>
    );
  };

  return (
    <FlatList
      horizontal
      data={youtubeListDataNotLast}
      keyExtractor={item => String(item.id)}
      renderItem={renderYoutubeItem(true)}
      ListFooterComponent={
        <View style={{ marginRight: footerMarginRight }}>
          {renderYoutubeItem(false)({ item: youtubeLastItem, index: youtubeListData.length - 1 })}
        </View>
      }
      contentContainerStyle={[tachyons.pb4, { marginLeft: containerMarginLeft }]}
    />
  );
};

export default YoutubeList;
