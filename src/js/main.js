window.hiddenProperty =
	'hidden' in document
		? 'hidden'
		: 'webkitHidden' in document
		? 'webkitHidden'
		: 'mozHidden' in document
		? 'mozHidden'
		: null

window.DIRECTIONS = {
	UP: 'UP',
	DOWN: 'DOWN',
	LEFT: 'LEFT',
	RIGHT: 'RIGHT',
	UNDIRECTED: 'UNDIRECTED'
}
window.isPhone =
	/Mobile|Android|iOS|iPhone|iPad|iPod|Windows Phone|KFAPWI/i.test(
		navigator.userAgent
	) && window.innerWidth < 760

function getMoveDirection(startx, starty, endx, endy) {
	if (!isPhone) {
		return
	}

	const angx = endx - startx
	const angy = endy - starty

	if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
		return DIRECTIONS.UNDIRECTED
	}

	const getAngle = (angx, angy) => (Math.atan2(angy, angx) * 180) / Math.PI

	const angle = getAngle(angx, angy)
	if (angle >= -135 && angle <= -45) {
		return DIRECTIONS.UP
	} else if (angle > 45 && angle < 135) {
		return DIRECTIONS.DOWN
	} else if (
		(angle >= 135 && angle <= 180) ||
		(angle >= -180 && angle < -135)
	) {
		return DIRECTIONS.LEFT
	} else if (angle >= -45 && angle <= 45) {
		return DIRECTIONS.RIGHT
	}

	return DIRECTIONS.UNDIRECTED
}

const signatureEl = $('#signature')
const maxAlpha = 0.7;
function getDayLight() {
	let time = new Date()
	let hour = time.getHours() - 12
	let factor = hour ? Math.abs(hour) / hour : 1
	hour = hour + (time.getMinutes() * 60 + time.getSeconds()) / 3600

	const result = (hour / 4 - factor) * factor
	return Math.min(maxAlpha, Math.max(result, 0))
}

function setLightColor() {
	$('#page').style.backgroundColor = `rgba(85,85,85,${getDayLight()})`
}

function typeSignature() {
	typeSignature.count = typeSignature.count || 0

	if (typeSignature.count <= signature.length) {
		signatureEl.innerHTML = `${signature.slice(0, typeSignature.count++)}|`
		setTimeout(typeSignature, 100)
	} else {
		signatureEl.innerHTML = signature
	}
}

function messenger(el) {
	const context = this
	let countCall = 0
	let counter = 0
	let callCount = 0

	context.init = function() {
		context.codeletters = '&#*+%?￡@§$'
		context.message = 0
		context.currentLength = 0
		context.fadeBuffer = false
		context.messages = ['...']

		setTimeout(context.animateIn, 100)
	}

	context.generateRandomString = function(length) {
		let randomText = ''
		while (randomText.length < length) {
			randomText += context.codeletters.charAt(
				Math.floor(Math.random() * context.codeletters.length)
			)
		}

		return randomText
	}

	context.animateIn = function() {
		if (context.currentLength < context.messages[context.message].length) {
			context.currentLength = context.currentLength + 2
			if (context.currentLength > context.messages[context.message].length) {
				context.currentLength = context.messages[context.message].length
			}

			el.innerHTML = context.generateRandomString(context.currentLength)

			setTimeout(context.animateIn, 20)
		} else {
			if (++callCount > 2) {
				return
			}
			setTimeout(context.animateFadeBuffer, 20)
		}
	}

	context.animateFadeBuffer = function() {
		if (context.fadeBuffer === false) {
			context.fadeBuffer = []
			for (let i = 0; i < context.messages[context.message].length; i++) {
				context.fadeBuffer.push({
					c: Math.floor(Math.random() * 12) + 1,
					l: context.messages[context.message].charAt(i)
				})
			}
		}

		let doCycles = false
		let message = ''

		for (let i = 0; i < context.fadeBuffer.length; i++) {
			let fader = context.fadeBuffer[i]
			if (fader.c > 0) {
				doCycles = true
				fader.c--
				message += context.codeletters.charAt(
					Math.floor(Math.random() * context.codeletters.length)
				)
			} else {
				message += fader.l
			}
		}

		el.innerHTML = message

		if (doCycles === true) {
			if (++counter === 15) {
				typeSignature()
				countCall = 3
				return
			} else if (counter < 15) {
				setTimeout(context.animateFadeBuffer, 50)
			} else {
				return
			}
		} else {
			if (countCall > 2) {
				return
			} else if (++countCall === 2) {
				typeSignature()
			} else {
				context.cycleText()
			}
		}
	}
	context.cycleText = function() {
		context.message = context.message + 1
		if (context.message >= context.messages.length) {
			context.message = 0
		}

		context.currentLength = 0
		context.fadeBuffer = false
		el.innerHTML = ''

		setTimeout(context.animateIn, 200)
	}

	context.init()
}

function loadMain() {
	if (loadMain.loaded) {
		return
	}
	setLightColor()
	setTimeout(() => {
		$('.card-inner').classList.add('in')
		new messenger(signatureEl)
	}, 400)
	loadMain.loaded = true
}

loadMain();
