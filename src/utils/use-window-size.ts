import {useEffect, useState} from 'react'
import {Size} from '@/classes/size'

type Subscriber = (size: Size) => void
const subscribers = new Set<Subscriber>()

let size = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  size = {
    width: window.innerWidth,
    height: window.innerHeight,
  }
  for (const subscriber of subscribers) {
    subscriber(size)
  }
})

export function useWindowSize() {
  const [state, setState] = useState<Size>(size)

  useEffect(() => {
    subscribers.add(setState)
    return () => {
      subscribers.delete(setState)
    }
  }, [])

  return state
}
