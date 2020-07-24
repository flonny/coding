import cubicBezier from './cubicBezier'
import { Timeline, Animation, ColorAnimation } from './animation'
let linear = t => t
let ease = cubicBezier(.25, .1, .25, 1)
let el = document.getElementById('el')
let t1 = new Timeline
t1.add(new Animation(el.style, "transform", v => `translateX(${v}px)`, 0, 200, 5000, 0, ease))
t1.start()
pause.addEventListener('click', () => {
    t1.pause()
})
resume.addEventListener('click', () => {
    t1.resume()
})
restart.addEventListener('click', () => {
    t1.restart()
})
addEl2.addEventListener('click', () => {
    t1.add(new Animation(el2.style, "transform", v => `translateX(${v}px)`, 0, 200, 5000, 0, ease))
})
addColor.addEventListener('click', () => {
    t1.add(new ColorAnimation(el2.style, "backgroundColor", { r: 0, g: 0, b: 0, a: 1 }, { r: 155, g: 0, b: 0, a: 1 }, 5000, 0, ease))
})