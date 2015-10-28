# heightmap-contours

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Generate a series of 2D contour meshes over a heightmap.

![](http://i.imgur.com/M9Nz7kl.png)

## Usage

[![NPM](https://nodei.co/npm/heightmap-contours.png)](https://www.npmjs.com/package/heightmap-contours)

### `layers = heightmapContours(heightmap, [options])`

`heightmap` is a 2D [ndarray](https://github.com/scijs/ndarray) representing the heightmap. Its size ("shape") will determine the resolution of the final output.

Accepts the following options:

* `slices`: the number of slices to make through the heightmap, hence the number of output layers.
* `border`: boolean value. If `true`, add a border to the edges to ensure that all of the resulting layers are manifold (i.e. contain no gaps or forks). Defaults to `true`.

Returns an array of [simplicial complexes](https://github.com/mikolalysenko/simplicial-complex), one for each layer starting from the top.

## See Also

* [mesh-heightmap-contours](https://github.com/Jam3/mesh-heightmap-contours)
* [surface-nets](https://github.com/mikolalysenko/surface-nets)

## License

MIT, see [LICENSE.md](http://github.com/Jam3/heightmap-contours/blob/master/LICENSE.md) for details.
