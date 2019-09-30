import {Slide} from '@/components/slide'
import React, {FC, memo} from 'react'
import styled, {css} from 'styled-components'
import {useStore} from 'reto'
import {SlideStore} from '@/stores/slide.store'
import {EditPageStore} from '@/stores/edit-page.store'

const hoverCss = css<{
  selected: boolean
}>`
  cursor: pointer;
  transition: box-shadow 0.2s ease;
  :hover {
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  }
  
  border: 2px solid ${props => props.selected ? '#17AE7E' : 'rgba(0, 0, 0, 0.15)'};
`

const Container = styled.div<{
  selected: boolean
  interactive: boolean
}>`
  overflow: hidden;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.05);
  margin: 24px 0;
  transition: all 0.2s ease;
  box-sizing: content-box;
  
  ${props => props.interactive && hoverCss};
`

const Scale = styled.div<{
  scale: number
}>`
  transform-origin: left top;
  transform: scale(${props => props.scale});
  position: relative;
`

interface Props {
  markdown: string
  scale: number
  selected?: boolean
  onClick?: () => void
  refIndex?: number
}

export const SlidePreview = memo<Props>((props) => {
  const {filmSize} = useStore(SlideStore)
  const editPageStore = useStore(EditPageStore)

  function setRef(element: HTMLDivElement) {
    if (props.refIndex === undefined) return
    editPageStore.slideElementsRef.current[props.refIndex] = element
  }

  const interactive = !!props.onClick

  return (
    <Container
      style={{
        height: filmSize.height * props.scale,
        width: filmSize.width * props.scale,
      }}
      selected={props.selected}
      onClick={props.onClick}
      interactive={interactive}
    >
      <Scale scale={props.scale} ref={setRef}>
        <Slide markdown={props.markdown} preview={true}/>
      </Scale>
    </Container>
  )
})
