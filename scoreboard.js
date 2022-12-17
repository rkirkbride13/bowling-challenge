class Scoreboard {

  constructor() {
    this.scoreboard = []
    this.frame_count = 0
    this.sum = 0
  }

  addFrame(frame) {
    this.frame_array = frame.accessFrame()
    this.scoreboard.push(frame)
    this.frame_count++
  }

  frameCount() {
    return this.frame_count
  }

  calculateLastFrame() {
    const last_frame = this.scoreboard[9]
    return (this.frame_count === 10 ? last_frame.frameTotal() : 0);
  }

  calculateFramesTotal() {
    let index = 0
    let normal_frames = this.scoreboard.slice(0,9)
    normal_frames.forEach(frame => {
      let frame1 = this.scoreboard[index + 1]
      let frame2 = this.scoreboard[index + 2]
      if (frame.checkForSpare()) {
        this.sum += frame.frameTotal() + frame1.accessFrame()[0]
      } else if (frame.checkForStrike()) {
        this.sum += frame.frameTotal()
        if (frame1.checkForStrike()) {
          this.sum += (index === 8 ? frame1.accessFrame()[0] + frame1.accessFrame()[1] : frame1.accessFrame()[0] + frame2.accessFrame()[0])
        } else {
          this.sum += frame1.accessFrame()[0] + frame1.accessFrame()[1]
        }
      } else {
        this.sum += frame.frameTotal()
      }
      index++
    })
    return this.sum
  }

  total() {
    this.sum += this.calculateFramesTotal()
    this.sum += this.calculateLastFrame()
    return this.sum
  }
}

module.exports = Scoreboard;