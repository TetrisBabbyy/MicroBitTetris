basic.clearScreen()
basic.showString("Welcome To Tetris, Press Button \"A\" to start")

input.onButtonPressed(Button.A, function () {
    if (x > 0) {
        led.unplot(x, y)
        x += -1
    }
})
input.onButtonPressed(Button.B, function () {
    if (x < 4) {
        led.unplot(x, y)
        x += 1
        led.plot(x, y)
    }
})
let y = 0
let x = 0
x = 2
let speed = 500
basic.forever(function () {
    led.plot(x, y)
    basic.pause(speed)
    if (y < 4 && !(led.point(x, y + 1))) {
        led.unplot(x, y)
        y += 1
    } else {
        y = 0
        x = 2
    }
    if (x == 5) {
    	
    }
})

