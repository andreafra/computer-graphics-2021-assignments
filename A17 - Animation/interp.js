// Returns the transform matrix obtained interpolating the given positions and angles
function InterpMat(
		tx1, ty1, tz1, rx1, ry1, rz1,
		tx2, ty2, tz2, rx2, ry2, rz2,
		a) {
	// tx1, ty1, tz1	-> Initial position
	// rx1, ry1, rz1	-> Initial rotation (in Euler angles)
	// tx2, ty2, tz2	-> Final position
	// rx2, ry2, rz2	-> Final rotation (in Euler angles)
	// a (in 0..1 range)	-> Interpolation coefficient
	//
	// return the interpolated transform matrix with the given position and rotation
	
	let translateMat = utils.MakeTranslateMatrix(
		Lerp(tx1, tx2, a), 
		Lerp(ty1, ty2, a), 
		Lerp(tz1, tz2, a));

	let q1 = Quaternion.fromEuler(utils.degToRad(rz1), utils.degToRad(rx1), utils.degToRad(ry1))
	let q2 = Quaternion.fromEuler(utils.degToRad(rz2), utils.degToRad(rx2), utils.degToRad(ry2))

	let rotateMat = q1.slerp(q2)(a).toMatrix4()

	return utils.multiplyMatrices(translateMat, rotateMat);
}

function Lerp(start, end, intPoint) {
	return (1 - intPoint) * start + intPoint * end;
}
