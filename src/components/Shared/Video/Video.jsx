import styles from './Video.module.scss'
import { useEffect, useRef } from 'react'

const Video = ({ video, videoWebm, poster }) => {
  const videoRef = useRef(null)
  const playVideo = () => {
    // videoRef?.current?.setAttribute('controls', 'controls')
    videoRef?.current?.play()
  }
  // const handleProgress = (e) => {
  //   let range = 0
  //   const bf = e.target.buffered
  //   const time = e.target.currentTime
  //
  //   while (!(bf.start(range) <= time && time <= bf.end(range))) {
  //     range += 1
  //   }
  //   const loadStartPercentage = bf.start(range) / e.target.duration
  //   const loadEndPercentage = bf.end(range) / e.target.duration
  //   const loadPercentage = loadEndPercentage - loadStartPercentage
  //   if (loadPercentage > 0.5) playVideo()
  //
  //   console.log(loadPercentage)
  // }
  //
  // const handlePlay = () => {
  //   console.log('play')
  //   playVideo()
  // }


  useEffect(() => {
    // let sourceObject = HTMLMediaElement.srcObject
    // HTMLMediaElement.srcObject = sourceObject
    // console.log( typeof window !== 'undefined' && HTMLMediaElement.srcObject)

    // videoRef.current.srcObject = new MediaSource()
    const isMobile = {
      Android: function () {
        return navigator.userAgent.match(/Android/i)
      },
      BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i)
      },
      iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i)
      },
      Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i)
      },
      Windows: function () {
        return navigator.userAgent.match(/IEMobile/i)
      },
      any: function () {
        return (
          isMobile.Android() ||
          isMobile.BlackBerry() ||
          isMobile.iOS() ||
          isMobile.Opera() ||
          isMobile.Windows()
        )
      },
    }

    if (isMobile.any()) {
      playVideo()
    }
  }, [])

  return (
    // <iframe
    //   className={styles.video}
    //   src="https://player.vimeo.com/video/530398560?badge=0&amp;autoplay=1&amp;loop=1&amp;autopause=0&amp;muted=1&amp;player_id=0&amp;app_id=58479"
    //   width="1920"
    //   height="1080"
    //   frameBorder="0"
    //   allow="autoplay; fullscreen; picture-in-picture"
    //   allowFullScreen
    //   title="web_original.mp4"
    //   data-ready={true}
    // />

    <video
      ref={videoRef}
      className={styles.video}
      poster={poster}
      muted
      autoPlay
      loop
      playsInline
      // onCanPlayThrough={handlePlay}
    >
      <source src={videoWebm} type="video/webm" />
      <source src={video} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

export default Video
