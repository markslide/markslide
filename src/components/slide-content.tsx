import React, {memo, useMemo} from 'react'
import styled from 'styled-components'
import {markdownToHtml} from '@/utils/markdown-to-html'
import {filmSize} from '@/utils/film-size'
import {getMarkdownClassNames} from '@/utils/get-markdown-class-names'

const Container = styled.div`
  width: ${filmSize.width}px;
  height: ${filmSize.height}px;
  white-space: pre-wrap;
  word-break: break-all;
  padding: 60px 80px;
  overflow-x: hidden;
  overflow-y: hidden;
  user-select: none;
  box-sizing: border-box;
  position: relative;
`

const Content = styled.div.attrs(() => ({
  className: 'content'
}))`
  table {
    width: 100%;
  }
`

interface Props {
  markdown: string
  pageIndex: number
}

export const SlideContent = memo<Props>((props) => {
  const classNames = useMemo(() => getMarkdownClassNames(props.markdown), [props.markdown])
  const html = useMemo(() => markdownToHtml(props.markdown), [props.markdown])
  
  return (
    <Container className={'slide' + ' ' + classNames.join(' ')}>
      <Content dangerouslySetInnerHTML={{__html: html}}/>
      <div className='page-number'>
        {props.pageIndex + 1}
      </div>
    </Container>
  )
})
