import * as React from 'react'
import {FC, useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import { ChromePicker } from 'react-color';
import {ColorPicker} from "@/components/color-picker";

interface Props {
  colors?: {[k:string]: string}
}

const ColorPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const ColorPanelGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  
  + div {
    margin-left: 50px;
  }
`

const defaultColors = {
  main: '#17ae7e',
  sub: '#e0faef',
  title: '#5f5f5f',
  text: '#5f5f5f',
  bg: '#fff'
}

export const ColorScheme: FC<Props> = (props) => {

  const [colors, _] = useState(props.colors || defaultColors)
  const [openingPicker, setOpeningPicker] = useState(null)
  const panelRef = useRef()

  function closePanel() {
    setOpeningPicker(null)
  }

  function doNothing(e:any) {
    if (!e.target.getAttribute('color'))
    e.stopPropagation()
  }

  useEffect(()=>{
    document.body.addEventListener('click', closePanel)
    return ()=>{
      document.body.removeEventListener('click', closePanel)
    }
  }, [])

  useEffect(()=>{
    if (panelRef.current)
      //@ts-ignore
      panelRef.current.addEventListener('click', doNothing)
    return ()=>{
      if (panelRef.current)
      //@ts-ignore
        panelRef.current.removeEventListener('click', doNothing)
    }
  }, [panelRef.current])

  function setColorScheme(title:string, v:string) {
    if (title === 'main') colors.main = v
    else if (title === 'sub') colors.sub = v
    else if (title === 'title') colors.title = v
    else if (title === 'text') colors.text = v
    else if (title === 'bg') colors.bg = v
  }

  return (
    <ColorPanel ref={panelRef}>
      <ColorPanelGroup>
        <ColorPicker value={colors.main} title='Main' isOpen={openingPicker==='Main'}
                     onOpen={()=>setOpeningPicker('Main')} onChange={(v:string)=>setColorScheme('main', v)}/>
        <ColorPicker value={colors.sub} title='Sub' isOpen={openingPicker==='Sub'}
                     onOpen={()=>setOpeningPicker('Sub')} onChange={(v:string)=>setColorScheme('sub', v)}/>
      </ColorPanelGroup>
      <ColorPanelGroup>
        <ColorPicker value={colors.title} title='Title' isOpen={openingPicker==='Title'}
                     onOpen={()=>setOpeningPicker('Title')} onChange={(v:string)=>setColorScheme('title', v)}/>
        <ColorPicker value={colors.text} title='Text' isOpen={openingPicker==='Text'}
                     onOpen={()=>setOpeningPicker('Text')} onChange={(v:string)=>setColorScheme('text', v)}/>
        <ColorPicker value={colors.bg} title='BG' isOpen={openingPicker==='BG'}
                     onOpen={()=>setOpeningPicker('BG')} onChange={(v:string)=>setColorScheme('bg', v)}/>
      </ColorPanelGroup>
    </ColorPanel>
  )
}
