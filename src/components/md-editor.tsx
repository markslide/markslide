import * as React from 'react'
import {FC, useEffect, useRef} from 'react'
import SimpleMDE from 'easymde'
import {useStore} from 'reto'
import {EditPageStore} from '@/stores/edit-page.store'

export interface Props {
  id: string;
  value?: string;
  onChange: (v: string) => void;
}

export const MDEditor: FC<Props> = (props) => {
  const editPageStore = useStore(EditPageStore)

  const editorWrapperRef = useRef<HTMLDivElement>()
  const simpleMdeRef = useRef<SimpleMDE>()
  const textareaRef = useRef<HTMLTextAreaElement>()

  useEffect(() => {
    simpleMdeRef.current = new SimpleMDE({
      element: textareaRef.current,
      initialValue: props.value,
      autofocus: true,
      spellChecker: false,
      autoDownloadFontAwesome: false,
      hideIcons: ["guide", "preview", "heading", "fullscreen", "side-by-side"],
      showIcons: ["heading-1", "heading-2", "heading-3", "horizontal-rule", "code"],
      status: ["lines", "words"],
      renderingConfig: {
        codeSyntaxHighlighting: true // TODO: Why code hl isn't working?
      },
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
    <div id={`${props.id}-wrapper`} ref={editorWrapperRef}>
      <textarea id={props.id} ref={textareaRef}/>
    </div>
  )
}
