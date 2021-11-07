import { useEffect, useRef } from 'react'
import { useMediaQuery } from 'react-responsive'
import lottie from 'lottie-web'
import { gsap } from 'gsap'
import animationData from './magmaJellyFish.json'
import styles from './MagmaJellyFish.module.scss'

const MagmaJellyFish = ({ className, time, mobile }) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 500px)' })

  const jellyFish = useRef({})
  const jellyFishRef = useRef(null)

  useEffect(() => {
    time
      ? gsap.to(jellyFishRef.current, { rotate: 360, duration: 60 })
      : gsap.to(jellyFishRef.current, { rotate: -360, duration: 60 })
    jellyFish.current =
      (mobile || isDesktop) &&
      lottie.loadAnimation({
        container: jellyFishRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData,
      })
  }, [])

  return <div ref={jellyFishRef} className={styles.meduza + ' ' + className} />
}

export default MagmaJellyFish
