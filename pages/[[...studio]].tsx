import config from 'sanity.config'
import { StudioPageLayout } from 'src'

export default function StudioPage() {
  return (
    <StudioPageLayout
      config={config}
      // Turn off login in production so that anyone can look around in the Studio and see how it works
      unstable_noAuthBoundary={process.env.VERCEL_ENV === 'production'}
    />
  )
}
