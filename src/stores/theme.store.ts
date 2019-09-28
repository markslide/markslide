import {useEffect, useState} from 'react'


export function ThemeStore() {
  const [theme, setTheme] = useState<string>('citrine')
  
  return {
    theme,
    setTheme,
  }
}
