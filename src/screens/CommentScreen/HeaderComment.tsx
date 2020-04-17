import React, { memo } from 'react';
import { Container, HeaderBase, View, Text } from 'shared';
import BackButton from 'components/BackButton/BackButton';
import { useSelector } from 'react-redux';
import { nightModeSelector } from 'store/selectors';

export interface HeaderCommentProps {
  title: string;
  subTitle?: string;
}

function HeaderComment({ title, subTitle }: HeaderCommentProps) {
  const nightMode = useSelector(nightModeSelector);

  return (
    <Container>
      <HeaderBase
        statusBarStyle={nightMode ? 'light-content' : 'dark-content'}
        Left={<BackButton tachyons={['pa1', 'nl2', 'mr2']} />}
        Center={
          <View tachyons={['itemsCenter', 'w60']}>
            <Text type="h7" numberOfLines={1}>
              {title}
            </Text>
            <Text type="small" numberOfLines={1}>
              {subTitle}
            </Text>
          </View>
        }
      />
    </Container>
  );
}
export default memo(HeaderComment);
