import {useStorageState} from '@/utils/use-storage-state'

export function ThemeStore() {
  const [theme, setTheme] = useStorageState<string>('theme-id', 'one-dark') // one-dark
  const [scheme, setScheme] = useStorageState<string>('theme-scheme-id', '')
  
  return {
    theme,
    setTheme,
    scheme,
    setScheme,
  }
}
