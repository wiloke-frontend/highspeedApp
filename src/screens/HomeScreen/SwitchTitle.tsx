import React, { FC } from 'react';
import SectionTitle1 from 'components/SectionTitle1/SectionTitle1';
import SectionTitle2 from 'components/SectionTitle2/SectionTitle2';
import SectionTitle3 from 'components/SectionTitle3/SectionTitle3';
import SectionTitle4 from 'components/SectionTitle4/SectionTitle4';
import SectionTitle5 from 'components/SectionTitle5/SectionTitle5';
import SectionTitle6 from 'components/SectionTitle6/SectionTitle6';
import { HeadingStyle } from 'api/Home';

export interface SwitchTitleProps {
  variant: HeadingStyle;
  title: string;
}

const SwitchTitle: FC<SwitchTitleProps> = ({ variant, title }) => {
  switch (variant) {
    case 'style1':
      return <SectionTitle1 text={title} />;
    case 'style2':
      return <SectionTitle2 text={title} />;
    case 'style3':
      return <SectionTitle3 text={title} />;
    case 'style4':
      return <SectionTitle4 text={title} />;
    case 'style5':
      return <SectionTitle5 text={title} />;
    case 'style6':
      return <SectionTitle6 text={title} />;
    default:
      return null;
  }
};

export default SwitchTitle;
