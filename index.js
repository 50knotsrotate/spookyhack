const canvas = document.getElementById('canvass')
const context = canvas.getContext('2d')
let base_image = new Image()
base_image.src = 'img/pumpkin.png'
let circle = { x: 390, y: 300, r: 240 }

const checkCircleBounds = (x, y) => Math.sqrt((x-circle.x)*(x-circle.x) + (y-circle.y)*(y-circle.y)) < circle.r

const make_base = () => {
  base_image.onload = function(){
    context.beginPath()
    context.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI)
    context.stroke()
    context.drawImage(base_image, 0, 0);
  }
}

make_base()



const onMouseDown = (e) => {
  const rect = canvas.getBoundingClientRect()
  const coordinates = {
    x: e.x - rect.left + window.scrollX,
    y: e.y + window.scrollX
  }
  context.fillRect(coordinates.x, e.y, 2, 2)
  console.log(checkCircleBounds(e.x, e.y))
}

canvas.addEventListener("mousedown", onMouseDown)
