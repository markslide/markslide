import {useMemo, useState} from 'react'
import {Ratio, ratioToFilmSize} from '@/classes/ratio'
import {defaultSlideText} from '@/utils/default-slide-text'
import {useStorageState} from '@/utils/use-storage-state'

export function SlideStore() {
  const [text, setText] = useStorageState('mdContent', defaultSlideText)
  const [ratio, setRatio] = useStorageState<Ratio>('ratio', Ratio['4:3'])

  console.log(ratio)

  const filmSize = ratioToFilmSize[ratio]

  const slideTexts = useMemo(() => {
    if (!text) return []
    return parseFileContent(text)
  }, [text])

  return {
    setText,
    text,
    slideTexts,
    ratio,
    setRatio,
    filmSize,
  }
}


function parseFileContent(text: string) {
  let lines = text.split('\n')
  let inCodeBlock: boolean = false
  let temp: string = ''
  const slideTexts: string[] = []
  for (let k in  lines) {
    lines[k]+='\n'
    //handle code blocks
    if (lines[k].match(/^ *```/)) {
      inCodeBlock = !inCodeBlock
      temp += lines[k]
      continue
    }
    if (inCodeBlock){
      temp += lines[k]
      continue
    }
    //handle headings
    if (lines[k].match(/^ *##?#? /)) {
      if (temp.trim() != '') {
        slideTexts.push(temp)
        temp = lines[k]
      } else {
        temp += lines[k]
      }
      continue
    }
    temp += lines[k]
  }
  if (temp != '') {
    slideTexts.push(temp)
  }
  return slideTexts
}
