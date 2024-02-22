import { config } from 'ui'

export type Conf = typeof config

declare module 'ui' {
  interface TamaguiCustomConfig extends Conf {}
}
