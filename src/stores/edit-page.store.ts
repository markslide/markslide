import {useMemo, useState} from 'react'
import {useStore} from 'reto'
import {SlideStore} from '@/stores/slide.store'

export function EditPageStore() {
  const slideStore = useStore(SlideStore)

  const [selectedPreview, setSelectedPreview] = useState<number>(0)

  const highlightLines = useMemo(() => {
    const lines: number[] = []
    let count = 0
    slideStore.slideTexts.forEach((texts, index) => {
      const lineCount = texts.split('\n').length - 1
      if (index === selectedPreview) {
        for (let i = 0; i < lineCount; i++) {
          lines.push(count + i)
        }
      } else {
        count += lineCount
      }
    })
    return lines
  }, [selectedPreview, slideStore.slideTexts])

  return {
    slideStore,
    selectedPreview,
    setSelectedPreview,
    highlightLines,
  }
}
