import { ReactNode } from 'react';
import { AuthorInfoCardProps } from './AuthorInfoCardProps';

export interface DetailTemplateProps extends Omit<AuthorInfoCardProps, 'shadowColor' | 'style'> {
  title: string;
  backText?: string;
  featurePreview: string;
  featureImage: string;
  Content: ReactNode;
  Categories: ReactNode;
}
