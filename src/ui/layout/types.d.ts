export type TColorScheme = 'auto' | 'light' | 'dark';
export type TInputStyle = 'outlined' | 'filled';
export type TMenuMode =
  | 'static'
  | 'overlay'
  | 'slim'
  | 'slim-plus'
  | 'reveal'
  | 'drawer'
  | 'horizontal';
export type TMenuTheme = 'colorScheme' | 'primaryColor' | 'transparent';
export type TScale = 12 | 13 | 14 | 15 | 16;

export interface ILayoutConfig {
  preset: string,
  primary: string,
  surface: string | null,
  darkTheme: boolean,
  menuMode: TMenuMode,
  colorScheme: TColorScheme;
  menuTheme: TMenuTheme;
}

export interface ILayoutState {
  staticMenuDesktopInactive: boolean,
  overlayMenuActive: boolean,
  sidebarActive: boolean,
  anchored: boolean,
  overlaySubmenuActive: boolean,
  profileSidebarVisible: boolean,
  configSidebarVisible: boolean,
  staticMenuMobileActive: boolean,
  menuHoverActive: boolean,
  activeMenuItem: string | null,
}

export interface IPrimaryColor {
  name: string,
  palette: {
    [key: number]: string,
  },
}
