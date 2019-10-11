import {useState} from 'react'

export function useStorageState<T extends string>(key: string, defaultValue: T) {
  const [state, setState] = useState<T>(() => (
    localStorage.getItem(key) || defaultValue
  ) as T)
  function updateState(value?: T) {
    if (value === undefined) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, value as string)
    }
    setState(value)
  }
  return [state, updateState] as [typeof state, typeof updateState]
}
