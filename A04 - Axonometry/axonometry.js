function MakeParallelProjMatrix (w, a, n, f) {
	return [
		1/w, 0, 0, 0,
		0, a/w, 0, 0,
		0, 0, -2/(f-n), -((f+n)/(f-n)),
		0, 0, 0, 1
	]
}

// UTILS
// Shorthand to multiply 2 matrices
const MM = (m1, m2) => utils.multiplyMatrices(m1, m2)

// EXERCISE ======================

function axonometry() {
	// Make an isometric view, w = 50, a = 16/9, n = 1, f = 101.
	var A1 = MM(MakeParallelProjMatrix(50, 16/9, 1, 101), MM(utils.MakeRotateXMatrix(35.26), utils.MakeRotateYMatrix(45)))
		
	// Make a dimetric view, w = 50, a = 16/9, n = 1, f = 101, rotated 20 around the x-axis
	var A2 =  MM(MakeParallelProjMatrix(50, 16/9, 1, 101), MM(utils.MakeRotateXMatrix(20), utils.MakeRotateYMatrix(45)))
			   
	// Make a trimetric view, w = 50, a = 16/9, n = 1, f = 101, rotated -30 around the x-axis and 30 around the y-axis
	var A3 =  MM(MakeParallelProjMatrix(50, 16/9, 1, 101), MM(utils.MakeRotateXMatrix(-30), utils.MakeRotateYMatrix(30)))
			   
	// Make an cavalier projection view, w = 50, a = 16/9, n = 1, f = 101, at 45 degrees
	const O1_rho = 1
	const O1_hx = -O1_rho * Math.cos(utils.degToRad(45))
	const O1_hy = -O1_rho * Math.sin(utils.degToRad(45))

	var O1 =  MM(MakeParallelProjMatrix(50, 16/9, 1, 101), utils.MakeShearZMatrix(O1_hx, O1_hy))

	// Make a cabinet projection view, w = 50, a = 16/9, n = 1, f = 101, at 60 degrees
	const O2_rho = 0.5
	const O2_hx = -O2_rho * Math.cos(utils.degToRad(60))
	const O2_hy = -O2_rho * Math.sin(utils.degToRad(60))

	var O2 =  MM(MakeParallelProjMatrix(50, 16/9, 1, 101), utils.MakeShearZMatrix(O2_hx, O2_hy))

	return [A1, A2, A3, O1, O2];
}
