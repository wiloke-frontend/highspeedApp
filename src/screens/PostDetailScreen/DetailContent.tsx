import React, { FC, CSSProperties } from 'react';
import { NavigationSuspense, Link } from 'navigation';
import HtmlViewer from 'components/HtmlViewer/HtmlViewer';
import { Button, Text, View, useTheme } from 'shared';
import DetailTags from './DetailTags';
import Magazine from 'components/Magazine/Magazine';
import SectionTitle from 'components/SectionTitle/SectionTitle';
import i18n from 'utils/functions/i18n';
import Skeleton from 'components/Skeleton/Skeleton';
import { useSelector } from 'react-redux';
import { historyPostsSelector, postTextSizeSelector } from './selectors';
import { CommentScreenParams } from 'screens/CommentScreen/CommentsScreen';
import getHtmlViewerTextStyles from 'utils/functions/getHtmlViewerTextStyles';

interface DetailContentProps {
  postDetail: ValueOf<AppState['postDetails']>;
  postDetailRelatedPost: ValueOf<AppState['postDetailRelatedPosts']>;
}

const DetailContent: FC<DetailContentProps> = ({ postDetail, postDetailRelatedPost }) => {
  const { colors } = useTheme();
  const historyPosts = useSelector(historyPostsSelector);
  const postTextSize = useSelector(postTextSizeSelector);

  const checkTagStyles = (): { [key: string]: CSSProperties } => {
    switch (postTextSize) {
      case 'large':
        return getHtmlViewerTextStyles(20, colors.primary);
      case 'medium':
        return getHtmlViewerTextStyles(18, colors.primary);
      case 'small':
        return getHtmlViewerTextStyles(15, colors.primary);
      default:
        return {};
    }
  };

  if (postDetail?.status === 'loading' && !postDetail?.data) {
    return <Skeleton content />;
  }

  if (postDetail?.status === 'failure') {
    return <Text>{postDetail?.message}</Text>;
  }

  return (
    <NavigationSuspense fallback={<Skeleton content />}>
      <HtmlViewer html={postDetail?.data?.description ?? ''} tagsStyles={checkTagStyles()} />
      {!!postDetail?.data?.postTags && <DetailTags postTags={postDetail?.data?.postTags} />}
      {!!postDetail?.data && (
        <>
          <Link
            to="Comments"
            activeOpacity={0.7}
            tachyons="mb3"
            params={{ id: postDetail?.data?.id, title: postDetail?.data?.title } as CommentScreenParams}
          >
            <Button disabled block borderRadius="round" backgroundColor="transparent" borderColor="primary" color="primary" tachyons="mt2">
              {`${i18n.t('seeResponse')} (${postDetail?.data?.commentCount})`}
            </Button>
          </Link>
          {postDetailRelatedPost?.status === 'loading' && !postDetailRelatedPost?.data ? (
            <Magazine isLoading type="list2" firstType="list2" />
          ) : (
            <View>
              <SectionTitle text={postDetailRelatedPost?.data?.title ?? ''} color="primary" />
              <View tachyons="nt2">
                <Magazine data={postDetailRelatedPost?.data?.data} type="list2" firstType="list2" />
              </View>
            </View>
          )}
          <SectionTitle text="Viewed posts" color="primary" />
          <View tachyons="nt2">
            <Magazine data={historyPosts} type="list2" firstType="list2" />
          </View>
        </>
      )}
    </NavigationSuspense>
  );
};

export default DetailContent;
