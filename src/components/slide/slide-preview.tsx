import React, {memo} from 'react'
import styled, {css} from 'styled-components'
import {useStore} from 'reto'
import {EditPageStore} from '@/stores/edit-page.store'
import {Scale} from '@/components/scale'
import {SlideBackground} from '@/components/slide/slide-background'
import {SlideContent} from '@/components/slide/slide-content'
import {filmSize} from '@/utils/film-size'

const PageNumber = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 3px 6px;
  font-size: 12px;
  background: #000000;
  border-radius: 3px;
  opacity: 0;
  color: #ffffff;
  transition: opacity ease 0.2s;
  user-select: none;
`

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
  position: relative;
  :hover ${PageNumber} {
    opacity: 0.6;
  }
  
  ${props => props.interactive && hoverCss};
`

interface Props {
  markdown: string
  scale: number
  selected?: boolean
  onClick?: () => void
  refIndex?: number
  pageIndex: number
}

export const SlidePreview = memo<Props>((props) => {
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
      className='theme-one-dark'
      selected={props.selected}
      onClick={props.onClick}
      interactive={interactive}
    >
      <SlideBackground>
        <Scale scale={props.scale} ref={setRef}>
          <SlideContent markdown={props.markdown} pageIndex={props.pageIndex}/>
        </Scale>
        <PageNumber>
          {props.pageIndex + 1}
        </PageNumber>
      </SlideBackground>
    </Container>
  )
})
