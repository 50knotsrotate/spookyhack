const canvas = document.getElementById('canvass')
const context = canvas.getContext('2d')
let firstMousePosition = null
let lastMousePosition = { x: null, y: null }

//<<<<<<< HEAD


const make_base = () => {
  base_image = new Image()
  base_image.src = 'img/pumpkin.png'
  base_image.onload = function(){
    context.drawImage(base_image, 0, 0);
  }
}
//>>>>>>> 9849285c43f3b17f94f27577d99ee1f6d160aab5

make_base()

const onMouseMove = (e) => {
  if (e.buttons === 0 && !firstMousePosition) return

  const rect = canvas.getBoundingClientRect()
  const coordinates = {
    x: e.x - rect.left + window.scrollX,
    y: e.y + window.scrollX
  }

  if (!firstMousePosition) {
    firstMousePosition = coordinates
    context.beginPath()
  }

  if (lastMousePosition.x && lastMousePosition.y) {
    context.lineTo(coordinates.x, coordinates.y)
  } else {
    context.moveTo(coordinates.x, coordinates.y)
    context.lineTo(coordinates.x, coordinates.y)
  }

  lastMousePosition = coordinates

  if (e.buttons === 0 && firstMousePosition) {
    context.lineTo(firstMousePosition.x, firstMousePosition.y)
    context.closePath()
    context.lineWidth = 3
    context.fillStyle = '#000000'
    context.fill()
    context.stroke()
    firstMousePosition = null
    lastMousePosition = { x: null, y: null }
  }
}

canvas.addEventListener("mousemove", onMouseMove)
