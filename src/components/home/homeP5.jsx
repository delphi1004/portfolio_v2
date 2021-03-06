import React, { useState, useEffect } from 'react'
import './home.css'
import Curtain from '../curtain/curtain'
import Sketch from 'react-p5'

class Cursor {

  constructor(p5, x, y) {
    this.p5 = p5
    this.curX = x
    this.curY = y
    this.interval = 50
    this.width = 70
    this.ellipseSec = 0
    this.showCursor = false
  }

  moveTo(x, y) {
    this.curX = x
    this.curY = y
  }

  draw() {
    this.p5.fill(255)
    this.p5.stroke(255)

    if (this.p5.millis() > this.ellipseSec + this.interval) {
      this.showCursor = !this.showCursor
      this.ellipseSec = this.p5.millis()
    }

    if (this.showCursor) {
      this.p5.rect(this.curX, this.curY + 5, this.width, 5)
    }
  }
}

class Particle {

  constructor(p5, letter, x, y, style = p5.NORMAL) {
    this.p5 = p5
    this.letter = letter
    this.originX = x
    this.originY = y
    this.curX = x
    this.curY = y
    this.velocity = null
    this.textStyle = style
    this.flyingEnabled = false
    this.returnToOrigin = false
    this.startReturnToOrigin = false
    this.returnToOriginInterval = 5000
    this.ellipseSec = 0
    this.homeVelocity = 0
    this.smallScreenDetected = false
    this.abstacleRadious = 0
  }

  init() {
    this.velocity = this.p5.createVector(0, 0, 0)
  }

  setObstacleRadious(radious) {
    this.abstacleRadious = radious
  }

  setFlying(enable) {
    this.flyingEnabled = enable
  }

  setObstacle(x, y) {
    let detect = false
    let dist = this.p5.dist(this.curX, this.curY, x, y)

    if (dist <= this.abstacleRadious) {
      this.velocity.x = (this.curX - x) * 0.05
      this.velocity.y = (this.curY - y) * 0.05
      this.ellipseSec = this.p5.millis()
      this.returnToOrigin = false
      this.startReturnToOrigin = false
      detect = true
    } else {
      this.startReturnToOrigin = true
    }

    return detect
  }

  getX() {
    return this.originX
  }

  getY() {
    return this.originY
  }

  draw() {
    this.p5.textStyle(this.textStyle)
    this.p5.text(this.letter, this.curX, this.curY)

    if (this.flyingEnabled) {
      this.curX += this.velocity.x
      this.curY += this.velocity.y

      if (this.curX <= 0 || this.curX >= this.p5.windowWidth) {
        this.velocity.x *= -1
        this.velocity.x += this.p5.random(-0.5, 0.5)
      }

      if (this.curY <= 0 || this.curY >= this.p5.windowHeight) {
        this.velocity.y *= -1
        this.velocity.y += this.p5.random(-0.5, 0.5)
      }

      if (this.startReturnToOrigin && this.p5.millis() > this.ellipseSec + this.returnToOriginInterval) {
        this.returnToOrigin = true
        this.startReturnToOrigin = false
        this.homeVelocity = 0.09
      }

      if (this.returnToOrigin) {
        this.velocity.x = (this.originX - this.curX) * this.homeVelocity
        this.velocity.y = (this.originY - this.curY) * this.homeVelocity

        if (this.p5.abs(this.velocity.x) < 0.01 && this.p5.abs(this.velocity.y) < 0.01) {
          this.returnToOrigin = false
          this.curX = this.originX
          this.curY = this.originY
        }
      }
    }
  }
}

let particles = []
let cursor = null
let ellipseSec = 0
let letterIndex = 0
let textInterval = 1000
let typeText = true
let smallScreenDetected = false
let startAnimation = false
let mousePressed = false
let abstacleRadious = 200
let abstacleRadiousDirection = 1.5
const title = ['I AM', 'JOHN LEE', '', ' ', 'A CREATIVE', 'TECHNOLOGIST', 'NEW MEDIA', 'ARTIST.']
const letterPos = [0, 27.197265625, 51.953125, 117.1875, 0, 55.17578125, 123.92578125, 195.21484375, 266.50390625,
  291.259765625, 345.068359375, 401.904296875, 0, 0, 65.234375, 89.990234375, 155.078125, 216.650390625, 273.486328125,
  338.720703125, 398.388671875, 425.5859375, 489.208984375, 0, 59.66796875, 116.50390625, 181.591796875, 252.880859375,
  324.169921875, 392.919921875, 446.728515625, 515.478515625, 583.59375, 610.791015625, 670.1171875, 0, 71.2890625,
  128.125, 216.845703125, 241.6015625, 328.90625, 385.7421875, 451.318359375, 478.515625, 0, 65.234375, 126.806640625,
  186.474609375, 213.671875, 272.998046875, 332.666015625]

