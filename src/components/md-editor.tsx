import * as React from "react";
import {FC, FormEvent, useCallback, useEffect, useRef, useState} from "react";
import * as SimpleMDE from "easymde";
import {DOMEvent, Editor, KeyMap} from "codemirror";


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

  const {id, label, value, options, getInstance, getLineAndCursor, events, onChange, ...rest} = props
  const editorWrapperRef = useRef<HTMLDivElement>()
  const [simpleMde, setSimpleMde] = useState(null)
  const [preElements, setPreElements] = useState()
  const highlightLinesRef = useRef<number[]>([])

  const getElements = useCallback(() => {
    let editorEl = editorWrapperRef.current
    let toolbarEl = editorEl && editorEl.getElementsByClassName("editor-toolbar")[0]
    return [editorEl, toolbarEl]
  }, [editorWrapperRef])

  useEffect(() => {
    createEditor()
  }, [])

  function updateLines() {
    let lines = document.getElementsByClassName('CodeMirror-code')
    if (lines.length) {
      // console.log('len', preElements.length)
      setPreElements(lines[0].getElementsByTagName('pre'))
      // console.log('len', preElements.length)
    }
  }

  useEffect(() => {
    addEvents()
    addExtraKeys()
    getCursor()
    getMdeInstance()
    updateLines()

    return removeEvents
  }, [typeof window, props, ...getElements()])

  function createEditor() {
    const SimpleMDE = require("easymde")
    const initialOptions = {
      element: document.getElementById(id),
      initialValue: value
    }
    const allOptions = Object.assign({}, initialOptions, options);
    setSimpleMde(new SimpleMDE(allOptions))
  }

  function eventWrapper() {
    onChange(simpleMde!.value())
  }

  function removeEvents() {
    let [editorEl, toolbarEl] = getElements()

    if (editorEl && toolbarEl) {
      // @ts-ignore
      editorEl.removeEventListener("keyup", eventWrapper)
      // @ts-ignore
      editorEl.removeEventListener("paste", eventWrapper)
      // @ts-ignore
      toolbarEl.removeEventListener("click", eventWrapper)
    }
  }

  function deHighlightAllLines() {
    function deHighlightLine(lineEl: HTMLElement) {
      lineEl.className = lineEl.className.replace('CodeMirror-line-hl', '')
    }

    // console.log(preElements)
    for (let lineEl of preElements) {
      deHighlightLine(lineEl)
    }
  }

  function highlightLines(lines: number[]) {
    function highlightLine(line: number) {
      let lineEl = preElements[line];
      if (lineEl) lineEl.className += ' CodeMirror-line-hl'
    }

    if (!lines) return
    deHighlightAllLines()

    console.log(lines)
    highlightLinesRef.current = lines

    for (let line of lines) {
      highlightLine(line)
    }
  }

  function addEvents() {
    let [editorEl, toolbarEl] = getElements()

    if (editorEl && toolbarEl && simpleMde) {
      // @ts-ignore
      editorEl.addEventListener("keyup", eventWrapper)
      // @ts-ignore
      editorEl.addEventListener("paste", eventWrapper)
      // @ts-ignore
      toolbarEl.addEventListener("click", eventWrapper)
      simpleMde.codemirror.on("cursorActivity", getCursor)
      simpleMde.codemirror.on("change", updateLines)
      simpleMde.codemirror.on("scroll", updateLines)
      simpleMde.codemirror.on("cursorActivity", function () {

        let cursor = simpleMde!.codemirror.getDoc().getCursor()
        let line = cursor.line
        let ch = cursor.ch
        // simpleMde!.codemirror.getDoc().setCursor({line: line, ch: ch + 1})

        highlightLines([line, line + 1])
        // for (let pre of preElements) {
        //   console.log(pre.innerHTML)
        // }
      })
      simpleMde.codemirror.on("scroll", () => {
        highlightLines(highlightLinesRef.current)
      })

      // Handle custom events
      events &&
      Object.entries(events).forEach(([eventName, callback]) => {
        if (eventName && callback) {
          simpleMde &&
          simpleMde.codemirror.on(
            eventName as DOMEvent,
            callback as any
          );
        }
      });
    }
  }

  function getCursor() {
    // https://codemirror.net/doc/manual.html#api_selection
    if (getLineAndCursor && simpleMde) {
      getLineAndCursor(
        simpleMde!.codemirror.getDoc().getCursor()
      );
    }
  }

  function getMdeInstance() {
    if (props.getInstance) {
      props.getInstance(simpleMde!);
    }
  }

  function addExtraKeys() {
    // https://codemirror.net/doc/manual.html#option_extraKeys
    if (props.extraKeys) {
      simpleMde!.codemirror.setOption("extraKeys", this.props.extraKeys);
    }
  }

  return (
    <div id={`${id}-wrapper`} {...rest} ref={editorWrapperRef}>
      {label && <label htmlFor={id}> {label} </label>}
      <textarea id={id}/>
    </div>
  )
}
