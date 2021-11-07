import { useEffect, useRef } from 'react'
import { Link, withTranslation } from '../../../i18n'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMediaQuery } from 'react-responsive'

import Video from '../Shared/Video'
import { UITitle } from '../Shared/UITItle/UITitle'
import Socials from '../Shared/Socials'
import UIMainInfo from '../Shared/UIMainInfo'
import UIDescription from '../Shared/UIDescription'
import Testimonial from '../Shared/Testimonial'
import Partners from '../Partners'
import ImageCaption from '../Shared/ImageCaption'
import Ticker from '../Shared/Ticker'
import Header from '../Header/Header'
import styles from './HomePage.module.scss'
import Services from '../Shared/Services'
import MagmaImage from '../Shared/MagmaImage'
import { validateMultilingualUrl } from '../../utils/link'
import { addToRefs } from '../../utils/addToRefs'
import Noise from '../Shared/Noise'
import { imagesAnim } from '../../utils/animation'
import MagmaJellyFish from '../Shared/MagmaJellyFish'
import CountUp from 'react-countup'

gsap.registerPlugin(ScrollTrigger)

const HomePage = ({
  uiStore,
  mainInfoStore,
  testimonialsStore,
  services,
  pages,
  t,
}) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 500px)' })
  const galleryRef = useRef(null)
  const galleryWrapRef = useRef(null)
  const videoWrapRef = useRef(null)
  const videoMaskRef = useRef(null)
  const videoSectionRef = useRef(null)
  const titleRef = useRef(null)
  const infoRef = useRef(null)
  const headerRef = useRef(null)
  const scrollRef = useRef(null)
  const socialsRef = useRef(null)
  const subTitleRef = useRef(null)
  const mainTitleRef = useRef(null)
  const meduzaTopRef = useRef(null)
  const meduzaTopRightRef = useRef(null)
  const counterWrapRef = useRef(null)
  const arrRefs = useRef([])
  const mainAnim = useRef(gsap.timeline({ paused: true }))
  const jellyFishAnim = useRef(gsap.timeline({ paused: true }))
  const content = pages.get('home').homePage
  let tm

  useEffect(() => {
    jellyFishAnim.current.add(
      gsap.to(meduzaTopRef.current, {
        rotate: 30,
        x: '-45vw',
        y: '-17vw',
        width: '52vw',
        opacity: 0.5,
        duration: 1.3,
      }),
      0,
    )
    jellyFishAnim.current.add(
      gsap.to(meduzaTopRightRef.current, {
        rotate: -30,
        x: '36vw',
        y: '10vw',
        width: '52vw',
        opacity: 0.5,
        duration: 1.3,
      }),
      0,
    )
    mainAnim.current.add(gsap.to(headerRef.current, { y: 0, duration: 0.7 }), 0)
    mainAnim.current.add(
      gsap.to(subTitleRef.current, {
        y: 0,
        duration: 0.3,
      }),
      0.7,
    )
    mainAnim.current.add(
      gsap.to(mainTitleRef.current, {
        y: 0,
        duration: 0.5,
      }),
      0.5,
    )
    mainAnim.current.add(
      gsap.to(socialsRef.current, { y: 0, duration: 0.7 }),
      0,
    )
    mainAnim.current.add(gsap.to(scrollRef.current, { y: 0, duration: 0.7 }), 0)
    mainAnim.current.add(
      gsap.to(videoWrapRef.current, { y: 0, duration: 1 }),
      0.3,
    )
    mainAnim.current.add(
      gsap.to(videoMaskRef.current, { y: 0, duration: 1 }),
      0.3,
    )
    mainAnim.current.add(
      gsap.to(videoWrapRef.current, {
        width: '100vw',
        height: '100vh',
        ease: 'power1.easeInOut',
        duration: 1,
      }),
      1.2,
    )
    mainAnim.current.add(
      gsap.to(videoMaskRef.current, {
        width: '100vw',
        height: '100vh',
        margin: 0,
        ease: 'power1.easeInOut',
        duration: 1,
      }),
      1.2,
    )
    mainAnim.current.add(
      gsap.to(titleRef.current, {
        fill: 'transparent',
        duration: 1,
      }),
      1.7,
    )

    const horizontalST = gsap.to(galleryRef.current, {
      xPercent: -54,
      scrollTrigger: {
        start: 'top top',
        trigger: galleryWrapRef.current,
        pin: true,
        scrub: true,
        end: () => `+=${galleryRef.current.offsetWidth}`,
      },
    })
    uiStore.isVideoLoaded && jellyFishAnim.current.play(100)
    uiStore.isVideoLoaded &&
      !isDesktop &&
      gsap.set([meduzaTopRef.current, meduzaTopRightRef.current], {
        autoAlpha: 0,
      })
    tm = !uiStore.isVideoLoaded
      ? setTimeout(() => mainAnim.current.play(0), 3000)
      : mainAnim.current.play(0)
    imagesAnim(arrRefs.current)

    return () => {
      clearTimeout(tm)
      horizontalST.scrollTrigger.kill()
    }
  }, [])

  return (
    <>
      {/*Head*/}

      <Header white absolute animated innerRef={headerRef} uiStore={uiStore} />
      <div className={styles.bg}>
        <section ref={videoSectionRef} className={styles.videoSection}>
          {!uiStore.isVideoLoaded && (
            <CountUp
              duration={3}
              start={0}
              end={100}
              delay={0}
              suffix=" %"
              onEnd={() => {
                isDesktop
                  ? jellyFishAnim.current.play(0)
                  : gsap.to([meduzaTopRef.current, meduzaTopRightRef.current], {
                      autoAlpha: 0,
                    })

                gsap.to(counterWrapRef.current, { autoAlpha: 0 })
                uiStore.setIsVideoLoaded(true)
              }}
            >
              {({ countUpRef }) => (
                <div ref={counterWrapRef}>
                  <span className={styles.counter} ref={countUpRef} />
                </div>
              )}
            </CountUp>
          )}
          <div className={styles.meduzaTopWrap} ref={meduzaTopRef}>
            <MagmaJellyFish className={styles.meduzaTop} time mobile />
          </div>
          <div className={styles.meduzaTopRightWrap} ref={meduzaTopRightRef}>
            <MagmaJellyFish className={styles.meduzaTopRight} mobile />
          </div>
          <Noise noise={mainInfoStore.generalInfo.noise.mediaItemUrl} />
          <div ref={videoMaskRef} className={styles.videoMask}>
            <div ref={videoWrapRef} className={styles.videoWrap}>
              <Video
                className={styles.video}
                videoWebm={content.videoWebm.mediaItemUrl}
                video={content.video.mediaItemUrl}
                poster={content.poster.mediaItemUrl}
              />
            </div>
          </div>
          <div className={styles.titlesWrap}>
            <div className={styles.subTitleWrap}>
              <UITitle ref={subTitleRef} className={styles.subTitle}>
                show ballet
              </UITitle>
            </div>
            <div className={styles.titleWrap}>
              <svg ref={mainTitleRef} className={styles.title}>
                <text
                  ref={titleRef}
                  className={styles.titleText}
                  textAnchor="top"
                  y="50%"
                >
                  Magma
                </text>
              </svg>
            </div>
          </div>
          <div ref={socialsRef} className={styles.socialsWrap}>
            <Socials href={mainInfoStore.generalInfo.facebook} colored>
              fb
            </Socials>
            <Socials href={mainInfoStore.generalInfo.instagram} colored>
              ig
            </Socials>
          </div>
          <span ref={scrollRef} className={styles.scroll}>
            scroll down
          </span>
        </section>

        {/*Info*/}

        <section ref={infoRef} className={styles.info}>
          <MagmaJellyFish className={styles.meduzaInfo} />
          <UITitle className={styles.infoTitle}>{t('homeTitle')}</UITitle>
          <UIMainInfo className={styles.mainInfo}>
            {content.mainInfo}
          </UIMainInfo>
          <UIDescription className={styles.addInfo}>
            {content.additionalInfo}
          </UIDescription>
        </section>

        <Ticker />

        {/*Services*/}

        <section className={styles.servicesSection}>
          <Services services={services} content={content} uiStore={uiStore} />
          <MagmaJellyFish className={styles.meduzaServices} />
        </section>

        {/*Gallery*/}

        <section>
          <div
            ref={galleryWrapRef}
            className={styles.gallerySection + ' gradient'}
          >
            <UITitle className={styles.galleryTitle}>
              {t('galleryTitle')}
            </UITitle>
            <div ref={galleryRef} className={styles.galleryWrap}>
              {content.gallery.map((image) => {
                const slug = image.altText.split(' ').join('-')
                return (
                  <div className={styles.galleryImage} key={image.id}>
                    <Link
                      href={`/gallery/${validateMultilingualUrl(
                        uiStore.language,
                        slug,
                      )}`}
                    >
                      <a className={styles.galleryLink}>
                        <MagmaImage
                          image={image}
                          className={styles.galleryImages}
                        />
                        <ImageCaption>{image.altText}</ImageCaption>
                      </a>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/*Testimonials*/}

        <section className={styles.testimonial}>
          <MagmaJellyFish className={styles.meduzaTestimonial} />
          <Testimonial testimonialsStore={testimonialsStore} />
          <div className={styles.testimonialImagesWrap}>
            {content.testimonialImages.map((image) => (
              <MagmaImage
                ref={(ref) => addToRefs(ref, arrRefs.current)}
                key={image.id}
                className={styles.testimonialImage}
                image={image}
              />
            ))}
          </div>
        </section>
        <Partners partners={mainInfoStore.generalInfo.partners} />
      </div>
    </>
  )
}

export default withTranslation('common')(HomePage)
