# @sanity/next-studio-layout

[https://www.sanity.io/?utm_source=github&utm_medium=readme&utm_campaign=next-studio-layout](Sanity.io) toolkit for embedding [Studio v3](https://www.sanity.io/studio-v3) in [Next.js](https://nextjs.org/) apps.

## Why?

The latest version of Sanity Studio allows you to embed a near-infinitely configurable content editing interface into any React application. This opens up many possibilities:

- Any service that hosts Next.js apps can now host your Studio.
- Building previews for your content is easier as your Studio lives in the same environment.
- Use [Data Fetching](https://nextjs.org/docs/basic-features/data-fetching/overview) to configure your Studio.
- Easy setup of [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode).

## Installation

```bash
npm install --save @sanity/next-studio-layout@studio-v3
```

## Usage

The basic setup is two files:

1. `pages/[[...index]].tsx`

```tsx
// Import your sanity.config.ts file
import config from '../sanity.config'
import { StudioPageLayout } from ' @sanity/next-studio-layout'

export default function StudioPage() {
  // Loads the Studio, with all the needed neta tags and global CSS reqiired for it to render correctly
  return <StudioPageLayout config={config} />
}
```

2. `pages/_document.tsx`

```tsx
import { ServerStyleSheetDocument } from '@sanity/next-studio-layout'

// Set up SSR for styled-components, ensuring there's no missing CSS when deploying a Studio in Next.js into production
export default class Document extends ServerStyleSheetDocument {}
```

The `<StudioPageLayout />` wraps this component and supports forwarding all its props:

```tsx
import { Studio } from 'sanity'
```

If you want to go lower level and have more control over the studio you can pass `StudioProvider` and `StudioLayout` from `sanity` as `children`:

```tsx
import { StudioPageLayout } from ' @sanity/next-studio-layout'
import { StudioProvider, StudioLayout } from 'sanity'

import config from '../sanity.config'

function StudioPage() {
  return (
    <StudioPageLayout config={config}>
      <StudioProvider config={config}>
        {/* Put components here and you'll have access to the same React hooks as Studio gives you when writing plugins */}
        <StudioLayout />
      </StudioProvider>
    </StudioPageLayout>
  )
}
```

You can still customize `_document.tsx`:

```tsx
import { ServerStyleSheetDocument } from 'src'

export default class Document extends ServerStyleSheetDocument {
  static async getInitialProps(ctx: DocumentContext) {
    // You can still override renderPage:
    const originalRenderPage = ctx.renderPage
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => <App {...props} />,
      })

    const initialProps = await ServerStyleSheetDocument.getInitialProps(ctx)

    const extraStyles = await getStyles()
    return {
      ...initialProps,
      // Add to the default styles if you want
      styles: [initialProps.styles, extraStyles],
    }
  }
  render() {
    // do the same stuff as in `next/document`
  }
}
```
