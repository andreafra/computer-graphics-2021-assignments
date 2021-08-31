const MM = (m1, m2) => utils.multiplyMatrices(m1, m2)

const MakeLookInDirectionViewMatrix = (c_x, c_y, c_z, direction, elevation, roll) => MM(
	utils.MakeRotateZMatrix(-roll),
	MM(
		utils.MakeRotateXMatrix(-elevation),
		MM(
			utils.MakeRotateYMatrix(-direction),
			utils.MakeTranslateMatrix(-c_x, -c_y, -c_z)
		)
	)
)

const MakeLookAtViewMatrix = (c_x, c_y, c_z, t_x, t_y, t_z, u_x, u_y, u_z) => {
	let v_z = utils.normalizeVector3([
		c_x - t_x,
		c_y - t_y,
		c_z - t_z
	])

	let v_x = utils.normalizeVector3(
		utils.crossVector([u_x, u_y, u_z], v_z)
	)

	let v_y = utils.crossVector(v_z, v_x)

	let cameraMatrix = [
		v_x[0], v_y[0], v_z[0], c_x,
		v_x[1], v_y[1], v_z[1], c_y,
		v_x[2], v_y[2], v_z[2], c_z,
		0,		0,		0,		1
	]

	let viewMatrix = utils.invertMatrix(cameraMatrix)

	return viewMatrix
}

function view() {
	// Make a Look-In-Direction matrix centered at (5,2.5,0), looking west and aiming 30 degrees down.

	var A1 = MakeLookInDirectionViewMatrix(5, 2.5, 0, 90, -30, 0)
			   
	// Make a Look-In-Direction matrix centered at (0,-1,-5), angled 170 degrees, with an elevation of 15 degrees, and a roll of 45 degrees.
	var A2 = MakeLookInDirectionViewMatrix(0, -1, -5, 170, 15, 45)
			   
	// Make a Look-At-Matrix, centered at (-4, 2, -4), aiming at (0,0.5,0.5) and with up-vector (0,1,0).
		var A3 =  MakeLookAtViewMatrix(-4, 2, -4, 0, 0.5, 0.5, 0, 1, 0)
			   
	// Make a Look-At-Matrix, centered at (2.57, 0, 0), aiming at (2.8,0,-1) and with up-vector (1,0,0).
		var A4 = MakeLookAtViewMatrix(2.57, 0, 0, 2.8, 0, -1, 1, 0, 0)

	return [A1, A2, A3, A4];
}