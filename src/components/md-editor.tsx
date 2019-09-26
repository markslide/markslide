import * as React from 'react'
import {FC, FormEvent, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import SimpleMDE from 'easymde'
import {DOMEvent, Editor, KeyMap} from 'codemirror'
import {useStore} from 'reto'
import {EditPageStore} from '@/stores/edit-page.store'


type CodemirrorEvents =
  | "change"
  | "changes"
  // | "beforeChange"
  | "cursorActivity"
  | "beforeSelectionChange"
  | "viewportChange"
  | "gutterClick"
  | "focus"
  | "blur"
  | "scroll"
  | "update"
  | "renderLine";

type SimpleMdeToCodemirror = {
  [E in CodemirrorEvents | DOMEvent]?: Editor["on"]
};

export interface SimpleMDEEditorProps {
  id?: string;
  label?: string;
  onChange: (v: string | FormEvent) => void;
  value?: string;
  className?: string;
  extraKeys?: KeyMap;
  options?: SimpleMDE.Options;
  events?: SimpleMdeToCodemirror;
  highlightLines?: number[];
  getInstance?: (instance: SimpleMDE) => void | any;
  getLineAndCursor?: (position: CodeMirror.Position) => void | any;
}

export const SimpleMDEEditor: FC<SimpleMDEEditorProps> = (props) => {
  const editPageStore = useStore(EditPageStore)

  const {id, label, value, options, getInstance, getLineAndCursor, events, onChange, ...rest} = props
  const editorWrapperRef = useRef<HTMLDivElement>()
  const simpleMdeRef = useRef<SimpleMDE>()
  const textareaRef = useRef<HTMLTextAreaElement>()
  const preElementsRef = useRef<HTMLCollectionOf<HTMLPreElement>>()

  const editorElements = useMemo(() => {
    let editorEl = editorWrapperRef.current
    let toolbarEl = editorEl && editorEl.getElementsByClassName("editor-toolbar")[0]
    return [editorEl, toolbarEl]
  }, [editorWrapperRef.current])

  function updateLines() {
    let lines = document.getElementsByClassName('CodeMirror-code')
    if (lines.length) {
      // console.log('len', preElementsRef.current.length)
      preElementsRef.current = lines[0].getElementsByTagName('pre')
      // console.log('len', preElementsRef.current.length)
    }
  }

  useEffect(() => {
    simpleMdeRef.current = new SimpleMDE({
      element: textareaRef.current,
      initialValue: value,
      ...options,
    })
  }, [])

  useEffect(() => {
    addEvents()
    addExtraKeys()
    getCursor()
    getMdeInstance()
    updateLines()

    return removeEvents
  }, [props, ...editorElements])

  function eventWrapper() {
    onChange(simpleMdeRef.current!.value())
  }

  function removeEvents() {
    let [editorEl, toolbarEl] = editorElements

    if (editorEl && toolbarEl) {
      editorEl.removeEventListener("keyup", eventWrapper)
      editorEl.removeEventListener("paste", eventWrapper)
      toolbarEl.removeEventListener("click", eventWrapper)
    }
  }

  function doHighlight() {
    const lines = editPageStore.highlightLines

    //dehighlight all lines
    const preElements = preElementsRef.current
    for (let i = 0; i < preElements.length; i++) {
      const lineEl = preElements[i]
      lineEl.className = lineEl.className.replace('CodeMirror-line-hl', '')
    }

    for (let line of lines) {
      let lineEl = preElements[line];
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

  function addEvents() {
    let [editorEl, toolbarEl] = editorElements

    if (editorEl && toolbarEl && simpleMdeRef.current) {
      editorEl.addEventListener("keyup", eventWrapper)
      editorEl.addEventListener("paste", eventWrapper)
      toolbarEl.addEventListener("click", eventWrapper)
      simpleMdeRef.current.codemirror.on("cursorActivity", getCursor)
      simpleMdeRef.current.codemirror.on("change", updateLines)
      simpleMdeRef.current.codemirror.on("scroll", updateLines)
      simpleMdeRef.current.codemirror.on("cursorActivity", () => {
        //TODO setSelectedPreview 根据cursor的行号更新selectedPreview，保持编辑器和预览器状态一致
      })
      simpleMdeRef.current.codemirror.on("scroll", () => {
        doHighlight()
      })

      // Handle custom events
      events &&
      Object.entries(events).forEach(([eventName, callback]) => {
        if (eventName && callback) {
          simpleMdeRef.current &&
          simpleMdeRef.current.codemirror.on(
            eventName as DOMEvent,
            callback as any
          );
        }
      });
    }
  }

  function getCursor() {
    // https://codemirror.net/doc/manual.html#api_selection
    if (getLineAndCursor && simpleMdeRef.current) {
      getLineAndCursor(
        simpleMdeRef.current!.codemirror.getDoc().getCursor()
      );
    }
  }

  function getMdeInstance() {
    if (props.getInstance) {
      props.getInstance(simpleMdeRef.current!);
    }
  }

  function addExtraKeys() {
    // https://codemirror.net/doc/manual.html#option_extraKeys
    if (props.extraKeys) {
      simpleMdeRef.current!.codemirror.setOption("extraKeys", this.props.extraKeys);
    }
  }

  return (
    <div id={`${id}-wrapper`} {...rest} ref={editorWrapperRef}>
      {label && <label htmlFor={id}> {label} </label>}
      <textarea id={id} ref={textareaRef}/>
    </div>
  )
}

function useHighlightLines() {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  function update(start: number, end: number) {
    setStart(start)
    setEnd(end)
  }

  return update
}
