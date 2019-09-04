import {Size} from '@/classes/size'

export enum Proportion {
  '16:9',
  '4:3',
}

export const proportionToFilmSize: {
  [key: number]: Size
} = {
  [Proportion['16:9']]: {
    width: 800,
    height: 450
  },
  [Proportion['4:3']]: {
    width: 800,
    height: 600
  },
}
