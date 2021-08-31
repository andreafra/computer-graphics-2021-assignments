function buildGeometry(SIZE = 32, PLANES = 12, SLICES = 16) {
  // Draws function y = sin(x) * cos(z) with -3 <= x <= 3 and -3 <= z <= 3.
  ///// Creates vertices
  const SCALE = 2 / SIZE
  var vert2 = []
  for (let i = 0; i <= SIZE; i++) {
    for (let j = 0; j <= SIZE; j++) {
      let _x = i - SIZE / 2 // Center on X
      let _z = j - SIZE / 2 // Center on Z
      vert2[i * (SIZE + 1) + j] = [_x, 0, _z]
    }
  }

  vert2.forEach((v) => {
    v[0] = v[0] * SCALE
    v[2] = v[2] * SCALE
    let _x = (v[0] / 2) * 6
    let _z = (v[2] / 2) * 6
    v[1] = Math.sin(_x) * Math.cos(_z) * SCALE * 6
  })

  ////// Creates indices
  var ind2 = []
  for (i = 0; i < SIZE; i++) {
    for (j = 0; j < SIZE; j++) {
      ind2[6 * (i * SIZE + j)] = (SIZE + 1) * j + i
      ind2[6 * (i * SIZE + j) + 1] = (SIZE + 1) * j + i + 1
      ind2[6 * (i * SIZE + j) + 2] = (SIZE + 1) * (j + 1) + i + 1
      ind2[6 * (i * SIZE + j) + 3] = (SIZE + 1) * j + i
      ind2[6 * (i * SIZE + j) + 4] = (SIZE + 1) * (j + 1) + i + 1
      ind2[6 * (i * SIZE + j) + 5] = (SIZE + 1) * (j + 1) + i
    }
  }

  var color2 = [0.0, 0.0, 1.0]
  addMesh(vert2, ind2, color2)

  ///////////////////////////////////////////////////////////////////

  // const SLICES = 6;
  const SLICE_STEP = (Math.PI * 2) / SLICES // => 60 deg
  // console.log(SLICE_STEP/2/Math.PI*360)
  // const PLANES = 3;
  const PLANE_STEP = Math.PI / 2 / PLANES // => 30 deg
  // console.log(PLANE_STEP/2/Math.PI*360)
  var vert3 = []

  for (let p = 0; p < PLANES; p++) {
    // Calc the height of the plane
    let y = Math.sin(p * PLANE_STEP)
    let radius = Math.cos(p * PLANE_STEP)
    console.log(radius)
    for (let s = 0; s < SLICES; s++) {
      let x = Math.cos(s * SLICE_STEP) * radius
      let z = Math.sin(s * SLICE_STEP) * radius
      vert3.push([x, y, z])
    }
  }

  console.log(vert3)

  vert3.push([0, 1, 0])

  var ind3 = []

  for (let p = 0; p < PLANES - 1; p++) {
    for (let s = 0; s < SLICES; s++) {
      ind3.push(
        // "lower" triangles
        p * SLICES + s,
        p * SLICES + s + SLICES,
        p * SLICES + ((s + 1) % SLICES),
        // "upper" triangles
        p * SLICES + s + SLICES,
        p * SLICES + ((s + 1) % SLICES) + SLICES,
        p * SLICES + ((s + 1) % SLICES)
      )
    }
  }

  // Draw last plane = "top" (ugly, but works)
  let topIndex = vert3.length - 1
  let w = vert3.length - 1 - SLICES
  ind3.push(topIndex, w, topIndex - 1)
  for (let i = 0; i < SLICES - 1; i++) {
    ind3.push(topIndex, w + 1, w)
    w++
  }

  console.log(ind3)

  var color3 = [0.0, 1.0, 0.0]
  addMesh(vert3, ind3, color3)
}
