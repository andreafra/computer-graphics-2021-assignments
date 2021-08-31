// shorthand
const MM = (m1, m2) => utils.multiplyMatrices(m1, m2)

function world() {
	// Positioned in 0,0,-3. Yaw=90, Pitch and Roll = 0
	var A1 = MM(
		utils.MakeTranslateMatrix(0, 0, -3),
		MM(
			utils.MakeRotateYMatrix(90),
			// skip X and Z rotations
			utils.MakeScaleMatrix(1)
		)
	)
			   
	// Positioned in 0,2,0. Yaw=0, Pitch = 60, Roll = 0, 1/10th of size
	var A2 =   MM(
		utils.MakeTranslateMatrix(0, 2, 0),
		MM(
			// skip Y rotation
			utils.MakeRotateXMatrix(60),
			// skip Z rotation
			utils.MakeScaleMatrix(1/10)
		)
	)
			   
	// Positioned in 0,0,0. Yaw=30, Pitch = 0 Roll = 45
	var A3 = MM(
		// skip translation
		utils.MakeRotateYMatrix(30),
		// skip x rotation
		utils.MakeRotateZMatrix(45)
	)
			   
	// Positioned in 2,0,2. Yaw=180, Pitch and Roll = 0, two times wider
	var A4 = MM(
		utils.MakeTranslateMatrix(2, 0, 2),
		MM(
			utils.MakeRotateYMatrix(180),
			// skip x, z rotation
			utils.MakeScaleNuMatrix(2, 1, 1)
		)
	)

	// Positioned in 1,-1,2.5. Yaw=-30, Pitch = 45 Roll = -15, Scaled with the following factors: 0.8 (x), 0.75 (y), 1.2 (z)
	var A5 = MM(
		utils.MakeTranslateMatrix(1, -1, 2.5),
		MM(
			utils.MakeRotateYMatrix(-30),
			MM(
				utils.MakeRotateXMatrix(45),
				MM(
					utils.MakeRotateZMatrix(-15),
					utils.MakeScaleNuMatrix(0.8, 0.75, 1.2)
				)
			)
		)
	)

	return [A1, A2, A3, A4, A5];
}