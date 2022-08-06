import createClient from '@sanity/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ServerTiming } from 'src/ServerTiming'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const serverTiming = new ServerTiming()
  serverTiming.start('handler')

  try {
    const { host } = req.headers

    /*
    const client = createClient({
      projectId,
      dataset,
      apiVersion: '2022-07-10',
    })
 // */

    return res
      .status(200)
      .json({
        host,
        env: process.env.VERCEL,
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
    return res.status(500).json({ message: err.message })
  }
}
