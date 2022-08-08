import config from 'sanity.config'
import { StudioPageLayout, useConfigWithBasePath } from 'src'

export default function StudioPage() {
  return (
    <StudioPageLayout
      config={useConfigWithBasePath(config)}
      // Turn off login in production so that anyone can look around in the Studio and see how it works
      unstable_noAuthBoundary={
        process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
      }
    />
  )
}
