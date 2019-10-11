export function isFullscreen() {
  const d = document as any
  return d.fullscreenElement || d.webkitFullscreenElement || d.mozFullScreenElement
}

export function enterFullscreen() {
  const body = document.body as any
  if (body.requestFullscreen) {
    body.requestFullscreen()
  } else if (body.webkitRequestFullscreen) {
    body.webkitRequestFullscreen()
  } else if (body.webkitRequestFullScreen) {
    body.webkitRequestFullScreen()
  }
}

export function exitFullscreen() {
  const d = document as any
  if (d.exitFullscreen) {
    d.exitFullscreen()
  } else if (d.webkitExitFullscreen) {
    d.webkitExitFullscreen()
  }
}

export function toggleFullscreen() {
  if (isFullscreen()) {
    exitFullscreen()
  } else {
    enterFullscreen()
  }
}
