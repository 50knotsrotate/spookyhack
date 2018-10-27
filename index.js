const canvas = document.getElementById('canvass')
const context = canvas.getContext('2d')









const onMouseDown = (e) => {
  const rect = canvas.getBoundingClientRect()
  const coordinates = {
    x: e.x - rect.left + window.scrollX,
    y: e.y + window.scrollX
  }
  console.log(e)
  context.fillRect(coordinates.x, e.y, 2, 2)
  console.log(coordinates)
}

canvas.addEventListener("mousedown", onMouseDown)
