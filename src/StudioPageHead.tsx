import Head from 'next/head'
import { type ComponentProps, memo, useCallback,useEffect,useMemo, useState } from 'react'
import { type StudioTheme } from 'sanity'

// @ts-ignore -- this import is correct
import iconApple from '../static/apple-touch-icon.png'
// @ts-ignore -- this import is correct
import iconIco from '../static/favicon.ico'
// @ts-ignore -- this import is correct
import iconSvg from '../static/favicon.svg'
// @ts-ignore -- this import is correct
import icon192 from '../static/favicon-192.png'
// @ts-ignore -- this import is correct
import icon512 from '../static/favicon-512.png'
// @ts-ignore -- this import is correct
import webmanifest from '../static/webmanifest.json'

export interface StudioPageHeadProps {
  children?: ComponentProps<typeof Head>['children']
  themeColorLight?: string
  themeColorDark?: string
  title?: string
  favicons?: boolean
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
  favicons,
}: StudioPageHeadProps) {
  
  const inlineWebmanifest = useCallback(() => {
    const manifest = JSON.parse(JSON.stringify(webmanifest))
    const icons = manifest.icons.map((icon: any) => {
      // Inline manifests works best when URLs are absolute
      const src = icon.src === './favicon-192.png' ? interop(icon192) : icon.src === './favicon-512.png' ? interop(icon512) : icon.src
      return {...icon, src}
      // return {...icon, src: process.env.NEXT_PUBLIC_VERCEL_URL ? new URL(src, process.env.NEXT_PUBLIC_VERCEL_URL ).toString() : src}
    })
    return `data:application/manifest+json,${(JSON.stringify({...manifest, icons}))}`
  }, [])

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
      {favicons && <link rel="icon" href={interop(iconIco)} sizes="any" />}
      {favicons && (
        <link rel="icon" href={interop(iconSvg)} type="image/svg+xml" />
      )}
      {favicons && <link rel="apple-touch-icon" href={interop(iconApple)} />}
      {favicons && <link rel="manifest" href={inlineWebmanifest()} />}
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

// Interop between how Parcel and Next deals with asset imports
function interop(href: string | { src: string }): string {
  if (typeof href === 'string') {
    return href
  }
  return new URL(`${href.src}`, typeof document === 'undefined' ? 'http://example.com' : location.origin).toString()
}
