import {Size} from '@/classes/size'

export enum Ratio {
  '16:9' = '16:9',
  '4:3' = '4:3',
}

export const ratioToFilmSize: {
  [key: string]: Size
} = {
  [Ratio['16:9']]: {
    width: 1280,
    height: 720
  },
  [Ratio['4:3']]: {
    width: 960,
    height: 720
  },
}
