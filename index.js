var nets = require('surface-nets')
var ops = require('ndarray-ops')
var ndarray = require('ndarray')

module.exports = heightmapContours

function heightmapContours (heightmap, options) {
  options = options || {}

  var slices = options.slices || 10
  var border = !('border' in options) || options.border ? 2 : 0

  var layers = []
  var threshold = ndarray(new Float32Array(
    (heightmap.shape[0] + border) * (heightmap.shape[1] + border)
  ), [heightmap.shape[0] + border, heightmap.shape[1] + border])

  var max = heightmap.get.apply(heightmap, ops.argmax(heightmap))
  var min = heightmap.get.apply(heightmap, ops.argmin(heightmap))

  for (var i = 0; i < slices; i++) {
    var cutoff = min + (max - min) * (i + 1) / (slices + 1)
    var inner = threshold.lo(1, 1).hi(heightmap.shape[0], heightmap.shape[1])
    ops.assign(inner, heightmap)
    ops.ltseq(inner, cutoff)
    layers.push(nets(threshold))
  }

  return layers
}
