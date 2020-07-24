
/**
 * 
 * new Animation({object,property,start,end,duration,delay,timingFunction})
 * animation.start()
 * animation.stop()
 * animation.pause()
 * animation.resume()
 * let timeline = new Timeline
 * timeline.add(animation)
 * timeline.add(animation2)
 * timeline.start()
 * timeline.stop()
 * timeline.pause()
 * timeline.resume()
 * setTimeout
 * setInterval()
 * requestAnimationFrame
 * 
 */
export { cubicBezier } from './animation'

class CubicFactory {
    constructor(type) {
        this.cubicBeziercubicBezierPrototype = {
            ease: [.25, .1, .25, 1]
        }
        this.type = type
    }
    get cubicBezier() {
        return cubicBezier(...this.cubicBeziercubicBezierPrototype[type])
    }
}
export class Timeline {
    constructor() {
        this.state = 'inited'
        this.requestID = null
        this.pauseTime = null
        this.animations = []
    }
    tick() {
        let t = Date.now() - this.startTime
        let activeAnimations = this.animations.filter(animation => !animation.finished)
        for (let animation of activeAnimations) {
            let { object, property, template, valueFromprogression, duration, delay, timingFunction, addTime } = animation

            let progression = timingFunction((t - delay - addTime) / duration);
            if (t > duration + delay) {
                animation.finished = true
                progression = 1
            }
            let value = animation.valueFromprogression(progression)
            object[property] = template(value)
        }
        if (activeAnimations.length) { this.requestID = requestAnimationFrame(() => this.tick()) }


    }
    start() {
        if (this.state != 'inited')
            return
        this.state = "playing"
        this.startTime = Date.now()
        this.tick()
    }
    pause() {
        if (this.state != 'playing')
            return
        this.state = "paused"
        this.pauseTime = Date.now()
        if (this.requestID !== null)
            cancelAnimationFrame(this.requestID)
    }
    resume() {
        if (this.state != 'paused')
            return
        this.state = "playing"
        this.startTime += Date.now() - this.pauseTime
        this.tick()
    }

    restart() {
        if (this.state == "playing") {
            this.pause();
        }
        for (let animation of this.animations) {
            animation.finished = false
            animation.addTime = 0
        }
        // = []
        this.requestID = null
        this.pauseTime = null
        this.state = "playing"
        this.startTime = Date.now()
        this.tick()
    }
    add(animation, addTime) {
        animation.finished = false
        if (this.state == "playing") {
            animation.addTime = addTime !== void 0 ? addTime : Date.now() - this.startTime
        } else {
            animation.addTime = addTime !== void 0 ? addTime : 0
        }
        this.animations.push(animation)

    }
}
export class Animation {
    constructor(object, property, template, start, end, duration, delay, timingFunction) {
        this.object = object;
        this.template = template || ((v) => `rgba(${v.r},${v.g},${v.b},${v.a})`);
        this.property = property;
        this.start = start || 0;
        this.end = end;
        this.duration = duration;
        this.delay = delay || 0;
        this.timingFunction = timingFunction;

    }
    valueFromprogression(progression) {

        return this.start + progression * (this.end - this.start)
    }
}
function error(m) {
    throw {
        // name: 'SyntaxError',
        message: m,
        // at: this.at,
        // text: this.text
    }
}
export class SigleAnimation {
    constructor(el, animate = { x: 0, y: 0 }, transition = { duration: 0, delay: 0, ease: 'ease' }) {
        if (!el) {
            error('Expected  arguments：el, but got none')
        }
        Object.assign(this,{el},{animate},{transition})

    }
}
const sigleA = new SigleAnimation(1, { x:1, y:2 })
console.log(sigleA)
export class ColorAnimation {
    constructor(object, property, start, end, duration, delay, timingFunction, template,) {
        this.object = object;
        this.template = template || ((v) => `rgba(${v.r},${v.g},${v.b},${v.a})`);
        this.property = property;
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.delay = delay || 0;
        this.timingFunction = timingFunction;

    }
    valueFromprogression(progression) {
        return {
            r: this.start.r + progression * (this.end.r - this.start.r),
            g: this.start.g + progression * (this.end.g - this.start.g),
            b: this.start.b + progression * (this.end.b - this.start.b),
            a: this.start.a + progression * (this.end.a - this.start.a),
        }
        //   return  this.start + progression * (this.end - this.start)
    }
}

// export default {
//     Timeline
//     , Animation
// }