import {useEffect, useState} from 'react'

interface WindowSize {
  width: number
  height: number
}

type Subscriber = (size: WindowSize) => void
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
  const [state, setState] = useState<WindowSize>(size)

  useEffect(() => {
    subscribers.add(setState)
    return () => {
      subscribers.delete(setState)
    }
  }, [])

  return state
}
