const canvas = document.getElementById('canvass')
const context = canvas.getContext('2d')
const pumpkinCoords = { x: 390, y: 300, r: 240 }


let shapes = []
noise.seed(0)
let isDay = true
let time = 0

const checkPumpkinBounds = (x, y) => Math.sqrt((x-pumpkinCoords.x)*(x-pumpkinCoords.x) + (y-pumpkinCoords.y)*(y-pumpkinCoords.y)) < pumpkinCoords.r
let currentShape = null


const base_image = new Image()
base_image.src = 'img/pumpkin.png'

const onMouseMove = (e) => {
  const rect = canvas.getBoundingClientRect()

  const coordinates = {
    x: e.x - rect.left + window.scrollX,
    y: e.y + window.scrollX
  }

  let isMousePressed = e.buttons > 0

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

  if (!isMousePressed && !currentShape) return

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
  context.clearRect(0, 0, canvas.width, canvas.height)
  base_image.complete && context.drawImage(base_image, 0, 0)
  shapes.forEach((shape) => {
    context.beginPath()
    shape.forEach((coordinates, index, array) => {
      if (index == 0) {
        context.moveTo(coordinates.x, coordinates.y)
        return
      }

      if (index == array.length - 1) {
        context.closePath()
        if (isDay) {
          context.fillStyle = "#000"
        } else {
          time += 0.005
          context.fillStyle = 'hsl(39, 100%, ' + (20 + noise.simplex2(time, 0) * 20) + '%)'
        }
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

const onClickButton = () => {
  isDay = !isDay
}

const interval = setInterval(drawShapes, 10)

canvas.addEventListener("mousemove", onMouseMove)
