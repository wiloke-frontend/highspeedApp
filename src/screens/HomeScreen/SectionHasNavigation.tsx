import React, { FC, useMemo, useCallback, memo } from 'react';
import { View, tachyons } from 'shared';
import SectionLoading from './SectionLoading';
import { HomeDataItem } from 'api/Home';
import WilTabs from 'components/WilTabs/WilTabs';
import Magazine from 'components/Magazine/Magazine';
import { isEmpty } from 'ramda';
import Empty from 'components/Empty/Empty';
import i18n from 'utils/functions/i18n';
import { useSelector } from 'react-redux';
import { homeSkeletonSelector, homeSectionsSelector, homeSectionNavigationsSelector } from './selectors';
import { useGetHomeNavigationPostsRequest } from './actions/actionHome';
import { getMagazineType } from './getMagazineStyle';
import { HomeSectionDataItem } from 'api/HomeSection';

interface SectionHasNavigationProps {
  sectionSkeleton: HomeDataItem;
  sectionIndex: number;
}

const SectionHasNavigation: FC<SectionHasNavigationProps> = ({ sectionSkeleton, sectionIndex }) => {
  const getHomeNavigationPostsRequest = useGetHomeNavigationPostsRequest();
  const homeSkeleton = useSelector(homeSkeletonSelector);
  const homeSections = useSelector(homeSectionsSelector);
  const homeSectionNavigations = useSelector(homeSectionNavigationsSelector);

  const getTabs = useMemo(() => {
    return [
      {
        title: i18n.t('all'),
        key: 'all',
      },
      ...(!!homeSectionNavigations?.data[sectionSkeleton.uid]
        ? homeSectionNavigations?.data[sectionSkeleton.uid].map(item => ({
            title: item.name,
            key: item.endpoint,
          }))
        : []),
    ];
  }, [homeSectionNavigations, sectionSkeleton.uid]);

  const handleTabChange = useCallback(
    (key: string, sectionIndex: number) => () => {
      if (!!key && key !== 'all') {
        getHomeNavigationPostsRequest({ endpoint: key, uid: sectionSkeleton.uid, params: homeSkeleton.data[sectionIndex].params });
      }
      // tải trước tab tiếp theo
      // if (!!nextItem.key) {
      //   getHomeSectionSwipeNavigation({ endpoint: nextItem.key, uid: sectionSkeleton.uid, params: home.data[sectionIndex].params });
      // }
    },
    [getHomeNavigationPostsRequest, homeSkeleton.data, sectionSkeleton.uid],
  );

  return (
    <View tachyons={['nt2', 'nb2', 'nl3', 'nr3']}>
      <WilTabs
        data={getTabs}
        renderItem={({ key }) => {
          if (!homeSections?.data[sectionSkeleton.uid][key]?.data) {
            return (
              <View onMount={handleTabChange(key, sectionIndex)}>
                <SectionLoading />
              </View>
            );
          }

          if (!!homeSections?.data[sectionSkeleton.uid][key]?.data && isEmpty(homeSections?.data[sectionSkeleton.uid][key]?.data)) {
            return <Empty text="Empty" />;
          }

          if (homeSections?.data[sectionSkeleton.uid][key]?.status === 'failure') {
            return null;
          }

          return (
            <Magazine
              data={homeSections?.data[sectionSkeleton.uid][key]?.data as HomeSectionDataItem[]}
              containerStyle={tachyons.ph3}
              {...getMagazineType(sectionSkeleton.moduleType)}
            />
          );
        }}
        // onSwipeEnd={this._handleTabChange(sectionSkeleton, index)}
        // onTabPress={this._handleTabChange(sectionSkeleton, index)}
        tabBarWrapStyle={[tachyons.mb2, tachyons.ml3, tachyons.mr3]}
        lazy
      />
    </View>
  );
};

export default memo(SectionHasNavigation);
