import { gsap } from 'gsap'

export const fadeIn = (el) => {
  if (el && typeof window !== 'undefined') {
    gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 })
  }
}

export const imagesAnim = (arr) => {
  arr.forEach((image) => {
    gsap.set(image.childNodes[0].childNodes[1], { scale: 1.5 })
    gsap.to(image.childNodes[0].childNodes[1], {
      scrollTrigger: image,
      scale: 1,
      autoAlpha: 1,
      duration: 1,
      ease: 'power1.easeInOut',
    })

    gsap.to(image, {
      scrollTrigger: image,
      y: '-8vw',
      duration: 1,
      ease: 'power1.easeInOut',
    })
  })
}
