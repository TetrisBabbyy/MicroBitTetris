function clearFullColumns() {
    for (let col3 = 0; col3 <= 4; col3++) {
        fullColumn = true
        for (let row2 = 0; row2 <= 4; row2++) {
            if (!(led.point(col3, row2))) {
                fullColumn = false
                break;
            }
        }
        if (fullColumn) {
            for (let row3 = 0; row3 <= 4; row3++) {
                led.unplot(col3, row3)
            }
            for (let d = col3; d < 4; d++) {
                for (let s = 0; s < 5; s++) {
                    if (led.point(d + 1, s)) {
                        led.plot(d, s)
                    } else {
                        led.unplot(d, s)
                    }
                }
            }
        }
    }
}
input.onButtonPressed(Button.A, function () {
    if (x > 0) {
        led.unplot(x, y)
        x += 0 - 1
    }
})
function clearFullRows() {
    for (let row = 0; row <= 4; row++) {
        fullRow = true
        for (let col = 0; col <= 4; col++) {
            if (!(led.point(col, row))) {
                fullRow = false
                break;
            }
        }
        if (fullRow) {
            for (let col2 = 0; col2 <= 4; col2++) {
                led.unplot(col2, row)
            }
            for (let r = row; r > 0; r--) {
                for (let c = 0; c < 5; c++) {
                    if (led.point(c, r - 1)) {
                        led.plot(c, r)
                    } else {
                        led.unplot(c, r)
                    }
                }
            }
        }
    }
}
input.onButtonPressed(Button.B, function () {
    if (x < 4) {
        led.unplot(x, y)
        x += 1
        led.plot(x, y)
    }
})
let fullRow = false
let y = 0
let fullColumn = false
let x = 0
x = 2
let speed = 500
basic.clearScreen()
basic.pause(1000)
basic.forever(function () {
    led.plot(x, y)
    basic.pause(speed)
    if (y < 4 && !(led.point(x, y + 1))) {
        led.unplot(x, y)
        y += 1
    } else {
        clearFullRows()
        clearFullColumns()
        y = 0
        x = 2
    }
})

let melody = [
    262, 262, 294, 349, 349, 349, 349, 349, 349, 294, 262, 262, 294, 349, 349, 349,
    349, 349, 349, 294, 262, 262, 294, 349, 349, 349, 349, 349, 349, 294, 262
]

basic.forever(function () {
    for (let note of melody) {
        music.playTone(note, music.beat(BeatFraction.Half))
    }
})
