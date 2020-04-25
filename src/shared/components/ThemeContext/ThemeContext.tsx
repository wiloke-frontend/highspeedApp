import React, { createContext, ReactNode, useContext, FC, ComponentType } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import defaultColors from 'shared/themes/defaultColors';
import defaultSizes from 'shared/themes/defaultSizes';
import getDefaultStyles from 'shared/themes/getDefaultStyles';
import { ToastUI } from 'shared/components/Toast/Toast';
import { ModalBaseUI } from 'shared/components/ModalBase/ModalBase';
import getDisplayNameHOC from 'shared/utils/getDisplayNameHOC';
import { Colors } from 'shared/types/types';

export type Sizes = typeof defaultSizes;

export type Styled = ReturnType<typeof getDefaultStyles>;

export interface ThemeOverrides {
  colors?: Partial<Colors>;
  styled?: Partial<Styled>;
  sizes?: Partial<Sizes>;
  debug?: boolean;
}

export interface ThemeProviderProps {
  themeOverrides?: ThemeOverrides;
  children: ReactNode;
}

export const defaultTheme = {
  colors: defaultColors,
  sizes: defaultSizes,
  styled: getDefaultStyles(defaultColors),
  debug: false,
};

export type Theme = typeof defaultTheme;

const ThemeContext = createContext(defaultTheme);

export function ThemeProvider({ themeOverrides = defaultTheme, children }: ThemeProviderProps) {
  const colors = { ...defaultColors, ...themeOverrides.colors };
  const sizes = { ...defaultSizes, ...themeOverrides.sizes };
  const styled = { ...getDefaultStyles(colors), ...themeOverrides.styled };
  const debug = themeOverrides.debug || false;

  return (
    <SafeAreaProvider>
      <ThemeContext.Provider
        value={{
          ...themeOverrides,
          colors,
          sizes,
          styled,
          debug,
        }}
      >
        {children}
        <ToastUI />
        <ModalBaseUI />
      </ThemeContext.Provider>
    </SafeAreaProvider>
  );
}

export const ThemeConsumer = ThemeContext.Consumer;

export function useTheme() {
  const theme = useContext(ThemeContext);
  return theme;
}

export function withTheme<P extends object>(Component: ComponentType<P>) {
  const WithTheme: FC<P> = ({ ...rest }) => {
    const theme = useTheme();

    return <Component {...rest} theme={theme} />;
  };

  WithTheme.displayName = `WithTheme ${getDisplayNameHOC(Component)}`;

  return WithTheme;
}
