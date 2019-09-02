import * as marked from 'marked'
import * as highlight from 'highlightjs'

const m = marked.setOptions({
  highlight: function (code, lang) {
    console.log('code', code)
    console.log('lang', lang)
    console.log(highlight.highlight(lang, code).value)
    if (lang) {
      return highlight.highlight(lang, code).value
    }
    return highlight.highlightAuto(code).value
  }
})

export function markdownToHtml(text?: string) {
  if (text === undefined || text === null) return
  return m.parse(text)
}
