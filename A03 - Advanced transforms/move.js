function move() {

	let MM = (m1, m2) => utils.multiplyMatrices(m1, m2)

	// Rotate 60 degrees around an arbitrary axis passing through (0,1,-1). The x-axis can be aligned to the arbitrary axis after a rotation of 45 degrees around the z-axis, and then 15 degrees around the y-axis.

	let R1_t = utils.MakeTranslateMatrix(0, 1, -1)
	let R1_t_inv = utils.invertMatrix(R1_t)
	let R1_rx = utils.MakeRotateXMatrix(60) // 3
	let R1_rz = utils.MakeRotateZMatrix(45) // 5
	let R1_rz_inv = utils.invertMatrix(R1_rz) // 1 
	let R1_ry = utils.MakeRotateYMatrix(15) // 4
	let R1_ry_inv = utils.invertMatrix(R1_ry) // 2
 
	// Apply transformations
	let R1 = MM(R1_t, MM(R1_ry, MM(R1_rz, MM(R1_rx, MM(R1_rz_inv, MM(R1_ry_inv, R1_t_inv))))))

	// Half the size of the object along a line that bisects the positive x and y axes on the xy-plane.
	var S1 = MM(
		utils.MakeScaleNuMatrix(Math.cos(utils.degToRad(45)), Math.sin(utils.degToRad(45)), 1),
		utils.MakeRotateZMatrix(45),
	)
	   
	// Mirror the starship along a plane passing through (1,1,1), and obtained rotating 15 degree around the x axis the xz plane

	let S2_t = utils.MakeTranslateMatrix(1, 1, 1) // 5
	let S2_t_inv = utils.invertMatrix(S2_t) // 1
	let S2_r = utils.MakeRotateXMatrix(15) //4
	let S2_r_inv = utils.invertMatrix(S2_r) // 2
	let S2_s = utils.MakeScaleNuMatrix(1, -1, 1) // 3, Mirror

	let S2 = MM(S2_t, MM(S2_r, MM(S2_s, MM(S2_r_inv, S2_t_inv))))

			   
	// Apply the inverse of the following sequence of transforms: rotation of 30 degree around the Y axis then Translation of (0, 0, 5), and finally a uniform scaling of a factor of 3.
	let I1_r = utils.MakeRotateYMatrix(30)
	let I1_t = utils.MakeTranslateMatrix(0, 0, 5)
	let I1_s = utils.MakeScaleMatrix(3)

	// Inverse matrices
	let I1_r_inv = utils.invertMatrix(I1_r)
	let I1_t_inv = utils.invertMatrix(I1_t)
	let I1_s_inv = utils.invertMatrix(I1_s)

	let I1 = MM(I1_r_inv, MM(I1_t_inv, I1_s_inv))

	// Done
	return [R1, S1, S2, I1];
}

