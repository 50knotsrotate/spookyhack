const canvas = document.getElementById('canvass')
const context = canvas.getContext('2d')
const pumpkinCoords = { x: 390, y: 300, r: 240 }

const checkPumpkinBounds = (x, y) => Math.sqrt((x-pumpkinCoords.x)*(x-pumpkinCoords.x) + (y-pumpkinCoords.y)*(y-pumpkinCoords.y)) < pumpkinCoords.r
let firstMousePosition = null
let lastMousePosition = null

const make_base = () => {
  const base_image = new Image()
  base_image.src = 'img/pumpkin.png'
  base_image.onload = () => {
    context.drawImage(base_image, 0, 0)
  }
}

make_base()

const onMouseMove = (e) => {
  let isMousePressed = e.buttons > 0

  if (!isMousePressed && !firstMousePosition) return

  const rect = canvas.getBoundingClientRect()

  const coordinates = {
    x: e.x - rect.left + window.scrollX,
    y: e.y + window.scrollX
  }

  if (!checkPumpkinBounds(coordinates.x, coordinates.y)) return

  if (!firstMousePosition) {
    firstMousePosition = coordinates
    context.beginPath()
  }

  if (!checkPumpkinBounds(coordinates.x, coordinates.y)) {
    finishShape()
  }

  continueShape(coordinates)

  lastMousePosition = coordinates

  if (!isMousePressed && firstMousePosition) {
    finishShape()
  }
}

const continueShape = (coordinates) => {
  if (lastMousePosition) {
    context.lineTo(coordinates.x, coordinates.y)
  } else {
    context.moveTo(coordinates.x, coordinates.y)
    context.lineTo(coordinates.x, coordinates.y)
  }

  context.lineWidth = 3
  context.stroke()
}

const finishShape = () => {
  context.lineTo(firstMousePosition.x, firstMousePosition.y)
  context.closePath()
  context.fillStyle = '#000000'
  context.fill()
  context.stroke()
  firstMousePosition = null
  lastMousePosition = null
}

canvas.addEventListener("mousemove", onMouseMove)
