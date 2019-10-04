import {useState} from 'react'


export function ThemeStore() {
  const [theme, setTheme] = useState<string>('one-dark') // one-dark
  
  return {
    theme,
    setTheme,
  }
}
