import {useState} from 'react'


export function ThemeStore() {
  const [theme, setTheme] = useState<string>('citrine') // one-dark
  
  return {
    theme,
    setTheme,
  }
}
