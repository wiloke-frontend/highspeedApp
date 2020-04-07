import { tailwindStyles } from 'shared/themes/tailwind';
import { Tailwind } from 'shared/types/types';

export const getTailwindStyle = (tailwind: Tailwind) => {
  return typeof tailwind === 'string' ? tailwindStyles[tailwind] : tailwind.map(style => tailwindStyles[style]);
};
