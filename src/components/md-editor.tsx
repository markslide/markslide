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

  useEffect(() => {
    simpleMdeRef.current = new SimpleMDE({
      element: textareaRef.current,
      initialValue: value,
      ...options,
    })
    bindEvents()
    console.log(simpleMdeRef.current)
  }, [])

  useEffect(() => {
    let cursor = simpleMdeRef.current.codemirror.getDoc().getCursor()
    simpleMdeRef.current!.codemirror.getDoc().setCursor({
      line: editPageStore.highlightLines[0] || 0,
      ch: 0,
    })
  }, [editPageStore.selectedPreview])

  useEffect(() => {
    simpleMdeRef.current.codemirror.focus()
  }, [editPageStore.highlightLines])

  function bindEvents() {
    simpleMdeRef.current.codemirror.on("change", () => {
      props.onChange(simpleMdeRef.current.value())
    })
  }

  return (
    <div id={`${id}-wrapper`} ref={editorWrapperRef}>
      <textarea id={id} ref={textareaRef}/>
    </div>
  )
}
