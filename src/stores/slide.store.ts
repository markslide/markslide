import {useMemo, useState} from 'react'
import {Proportion, proportionToFilmSize} from '@/classes/proportion'
import {defaultSlideText} from '@/utils/default-slide-text'

export function SlideStore() {
  const [text, setText] = useState(() => (
    localStorage.getItem('mdContent') || defaultSlideText
  ))
  const [proportion, setProportion] = useState<Proportion>(Proportion['4:3'])

  const filmSize = proportionToFilmSize[proportion]

  const slideTexts = useMemo(() => {
    if (!text) return []
    return parseFileContent(text)
  }, [text])

  function updateText(v: string) {
    setText(v)
    localStorage.setItem('mdContent', v)
  }

  return {
    updateText,
    text,
    slideTexts,
    proportion,
    filmSize,
  }
}


function parseFileContent(text: string) {
  let lines = text.split('\n')
  let inCodeBlock:boolean = false
  let temp:string = ''
  const slideTexts: string[] = []
  for (let k in  lines) {
    lines[k]+='\n'
    //handle code blocks
    if (lines[k].match(/^ *```/)) {
      inCodeBlock=!inCodeBlock
      temp+=lines[k]
      continue
    }
    if (inCodeBlock){
      temp+=lines[k]
      continue
    }
    //handle headings
    if (lines[k].match(/^ *##?#? /)) {
      if (temp.trim() != '') {
        slideTexts.push(temp)
      }
      temp=lines[k]
      continue
    }
    temp+=lines[k]
  }
  if (temp != '') {
    slideTexts.push(temp)
  }
  return slideTexts
}
