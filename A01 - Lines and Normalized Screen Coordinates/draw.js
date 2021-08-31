function draw() {
  // line(x1,y1, x2,y2)
  // draws a line from a point at Normalized screen coordinates x1,y1 to Normalized screen coordinates x2,y2

  const MAX_SEGMENTS = 64

  // draw top line
  line(-0.5, 0.3, 0.3, 0.3)
  // draw bottom line
  line(-0.5, -0.3, 0.3, -0.3)
  // draw back line
  line(-0.5, 0.3, -0.5, -0.3)

  // draw front part

  // Circle center
  let xC = 0.3
  let yC = 0
  let radius = 0.3
  let angleStep = Math.PI / MAX_SEGMENTS
  var currentAngle = Math.PI / 2
  for (let i = 0; i < MAX_SEGMENTS; i++) {
    let x1 = Math.cos(currentAngle) * radius + xC
    let y1 = Math.sin(currentAngle) * radius + yC
    currentAngle -= angleStep
    let x2 = Math.cos(currentAngle) * radius + xC
    let y2 = Math.sin(currentAngle) * radius + yC
    line(x1, y1, x2, y2)
  }
}
