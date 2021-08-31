function drawSceneTree(s) {

	// var i;
	// for(i = 0; i < 1; i++) {
	// 	draw(i, utils.multiplyMatrices(utils.multiplyMatrices(utils.multiplyMatrices(
	// 		 utils.MakeTranslateMatrix(s[i][0], s[i][1], s[i][2]),
	// 		 utils.MakeRotateZMatrix(s[i][5])),
	// 		 utils.MakeRotateXMatrix(s[i][3])),
	// 		 utils.MakeRotateYMatrix(s[i][4])));
	// }
	if (s)
		draw_r(0, null, s)
}

function draw_r(i, parentMat, elems) {
	let elem = elems[i]
	let transMat = utils.MakeTranslateMatrix(elem[0], elem[1], elem[2])
	let rotatMat = utils.multiplyMatrices(
		utils.MakeRotateZMatrix(elem[5]),
		utils.MakeRotateXMatrix(elem[3]),
		utils.MakeRotateYMatrix(elem[4])
	)
	let mat = utils.multiplyMatrices(
		transMat,
		rotatMat
	)

	let finalMat = parentMat ? utils.multiplyMatrices(parentMat, mat) : mat

	draw(i, finalMat)

	// return if child
	if (elem[6] < 0 || elem[7] < 0) return

	// for each child
	for(let j = elem[6]; j <= elem[7]; j++) {
		draw_r(j, finalMat, elems)
	}

}