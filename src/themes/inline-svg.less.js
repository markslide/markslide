functions.add('inline-svg', function (uri, color) {
  let svgUri = uri.value.value
  let colorHex = color.value.slice(1,)
  let coloredUri = svgUri.replace(/%23[0-9a-f]{6}/gi, '%23' + colorHex)
  return new tree.Quoted('"', coloredUri)
})
