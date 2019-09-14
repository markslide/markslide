import * as marked from 'marked'
import * as highlight from 'highlightjs'

const m = marked.setOptions({
  highlight: function (code, lang) {
    if (lang && highlight.getLanguage(lang)) {
      return highlight.highlight(lang, code).value
    }
    return highlight.highlightAuto(code).value
  }
})

export function markdownToHtml(text?: string) {
  if (text === undefined || text === null) return
  return m.parse(text)
}
