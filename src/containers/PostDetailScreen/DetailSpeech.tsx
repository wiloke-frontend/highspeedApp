import React, { FC } from 'react';
import { View } from 'shared';
import TextToSpeech from 'components/TextToSpeech/TextToSpeech';

export interface DetailSpeechProps {
  postDetailContent: string;
}

const DetailSpeech: FC<DetailSpeechProps> = ({ postDetailContent }) => {
  const text = postDetailContent
    // Cho tất cả thành 1 dòng
    .replace(/\n/g, '')
    // Tìm ký tự > thì đằng sau nó xuống dòng
    .replace(/>/g, text => `${text}\n`)
    // Tìm ký tự < thì đằng trước nó xuống dòng
    .replace(/</g, text => `\n${text}`)
    // Tìm thẻ đóng html và cho nó đằng trước và sau xuống dòng
    .replace(/<\/[a-zA-Z0-9]*>/g, text => `\n${text}\n`)
    // Sau đó xoá hết tất cả các thẻ html mở và đóng
    .replace(/^<.*>$/gm, '')
    // Làm đẹp đoạn text
    .replace(/\s+/g, ' ');
  return (
    <View tachyons={['absolute', 'right1', 'bottom1', 'z5']}>
      <TextToSpeech lang="en-US" text={text} />
    </View>
  );
};

export default DetailSpeech;
