import {useEffect, useState} from 'react'


export function ThemeStore() {
  const [theme, setTheme] = useState<string>('one-dark')
  
  return {
    theme,
    setTheme,
  }
}
