import Head from 'next/head'
import { type ComponentProps, memo, useMemo } from 'react'
import { type StudioTheme } from 'sanity'

export interface StudioPageHeadProps {
  children?: ComponentProps<typeof Head>['children']
  themeColorLight?: string
  themeColorDark?: string
  title?: string
}

export type MetaThemeColors = Required<
  Pick<StudioPageHeadProps, 'themeColorLight' | 'themeColorDark'>
>
export const useBackgroundColorsFromTheme = (
  theme: StudioTheme
): MetaThemeColors => {
  return useMemo<MetaThemeColors>(
    () => ({
      themeColorLight: theme.color.light.default.base.bg,
      themeColorDark: theme.color.dark.default.base.bg,
    }),
    [theme]
  )
}

export const StudioPageHead = memo(function StudioPageHead({
  children,
  themeColorDark,
  themeColorLight,
  title = 'Sanity Studio',
}: StudioPageHeadProps) {
  return (
    <Head>
      <meta
        name="viewport"
        // Studio implements display cutouts CSS (The iPhone Notch ™ ) and needs `viewport-fit=covered` for it to work correctly
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <meta name="robots" content="noindex" />
      <meta name="referrer" content="same-origin" />
      <title>{title}</title>
      {/* These theme-color tags makes the Studio look really really good on devices like iPads as the browser chrome adopts the Studio background */}
      {themeColorLight && (
        <meta
          key="theme-color-light"
          name="theme-color"
          content={themeColorLight}
          media="(prefers-color-scheme: light)"
        />
      )}
      {themeColorDark && (
        <meta
          key="theme-color-dark"
          name="theme-color"
          content={themeColorDark}
          media="(prefers-color-scheme: dark)"
        />
      )}
      {children}
    </Head>
  )
})
