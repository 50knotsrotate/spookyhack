const canvas = document.getElementById('canvass')
const context = canvas.getContext('2d')

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

