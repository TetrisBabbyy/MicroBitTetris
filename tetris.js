let score = 0
let fullRow = false
let y = 0
let x = 2
let currentShape: number[][] = []
let rotationState = 0
let speed = 500

const shapes = [
    // 1x1 shape
    [
        [1]
    ],
    [
        [1],
        [1]
    ],
    [
        [1, 1]
    ]
]

// Function to get a random shape from the defined shapes
function getRandomShape(): number[][] {
    let shapeIndex = Math.randomRange(0, shapes.length - 1)
    return shapes[shapeIndex]
}

// Function to draw the shape on the grid
function drawShape(x: number, y: number, shape: number[][]) {
    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
            if (shape[i][j] == 1) {
                led.plot(x + j, y + i)
            }
        }
    }
}

// Function to clear the shape from the grid
function clearShape(x: number, y: number, shape: number[][]) {
    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
            if (shape[i][j] == 1) {
                led.unplot(x + j, y + i)
            }
        }
    }
}

// Function to handle falling shapes
basic.forever(function () {
    drawShape(x, y, currentShape)
    basic.pause(speed)

    // Check if the falling LED is at the bottom or collides with an existing shape
    if (y + currentShape.length < 5 && !led.point(x, y + currentShape.length)) {
        clearShape(x, y, currentShape)
        y += 1
    } else {
        // When the block stops, check for full rows and spawn new shape
        clearFullRows()
        currentShape = getRandomShape()
        x = 2
        y = 0

        // Increase speed after every 5 points
        if (score % 5 === 0 && score !== 0) {
            speed -= 50  // Decrease speed to make blocks fall faster
            if (speed < 100) {
                speed = 100  // Set a minimum speed to avoid the blocks falling too fast
            }
        }
    }
})

// Check if a column at the top is full and ends the game if so
function checkGameOver() {
    for (let col5 = 0; col5 <= 4; col5++) {
        if (led.point(col5, 0)) {
            gameOver()
            return
        }
    }
}

// When the A button is pressed, move the LED left by one position.
input.onButtonPressed(Button.A, function () {
    if (x > 0 && !(led.point(x - 1, y))) {
        clearShape(x, y, currentShape) // Clear the current shape
        x -= 1
        drawShape(x, y, currentShape)  // Draw the shape in the new position
    }
})

// When the B button is pressed, move the LED right by one position.
input.onButtonPressed(Button.B, function () {
    if (x + currentShape[0].length < 5 && !(led.point(x + currentShape[0].length, y))) {
        clearShape(x, y, currentShape) // Clear the current shape
        x += 1
        drawShape(x, y, currentShape)  // Draw the shape in the new position
    }
})

// This function handles the row clearing for when a row is full. If it is full, the row flashes and you gain 1 score.
function clearFullRows() {
    for (let row = 0; row <= 4; row++) {
        fullRow = true
        for (let col = 0; col <= 4; col++) {
            if (!(led.point(col, row))) {
                fullRow = false
                break
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
function flashRow(row: number) {
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
function gameOver() {
    basic.clearScreen()
    basic.showString("GAME OVER SCORE")
    basic.showString("" + score)
    // Restart the game after displaying "GAME OVER".
    control.reset()
}

input.onGesture(Gesture.Shake, function () {
    if (music.volume() > 1) {
        music.setVolume(0)
    } else {
        music.setVolume(127)
    }
})

basic.clearScreen()
basic.pause(1000)

// Start the game with a random shape
currentShape = getRandomShape()

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
