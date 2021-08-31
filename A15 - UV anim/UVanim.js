const MM = (m1, m2) => utils.multiplyMatrices(m1, m2)

// t is between 0 and 1

function Anim1(t) {
	// moving car
	let timeScaled = t % 0.25
	var out = utils.MakeTranslateMatrix(timeScaled, 0.5, 0)
	out = MM(out, utils.MakeScaleMatrix(1/4))
	return out;
}

function Anim2(t) {
	// bumping code
	let yTop = 0
	let yBot = -0.5
	let yPos = t < 0.5 ? yTop - t/2 : yBot + t/2
	var out = utils.MakeTranslateMatrix(0.75, 0.75 + yPos, 0)
	out = MM(out, utils.MakeScaleMatrix(1/4))
	return out;
}

function Anim3(t) {
	// rotating fan
	let speed = 360 *  t
	let translate_m = utils.invertMatrix(utils.MakeTranslateMatrix(-0.625, -0.875, 0))
	let rotate_m = utils.invertMatrix(utils.MakeRotateZMatrix(speed))
	let scale_m = utils.invertMatrix(utils.MakeScaleMatrix(4))
	let translate_relSpace = utils.MakeTranslateMatrix(-.5, -.5, 0)
	let out = MM(translate_m, MM(rotate_m, MM(scale_m, translate_relSpace)))
	return out;
}

function Anim4(t) {
	// burning flame
	let atlas_height = 0.5
	let atlas_width = 1
	let rows = 6
	let cols = 12

	let sprites = 6 * 12
	
	let spr_h = atlas_height / rows
	let spr_w = atlas_width / cols

	let start_x = 0
	let start_y = spr_h * 5

	let idx = Math.floor(t *  sprites)

	let _x = start_x + (idx % cols) * spr_w
	let _y = start_y - spr_h * Math.floor(idx / cols)

	var out = utils.MakeTranslateMatrix(_x, _y, 0)
	
	out = MM(out, utils.MakeScaleMatrix(1/2/rows))

	return out;
}
