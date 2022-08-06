import createClient from '@sanity/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ServerTiming } from 'src/ServerTiming'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const serverTiming = new ServerTiming()
  serverTiming.start('handler')

  try {
    const { host } = req.headers

    return res.status(200).json({ host })
    /*
    const client = createClient({
      projectId: Array.isArray(projectId) ? projectId[0] : projectId,
      dataset: Array.isArray(dataset) ? dataset[0] : dataset,
      apiVersion: '2022-07-10',
    })
    
    serverTiming.end('fetch')

    res.setHeader('Server-Timing', `${serverTiming}`)
    return res.status(200).json(palette)
    // */
  } catch (err: any) {
    res.setHeader('Server-Timing', `${serverTiming}`)
    return res.status(500).json({ message: err.message })
  }
}
