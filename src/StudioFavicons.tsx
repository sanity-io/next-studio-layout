import Head from 'next/head'

import appleIcon from '../static/apple-touch-icon.png'
import favicon from '../static/favicon.ico'
import svgIcon from '../static/favicon.svg'
// @ts-ignore -- this import is correct
import webmanifest from '../static/webmanifest.json'
//const webmanifest = new URL('/static/manifest.webmanifest', import.meta.url);
console.log('stellar', webmanifest, favicon)

// Interop between how Parcel and Next deals with asset imports
function interop(href: string | { src: string }): string {
  if (typeof href === 'string') {
    return href
  }
  return href.src
}

export function StudioFavicons() {
  console.log()
  return (
    <Head>
      <link rel="icon" href={interop(favicon)} sizes="any" />
      <link rel="icon" href={interop(svgIcon)} type="image/svg+xml" />
      <link rel="apple-touch-icon" href={interop(appleIcon)} />
      {/* @TODO add support for bundling webmanifest */}
      {/* <link rel="manifest" href={`/manifest.webmanifest`} /> */}
    </Head>
  )
}
