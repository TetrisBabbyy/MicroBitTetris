/**
 * Sets the speed of the moving LED and has a 1 second pause before the LED falls
 */
// Checks if the game is over (a column is full at the top row). If the column is full, then GAME OVER!!!!
function checkGameOver () {
    for (let col5 = 0; col5 <= 4; col5++) {
        if (led.point(col5, 0)) {
            gameOver()
            return
        }
    }
}
// When the A button is pressed, move the LED left by one position.
input.onButtonPressed(Button.A, function () {
    if (x > 0) {
        led.unplot(x, y)
        x += 0 - 1
    }
})
// This function handles the row clearing for when a row is full. If it is full, the row flashes and you gain 1 score.
function clearFullRows () {
    for (let row = 0; row <= 4; row++) {
        fullRow = true
        for (let col = 0; col <= 4; col++) {
            if (!(led.point(col, row))) {
                fullRow = false
                break;
            }
        }
        if (fullRow) {
            flashRow(row)
            for (let col2 = 0; col2 <= 4; col2++) {
                led.unplot(col2, row)
            }
            score += 1
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
    checkGameOver()
}
// This function flashes a row before clearing it.
function flashRow (row: number) {
    for (let index = 0; index < 3; index++) {
        for (let col3 = 0; col3 <= 4; col3++) {
            led.plot(col3, row)
        }
        basic.pause(100)
        for (let col4 = 0; col4 <= 4; col4++) {
            led.unplot(col4, row)
        }
        basic.pause(100)
    }
}
// Displays a game-over screen and stops the game with also showing what your score was.
function gameOver () {
    basic.clearScreen()
    basic.showString("GAME OVER SCORE")
    basic.showString("" + (score))
    // Restart the game after displaying "GAME OVER".
    control.reset()
}
// When the B button is pressed, move the LED right by one position.
input.onButtonPressed(Button.B, function () {
    if (x < 4) {
        led.unplot(x, y)
        x += 1
        led.plot(x, y)
    }
})
let score = 0
let fullRow = false
let y = 0
let x = 0
let speed = 500
basic.clearScreen()
basic.pause(1000)
// Plays the Tetris theme song forever.
basic.forever(function () {
    music.playTone(330, music.beat(BeatFraction.Whole))
    music.playTone(247, music.beat(BeatFraction.Half))
    music.playTone(262, music.beat(BeatFraction.Half))
    music.playTone(294, music.beat(BeatFraction.Whole))
    music.playTone(262, music.beat(BeatFraction.Half))
    music.playTone(247, music.beat(BeatFraction.Half))
    music.playTone(220, music.beat(BeatFraction.Whole))
    music.playTone(220, music.beat(BeatFraction.Half))
    music.playTone(262, music.beat(BeatFraction.Half))
    music.playTone(330, music.beat(BeatFraction.Whole))
    music.playTone(294, music.beat(BeatFraction.Half))
    music.playTone(262, music.beat(BeatFraction.Half))
    music.playTone(247, music.beat(BeatFraction.Whole))
    music.playTone(247, music.beat(BeatFraction.Half))
    music.playTone(262, music.beat(BeatFraction.Half))
    music.playTone(294, music.beat(BeatFraction.Whole))
    music.playTone(330, music.beat(BeatFraction.Whole))
    music.playTone(262, music.beat(BeatFraction.Whole))
    music.playTone(220, music.beat(BeatFraction.Whole))
    music.playTone(220, music.beat(BeatFraction.Whole))
    basic.pause(400)
    music.playTone(294, music.beat(BeatFraction.Whole))
    music.playTone(349, music.beat(BeatFraction.Half))
    music.playTone(440, music.beat(BeatFraction.Half))
    music.playTone(440, music.beat(BeatFraction.Half))
    music.playTone(392, music.beat(BeatFraction.Half))
    music.playTone(349, music.beat(BeatFraction.Half))
    music.playTone(330, music.beat(BeatFraction.Whole))
    music.playTone(262, music.beat(BeatFraction.Whole))
    music.playTone(330, music.beat(BeatFraction.Whole))
    music.playTone(294, music.beat(BeatFraction.Half))
    music.playTone(262, music.beat(BeatFraction.Half))
    music.playTone(247, music.beat(BeatFraction.Whole))
    music.playTone(247, music.beat(BeatFraction.Half))
})
// Handles the LED falling down the grid.
basic.forever(function () {
    led.plot(x, y)
    basic.pause(speed)
    if (y < 4 && !(led.point(x, y + 1))) {
        led.unplot(x, y)
        y += 1
    } else {
        clearFullRows()
        y = 0
        x = 2
    }

    let spaceFilled = false

    if (x, y < 4 && !(led.point(x, y + 1))) {
        led.plot(x, y)
    }
})




