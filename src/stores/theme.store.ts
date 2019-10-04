import {useStorageState} from '@/utils/use-storage-state'
import {themes} from '@/utils/themes'

export function ThemeStore() {
  const [theme, setTheme] = useStorageState<string>('theme-id', themes[0].id)
  const [scheme, setScheme] = useStorageState<string>('theme-scheme-id', themes[0].schemes[0].id)
  const [dark, setDark] = useStorageState<string>('theme-dark-id', 'dark')
  
  return {
    theme,
    setTheme,
    scheme,
    setScheme,
    dark,
    setDark,
  }
}
