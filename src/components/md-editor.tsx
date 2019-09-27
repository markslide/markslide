import * as React from 'react'
import {FC, useEffect, useRef} from 'react'
import SimpleMDE from 'easymde'
import {useStore} from 'reto'
import {EditPageStore} from '@/stores/edit-page.store'

export interface Props {
  id: string;
  value?: string;
  onChange: (v: string) => void;
  options?: SimpleMDE.Options;
}

export const SimpleMDEEditor: FC<Props> = (props) => {
  const editPageStore = useStore(EditPageStore)

  const {id, value, options} = props
  const editorWrapperRef = useRef<HTMLDivElement>()
  const simpleMdeRef = useRef<SimpleMDE>()
  const textareaRef = useRef<HTMLTextAreaElement>()
  const preElementsRef = useRef<HTMLCollectionOf<HTMLPreElement>>()

  function updateLines() {
    let lines = document.getElementsByClassName('CodeMirror-code')
    if (lines.length) {
      preElementsRef.current = lines[0].getElementsByTagName('pre')
    }
  }

  useEffect(() => {
    simpleMdeRef.current = new SimpleMDE({
      element: textareaRef.current,
      initialValue: value,
      ...options,
    })
    bindEvents()
    updateLines()
    doHighlight()
    console.log(simpleMdeRef.current)
  }, [])

  function doHighlight() {
    const lines = editPageStore.highlightLines

    //deHighlight all lines
    const preElements = preElementsRef.current
    for (let i = 0; i < preElements.length; i++) {
      const lineEl = preElements[i]
      lineEl.className = lineEl.className.replace('CodeMirror-line-hl', '')
    }

    for (let line of lines) {
      let lineEl = preElements[line]
      if (lineEl) lineEl.className += ' CodeMirror-line-hl'
    }
  }

  useEffect(() => {
    let cursor = simpleMdeRef.current.codemirror.getDoc().getCursor()
    simpleMdeRef.current!.codemirror.getDoc().setCursor({
      line: editPageStore.highlightLines[0] || 0,
      ch: cursor.ch + 1,
    })
  }, [editPageStore.selectedPreview])

  useEffect(() => {
    doHighlight()
    simpleMdeRef.current.codemirror.focus()
  }, [editPageStore.highlightLines])

  function bindEvents() {
    simpleMdeRef.current.codemirror.on("change", updateLines)
    simpleMdeRef.current.codemirror.on("change", () => {
      props.onChange(simpleMdeRef.current.value())
    })
    simpleMdeRef.current.codemirror.on("scroll", updateLines)
    simpleMdeRef.current.codemirror.on("cursorActivity", () => {
      // TODO: setSelectedPreview 根据cursor的行号更新selectedPreview，保持编辑器和预览器状态一致
      // let line = simpleMdeRef.current!.codemirror.getDoc().getCursor().line
      // editPageStore.setSelectedPreview(line)
    })
    simpleMdeRef.current.codemirror.on("scroll", () => {
      doHighlight()
    })
  }

  return (
    <div id={`${id}-wrapper`} ref={editorWrapperRef}>
      <textarea id={id} ref={textareaRef}/>
    </div>
  )
}
