import { ServerTiming } from 'src/ServerTiming'

const numberRegex = /([0-9]*[.])?[0-9]+/g

test('creates a Server-Timing header', async () => {
  const serverTiming = new ServerTiming()
  serverTiming.start('handler')
  await new Promise((resolve) => setTimeout(resolve, 100))
  serverTiming.end('handler')

  const [dur] = serverTiming.toString().match(numberRegex) as any
  expect(Number(dur)).toBeGreaterThanOrEqual(100)
  expect(`${serverTiming}`.replace(numberRegex, '100')).toMatchInlineSnapshot(
    `"handler;dur=100"`
  )
})

test('Forgot to end a timing? We gotchu', async () => {
  const serverTiming = new ServerTiming()
  serverTiming.start('handler')
  serverTiming.start('fetch', 'GROQ query')
  await new Promise((resolve) => setTimeout(resolve, 100))
  serverTiming.end('handler')

  const [handlerDur, fetchDur] = serverTiming
    .toString()
    .match(numberRegex) as any
  expect(Number(handlerDur)).toBeGreaterThanOrEqual(100)
  expect(Number(fetchDur)).toBeGreaterThanOrEqual(100)
  expect(`${serverTiming}`.replace(numberRegex, '100')).toMatchInlineSnapshot(
    `"handler;dur=100,fetch;desc=\\"GROQ query\\";dur=100"`
  )
})

test('No timings no stress', () => {
  expect(`${new ServerTiming()}`).toBe('')
})
