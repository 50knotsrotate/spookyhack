let canvas = document.getElementById('canvass')
let context = canvas.getContext('2d')

const make_base = () => {
  base_image = new Image()
  base_image.src = 'img/pumpkin.png'
  base_image.onload = function(){
    context.drawImage(base_image, 0, 0);
  }
}

make_base()
