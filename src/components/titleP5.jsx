/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import './title.css'
import Curtain from './curtain'
import Sketch from 'react-p5'
import { CollectionsBookmarkOutlined, ContactlessOutlined } from '@material-ui/icons'


let x = 0

class Cursor {

  constructor(p5, x, y) {
    this.p5 = p5
    this.curX = x
    this.curY = y
    this.interval = 50
    this.width = 60
    this.ellipseSec = 0
    this.showCursor = false
    this.flyingEnabled = false
  }

  moveTo(x, y) {
    this.curX = x
    this.curY = y
  }

  setFlying(enable) {
    this.flyingEnabled = enable
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
  }

  init() {
    this.velocity = this.p5.createVector(0, 0, 0)
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
  }
}

let particles = []
let cursor = null
let ellipseSec = 0
let letterIndex = 0
let textInterval = 1000
let typeText = true
let startAnimation = false
const title = ['I AM', 'JOHN LEE', ' ', '', 'A CREATIVE', 'TECHNOLOGIST', 'NEW MEDIA', 'ARTIST.']
const letterPos = [0, 27.197265625, 51.953125, 117.1875, 0, 55.17578125, 123.92578125, 195.21484375, 266.50390625,
  291.259765625, 345.068359375, 401.904296875, 0, 0, 65.234375, 89.990234375, 155.078125, 216.650390625, 273.486328125,
  338.720703125, 398.388671875, 425.5859375, 489.208984375, 0, 59.66796875, 116.50390625, 181.591796875, 252.880859375,
  324.169921875, 392.919921875, 446.728515625, 515.478515625, 583.59375, 610.791015625, 670.1171875, 0, 71.2890625,
  128.125, 216.845703125, 241.6015625, 328.90625, 385.7421875, 451.318359375, 478.515625, 0, 65.234375, 126.806640625,
  186.474609375, 213.671875, 272.998046875, 332.666015625]
//const title = ['I']

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
  p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(parentRef)
  p5.noStroke()
  p5.textFont('Roboto')
  p5.textSize(100)
  p5.textStyle(p5.NORMAL)

  cursor = new Cursor(p5, 300, 500)

  let xOffset = 0
  let ketterCount = 0
  let posY = p5.windowHeight * 0.2
  for (let i = 0; i < title.length; i++) {
    xOffset = 0
    for (let j = 0; j < title[i].length; j++) {
      if (i < 2) {
        particles.push(new Particle(p5, title[i][j], letterPos[ketterCount] + 150, ((i + 1) * 90) + posY, p5.NORMAL))
      } else {
        particles.push(new Particle(p5, title[i][j], letterPos[ketterCount] + 150, ((i + 1) * 75) + posY, p5.BOLD))
      }
      xOffset += p5.textWidth(title[i][j])
      ketterCount++
    }
  }
}

const resized = (p5) => {
  p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
}

const draw = (p5) => {
  p5.background(255, 108, 47)
  p5.strokeWeight(1)

  p5.stroke(255)
  p5.fill(255)

  if (typeText) {
    cursor.moveTo(particles[letterIndex].getX(), particles[letterIndex].getY())
    cursor.draw()
  }

  if (startAnimation) {
    for (let i = 0; i <= letterIndex; i++) {
      particles[i].draw()
    }

    if (p5.millis() > ellipseSec + textInterval && typeText) {
      letterIndex++
      textInterval = p5.random(50, 150)

      if (letterIndex >= particles.length) {
        letterIndex = (particles.length - 1)
        typeText = false
      }
      ellipseSec = p5.millis()
    }
  }

  if (p5.millis() > ellipseSec + textInterval && startAnimation === false) {
    startAnimation = true
  }
}

const TitleP5 = () => {
  const [startP5, setStartP5] = useState(false)

  useEffect(() => {
    console.log('start')
    setTimeout(() => {
      rest()
      setStartP5(true)
    }, 1500)

  }, [])

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
        />
      }
    </div>
  )
}

export default TitleP5