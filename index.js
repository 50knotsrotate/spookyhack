const canvas = document.getElementById('canvass')
const context = canvas.getContext('2d')

document.body.style.cursor  = 'http://cur.cursors-4u.net/others/oth-8/oth704.cur'








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
