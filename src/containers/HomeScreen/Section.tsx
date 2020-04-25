import React, { FC } from 'react';
import AsyncComponent from 'components/AsyncComponent/AsyncComponent';
import { useSelector } from 'react-redux';
import { homeSectionsSelector, homeSectionNavigationsSelector } from './selectors';
import { HomeDataItem } from 'api/Home';
import { View, Image, Text, useTheme, Container } from 'shared';
import YoutubeList from './YoutubeList';
import SectionLoading from './SectionLoading';
import { NavigationSuspense, Link } from 'navigation';
import SectionHasNavigation from './SectionHasNavigation';
import Magazine from 'components/Magazine/Magazine';
import Retry from 'components/Retry/Retry';
import i18n from 'utils/functions/i18n';
import { useGetHomeSectionsRequest, useGetHomeSectionNavigationsRequest } from './actions/actionHome';
import { getMagazineType } from './getMagazineStyle';
import SwitchTitle from './SwitchTitle';
import SliderCategories from 'components/SliderCategories/SliderCategories';
import { HomeSectionDataItem } from 'api/HomeSection';
import { Category } from 'api/Categories';
import ButtonShowAll from './ButtonShowAll';
import IconBox from 'components/IconBox/IconBox';

export interface SectionProps {
  sectionSkeleton: HomeDataItem;
  sectionIndex: number;
}

const Section: FC<SectionProps> = ({ sectionSkeleton, sectionIndex }) => {
  const { colors } = useTheme();
  const homeSections = useSelector(homeSectionsSelector);
  const homeSectionNavigations = useSelector(homeSectionNavigationsSelector);
  const getHomeSectionsRequest = useGetHomeSectionsRequest();
  const getHomeSectionNavigationsRequest = useGetHomeSectionNavigationsRequest();
  const moduleTypesNotMagazine = ['appAds', 'appYoutube', 'appCategories'];

  const handleRetrySections = () => {
    getHomeSectionsRequest('');
    getHomeSectionNavigationsRequest('');
  };

  const renderSectionContent = () => {
    if (sectionSkeleton.moduleType.includes('appAds')) {
      return (
        <View tachyons="mb3">
          <Image uri={sectionSkeleton.ads.adsImage} />
        </View>
      );
    }
    if (sectionSkeleton.moduleType.includes('appYoutube')) {
      return <YoutubeList sectionId={sectionSkeleton.uid} />;
    }
    if (sectionSkeleton.moduleType.includes('appCategories')) {
      return (
        <SliderCategories
          data={homeSections.data[sectionSkeleton.uid]?.all?.data as Category[]}
          ListFooterComponent={
            <Link to="CategoryScreen" flex>
              <View flex justifyContent="center" alignItems="center" tachyons="br3" style={{ backgroundColor: colors.gray3 }}>
                <View tachyons="mb1">
                  <IconBox name="chevron-right" color="light" backgroundColor="primary" />
                </View>
                <Text type="h7" color="primary">
                  {i18n.t('viewAll')}
                </Text>
              </View>
            </Link>
          }
        />
      );
    }
    if (!!homeSectionNavigations?.data[sectionSkeleton.uid]) {
      return (
        <Container tachyons="ph3">
          <SectionHasNavigation sectionIndex={sectionIndex} sectionSkeleton={sectionSkeleton} />
        </Container>
      );
    }
    return (
      <View tachyons="ph3">
        <Magazine
          data={homeSections.data[sectionSkeleton.uid]?.all?.data as HomeSectionDataItem[]}
          {...getMagazineType(sectionSkeleton.moduleType)}
        />
      </View>
    );
  };

  return (
    <AsyncComponent
      status={homeSections.status}
      Request={<SectionLoading />}
      Success={
        <NavigationSuspense fallback={<SectionLoading />}>
          <View tachyons="mb3">
            {!!sectionSkeleton.general?.heading && (
              <Container tachyons="ph3">
                <SwitchTitle variant={sectionSkeleton.general.headingStyle} title={sectionSkeleton.general.heading} />
              </Container>
            )}
            {renderSectionContent()}
            <Container tachyons="ph3">
              {!moduleTypesNotMagazine.includes(sectionSkeleton.moduleType) && <ButtonShowAll sectionSkeleton={sectionSkeleton} />}
            </Container>
          </View>
        </NavigationSuspense>
      }
      Failure={sectionIndex === 0 && <Retry text={i18n.t('retry')} tachyons={['pv4', 'mt3']} onPress={handleRetrySections} />}
    />
  );
};

export default Section;
