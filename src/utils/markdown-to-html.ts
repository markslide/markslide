import * as marked from 'marked'

const m = marked.setOptions({
  // highlight: function (code) {
  //   return highlight.highlightAuto(code).value;
  // }
})

export function markdownToHtml(text?: string) {
  if (text === undefined || text === null) return
  return m.parse(text)
}
