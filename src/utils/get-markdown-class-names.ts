export function getMarkdownClassNames(markdown: string) {
  const classNames: string[] = []
  if (markdown.match(/^# /)) {
    classNames.push('cover')
  } else if (markdown.match(/^## /)) {
    classNames.push('section')
  } else {
    classNames.push('page')
  }
  return classNames
}
