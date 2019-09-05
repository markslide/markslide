import {createGlobalStyle} from "styled-components";

export const EditorStyle = createGlobalStyle`
  .CodeMirror {
    height: 100% !important;
    pre {
      color: #3F4F4F !important;
    }
  }
  .CodeMirror-cursor {
    border-left: 1px solid #17AE7E !important;
    background-color: #17AE7E;
    width: 1px !important;
  }
  .CodeMirror-wrap {
    padding: 0 0 !important;
    border: none !important;
    border-radius: 0 !important;
  }
  .CodeMirror-line {
    padding: 0 30px 0 60px !important;
  }
  .CodeMirror-code {
    pre:nth-child(1) {
      margin-top: 15px;
    }
  }
  .CodeMirror-scroll {
    margin-bottom: 0 !important;
    padding-bottom: 0 !important;
  }
  .CodeMirror-line-hl {
    background-color: #17AE7E20 !important;
    border-right: 3px solid #17AE7E !important;
  }
  .editor-toolbar {
    border: none !important;
    border-radius: 0 !important;
    border-bottom: 1px solid #F3F3F3 !important;
    padding: 0 10px 0 30px !important;
    button {
      border: none !important;
      &.active{
        background-color: #f6f6f6 !important;
      }
    }
  }
  .editor-statusbar {
    position: absolute;
    right: 10px;
    bottom: 0;
    z-index: 100;
    font-family: inherit;
    background-color: #ffffffaa;
  }
  .CodeMirror-line::selection, .CodeMirror-line>span::selection, .CodeMirror-line>span>span::selection {
    background: #17AE7E20 !important;
  }
  #editor-wrapper{
    position: relative;
    height: 100%;
  }
  
  .cm-formatting-header {
    color: #eee;
    &.cm-formatting-header-1 {
      margin-left: -30px;
    }
    &.cm-formatting-header-2 {
      margin-left: -40px;
    }
    &.cm-formatting-header-3 {
      margin-left: -45px;
    }
  }
  
`
