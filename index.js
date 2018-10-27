const canvas = document.getElementById('canvass')
const context = canvas.getContext('2d')
const pumpkinCoords = { x: 390, y: 300, r: 240 }
let shapes = []

const checkPumpkinBounds = (x, y) => Math.sqrt((x-pumpkinCoords.x)*(x-pumpkinCoords.x) + (y-pumpkinCoords.y)*(y-pumpkinCoords.y)) < pumpkinCoords.r
let currentShape = null


const make_base = () => {
  const base_image = new Image()
  base_image.src = 'img/pumpkin.png'
  base_image.onload = () => {
    context.drawImage(base_image, 0, 0)
  }
}

make_base()

const onMouseMove = (e) => {
  const rect = canvas.getBoundingClientRect()

  const coordinates = {
    x: e.x - rect.left + window.scrollX,
    y: e.y + window.scrollX
  }

  let isMousePressed = e.buttons > 0
  
  if (!isMousePressed && !currentShape) return

  if (!checkPumpkinBounds(coordinates.x, coordinates.y)) {
    document.body.style.cursor = 'default'
    return
  } else {
    if (isMousePressed) {
      document.body.style.cursor = 'url(http://www.rw-designer.com/cursor-extern.php?id=60402), default'
    } else {
      document.body.style.cursor = 'url(http://www.rw-designer.com/cursor-extern.php?id=65179), default'
    }
  }

  if (!isMousePressed && !firstMousePosition) return

  if (!currentShape) {
    currentShape = []
    context.beginPath()
  }

  if (!checkPumpkinBounds(coordinates.x, coordinates.y)) {
    finishShape()
  }

  continueShape(coordinates)

  if (!isMousePressed && currentShape) {
    finishShape()
  }
}

const continueShape = (coordinates) => {
  currentShape.push(coordinates)
}

const finishShape = () => {
  shapes.push(currentShape)
  currentShape = null
}

const drawShapes = () => {
  context.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)'
  shapes.forEach((shape) => {
    context.beginPath()
    shape.forEach((coordinates, index, array) => {
      if (index == 0) {
        context.moveTo(coordinates.x, coordinates.y)
        return
      }

      if (index == array.length - 1) {
        context.closePath()
        context.fill()
        return
      }

      context.lineTo(coordinates.x, coordinates.y)
    })
  })

  if (currentShape) {
    context.beginPath()
    currentShape.forEach((coordinates, index) => {
      if (index == 0) {
        context.moveTo(coordinates.x, coordinates.y)
        return
      }

      context.lineTo(coordinates.x, coordinates.y)
      context.stroke()
    })
  }
}

const interval = setInterval(drawShapes, 10)

canvas.addEventListener("mousemove", onMouseMove)
