export function getMarkdownClassNames(markdown: string) {
  const trimmed = markdown.trim()
  const classNames: string[] = []
  if (trimmed.match(/^# /)) {
    classNames.push('cover')
  } else if (trimmed.match(/^## /)) {
    classNames.push('section')
  } else {
    classNames.push('page')
  }
  return classNames
}
