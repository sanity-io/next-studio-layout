import Head from 'next/head'
import { type StudioProps, defaultTheme, Studio } from 'sanity'

import { StudioPageGlobalStyle, StudioPageGlobalStyleProps } from '.'

// Use the same bg colors as the studio
const lightBg = defaultTheme.color.light.default.base.bg
const darkBg = defaultTheme.color.dark.default.base.bg

export interface StudioPageLayoutProps extends StudioProps {
  /**
   * Override how the Studio renders by passing children.
   * This is useful for advanced use cases where you're using StudioProvider and StudioLayout instead of Studio:
   * import {StudioProvider, StudioLayout} from 'sanity'
   * import {StudioPageLayout} from '@sanity/next-studio-layout'
   * <StudioPageLayout config={config}>
   *   <StudioProvider config={config}>
   *     <CustomComponentThatUsesContextFromStudioProvider />
   *     <StudioLayout />
   *   </StudioProvider>
   * </StudioPageLayout>
   */
  children?: React.ReactNode
  /**
   * Turns off the default global styling
   */
  noGlobalStyle?: boolean
  /**
   * Apply fix with SVG icon centering that happens if TailwindCSS is loaded, on by defautl
   */
  fixTailwindSvg?: StudioPageGlobalStyleProps['fixTailwindSvg']
}
/**
 * Intended to render at the root of a page, letting the Studio own that page and render much like it would if you used `npx sanity start` to render
 */
export const StudioPageLayout = ({
  children,
  config,
  noGlobalStyle,
  fixTailwindSvg,
  ...props
}: StudioPageLayoutProps) => {
  return (
    <>
      {children || <Studio config={config} {...props} />}
      <Head>
        <meta
          name="viewport"
          // Studio implements display cutouts CSS (The iPhone Notch ™ ) and needs `viewport-fit=covered` for it to work correctly
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="robots" content="noindex" />
        <meta name="referrer" content="same-origin" />
        <title>Sanity Studio</title>
        {/* These theme-color tags makes the Studio look really really good on devices like iPads as the browser chrome adopts the Studio background */}
        <meta
          key="theme-color-light"
          name="theme-color"
          content={lightBg}
          media="(prefers-color-scheme: light)"
        />
        <meta
          key="theme-color-dark"
          name="theme-color"
          content={darkBg}
          media="(prefers-color-scheme: dark)"
        />
      </Head>
      {!noGlobalStyle && (
        <StudioPageGlobalStyle bg={lightBg} fixTailwindSvg={fixTailwindSvg} />
      )}
    </>
  )
}

/*
        <Favicons basePath={basePath} />
*/
