import createClient from '@sanity/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ServerTiming } from 'src/ServerTiming'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const serverTiming = new ServerTiming()
  serverTiming.start('handler')

  try {
    if (!projectId) {
      throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
    }
    if (!dataset) {
      throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET')
    }
    if (!token) {
      throw new Error('Missing SANITY_API_WRITE_TOKEN')
    }

    const { host } = req.headers

    if (!host) {
      throw new Error('Missing req.headers.host')
    }

    const vercelEnv = process.env.VERCEL_ENV
    if (!vercelEnv) {
      throw new Error('VERCEL_ENV is not set')
    }

    if (vercelEnv === 'development' && !host.startsWith('localhost:')) {
      throw new Error('VERCEL_ENV is development but host is not localhost')
    }

    if (vercelEnv !== 'development') {
      const vercelUrl = process.env.VERCEL_URL
      if (!vercelUrl) {
        throw new Error('VERCEL_URL is not set')
      }
      // Ignore URLs that are to specific deployments, otherwise we'd rack up CORS origins pretty fast
      if (host === vercelUrl) {
        throw new Error('VERCEL_URL is the same as host, ignoring')
      }
    }

    /*=
    const client = createClient({
      projectId,
      dataset,
      apiVersion: '2022-07-10',
    })
 // */

    return res.status(200).json({
      host,
      env: process.env.VERCEL_ENV,
      url: process.env.VERCEL_URL,
      projectId,
      dataset,
    })

    /*
    serverTiming.end('fetch')

    res.setHeader('Server-Timing', `${serverTiming}`)
    return res.status(200).json(palette)
    // */
  } catch (err: any) {
    res.setHeader('Server-Timing', `${serverTiming}`)
    return res.status(500).json({
      message: err.message,
      VERCEK_ENV: process.env.VERCEL_ENV,
      VERCEL_URL: process.env.VERCEL_URL,
      'req.headers.host': req.headers.host,
      projectId,
      dataset,
    })
  }
}
