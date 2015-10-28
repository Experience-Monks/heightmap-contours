var simplex = new (require('simplex-noise'))
var fill = require('ndarray-fill')
var contourTerrain = require('./')

var input = document.body.appendChild(document.createElement('input'))
var canvas = document.body.appendChild(document.createElement('canvas'))

input.type = 'range'
input.value = 64
input.min = 32
input.max = 512
input.addEventListener('change', function (e) {
  generate(canvas, Number(input.value))
}, false)
generate(canvas, Number(input.value))

input.style.position = 'absolute'
input.style.right =
input.style.top = 0

function generate (canvas, size) {
  var heightmap = require('zeros')([size, size])

  fill(heightmap, function (x, y) {
    return simplex.noise2D(x * 2 / size, y * 2 / size)
  })

  var layers = contourTerrain(heightmap)
  var ctx = canvas.getContext('2d')

  canvas.width =
  canvas.height = 800
  ctx.fillStyle = 'rgba(0,0,0,0.2)'
  for (var i = 0; i < layers.length; i++) {
    var layer = layers[i]
    var cells = layer.cells
    var positions = layer.positions

    ctx.beginPath()
    for (var j = 0; j < cells.length; j++) {
      var c = cells[j]
      var p0 = positions[c[0]]
      var p1 = positions[c[1]]
      ctx.moveTo(p0[0] * canvas.width / (size + 2), p0[1] * canvas.height / (size + 2))
      ctx.lineTo(p1[0] * canvas.width / (size + 2), p1[1] * canvas.height / (size + 2))
    }
    ctx.stroke()
  }
}
