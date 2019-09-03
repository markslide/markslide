import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`

  // >> Prevent over-scrolling, DO NOT DELETE
  html {
      overflow: hidden;
      height: 100%;
  }
  body {
      height: 100%;
      overflow: auto;
  }
  // << Prevent over-scrolling, DO NOT DELETE

  body {
    margin: 0;
    color: #5F5F5F;
    overflow-x: hidden;
    font-family: "Avenir Next", "Avenir", "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "Hiragino Sans GB", "Source Han Sans CN Normal", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
  }
`
