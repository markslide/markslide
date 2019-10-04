import {useStorageState} from '@/utils/use-storage-state'

export function ThemeStore() {
  const [theme, setTheme] = useStorageState<string>('theme', 'one-dark') // one-dark
  
  return {
    theme,
    setTheme,
  }
}
