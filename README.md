# @sanity/next-studio-layout

## What is it?

A toolkit for embedding a Sanity Studio v3 on a Next.js route.

## Installation

```bash
npm install --save @sanity/next-studio-layout@studio-v3
```

## Usage

The basic setup is two files:

`pages/[[...index]].tsx`

```tsx
// Import your sanity.config.ts file
import config from '../sanity.config'
import { StudioPageLayout } from ' @sanity/next-studio-layout'

export default function StudioPage() {
  // Loads the Studio, with all the needed neta tags and global CSS reqiired for it to render correctly
  return <StudioPageLayout config={config} />
}
```

`pages/_document.tsx`

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