const rest = () => {
  particles = []
  cursor = null
  ellipseSec = 0
  letterIndex = 0
  textInterval = 1000
  typeText = true
  startAnimation = false
}

const init = (p5, parentRef) => {
  p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.P2D).parent(parentRef)
  p5.noStroke()
  p5.textFont('Roboto')
  p5.textSize(100)
  p5.textStyle(p5.NORMAL)

  if (p5.windowWidth < 1000) {
    smallScreenDetected = true
  } else {
    smallScreenDetected = false
  }

  cursor = new Cursor(p5, 300, 500)

  let ketterCount = 0
  let posY = p5.windowHeight * 0.2
  for (let i = 0; i < title.length; i++) {
    for (let j = 0; j < title[i].length; j++) {
      if (i < 2) {
        particles.push(new Particle(p5, title[i][j], letterPos[ketterCount] + 150, ((i + 1) * 90) + posY, p5.NORMAL))
      } else {
        particles.push(new Particle(p5, title[i][j], letterPos[ketterCount] + 150, ((i + 1) * 75) + posY, p5.BOLD))
      }
      ketterCount++
    }
  }

  for (let particle of particles) {
    particle.init()
    particle.setObstacleRadious(abstacleRadious - (abstacleRadious * 0.2))
  }
}

const handleMousePressed = () => {
  mousePressed = true
}

const handleMouseReleased = () => {
  mousePressed = false
}

const draw = (p5) => {
  p5.background(255, 108, 47)
  p5.strokeWeight(1)

  p5.stroke(255)
  p5.fill(255)

  if (smallScreenDetected) {
    p5.textSize(50)
    p5.textSize(p5.NORMAL)
    p5.text('I AM', 100, 350)
    p5.text('JOHN LEE', 100, 400)
    p5.textSize(p5.BOLD)
    p5.textSize(60)
    p5.text('A CREATIVE', 100, 500)
    p5.text('TECHNOLOGIST', 100, 547)
    p5.text('NEW MEDIA', 100, 594)
    p5.text('ARTIST', 100, 641)
    return
  }

  p5.textSize(100)
  p5.textStyle(p5.NORMAL)

  if (typeText) {
    cursor.moveTo(particles[letterIndex].getX(), particles[letterIndex].getY())
    cursor.draw()
  }

  if (startAnimation) {
    for (let i = 0; i <= letterIndex; i++) {
      particles[i].draw()
    }

    if (letterIndex === 12) {
      textInterval = 1000
    }

    if (letterIndex === 34) {
      textInterval = 1000
    }

    if (p5.millis() > ellipseSec + textInterval && typeText) {
      letterIndex++
      textInterval = p5.random(50, 100)

      if (letterIndex >= particles.length) {
        letterIndex = (particles.length - 1)
        typeText = false

        for (let parcitle of particles) {
          parcitle.setFlying(true)
        }
      }
      ellipseSec = p5.millis()
    }
  }

  if (p5.millis() > ellipseSec + textInterval && startAnimation === false) {
    startAnimation = true
  }

  if (startAnimation && !typeText) {
    p5.noFill()
    p5.stroke(255)
    p5.strokeWeight(10 - p5.sin(p5.frameCount / 10) * 5)
    p5.ellipse(p5.mouseX, p5.mouseY, abstacleRadious, abstacleRadious)

    p5.cursor('grab')
    for (let parcitle of particles) {
      parcitle.setObstacle(p5.mouseX, p5.mouseY)
    }

    if (mousePressed) {
      abstacleRadious += abstacleRadiousDirection

      if (abstacleRadious > 400 || abstacleRadious < 40) {
        abstacleRadiousDirection *= -1
      }

      for (let parcitle of particles) {
        parcitle.setObstacleRadious(abstacleRadious - (abstacleRadious * 0.2))
      }
    }
  }
}

const HomeP5 = () => {
  const [startP5, setStartP5] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      rest()
      setStartP5(true)
    }, 1500)

  }, [])

  const resized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight)

    if (p5.windowWidth < 1000) {
      smallScreenDetected = true
    } else {
      smallScreenDetected = false
    }
  }

  return (
    <div id='titleContainer'>
      <Curtain />
      { startP5 &&
        <Sketch
          setup={(p5, parentRef) => {
            init(p5, parentRef)
          }}

          draw={p5 => draw(p5)}
          windowResized={p5 => resized(p5)}
          mousePressed={() => handleMousePressed()}
          mouseReleased={() => handleMouseReleased()}
        />
      }
    </div>
  )
}

export default HomeP5