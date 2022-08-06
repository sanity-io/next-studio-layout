import { createConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

import { schemaTypes } from './schemas'

export default createConfig({
  name: 'default',
  title: 'next-studio-layout',

  projectId: 'pv8y60vp',
  dataset: 'production',

  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },
})
