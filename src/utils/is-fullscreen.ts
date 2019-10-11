export function isFullscreen() {
  const d = document as any
  return d.fullscreenElement || d.webkitFullscreenElement || d.mozFullScreenElement
}
