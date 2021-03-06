export interface Theme {
  id: string
  name: string
  schemes: {
    id: string
    name: string
    hex: string
  }[]
  modes?: {
    id: string
    name: string
  }[]
}
