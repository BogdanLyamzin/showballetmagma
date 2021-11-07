import Image from 'next/image'
import { UITitle } from '../UITItle/UITitle'
import { cloneDeep } from 'lodash'
import { withTranslation, Link } from '../../../../i18n'
import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'
import styles from './Services.module.scss'
import { validateMultilingualUrl } from '../../../utils/link'
import { addToRefs } from '../../../utils/addToRefs'
import { useMediaQuery } from 'react-responsive'

const Services = ({ t, content, services, uiStore }) => {
  const defaultImages = content.mainImages
  const [mainImages, setMainImages] = useState(defaultImages)
  const arrRefs = useRef([])
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' })
  let timer

  const handleLeave = () => {
    gsap.to(arrRefs.current, {
      yPercent: 0,
    })
    arrRefs.current.forEach((image) =>
      gsap.to(image.childNodes[0].childNodes[1], {
        autoAlpha: 1,
        duration: 0.3,
        ease: 'power1.easeInOut',
      }),
    )
    handleFade(defaultImages)
  }

  const handleOver = (images) => {
    {
      gsap.to(arrRefs.current, {
        yPercent: 12,
      })
      arrRefs.current.forEach((image) =>
        gsap.to(image.childNodes[0].childNodes[1], {
          autoAlpha: 0,
          duration: 0.3,
          ease: 'power1.easeInOut',
        }),
      )
    }
    handleFade(images)
  }

  const handleFade = (images) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      setMainImages(images)
    }, 300)
  }

  useEffect(() => {
    isMobile &&
      arrRefs.current.forEach((image) => {
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
          yPercent: -15,
          duration: 1,
          ease: 'power1.easeInOut',
        })
      })
  }, [])

  return (
    <>
      <div className={styles.servicesImagesCont}>
        {mainImages?.map(({ mediaItemUrl, altText, mediaDetails, id }) => (
          <div
            key={id}
            ref={(div) => addToRefs(div, arrRefs.current)}
            className={styles.serviceImages}
          >
            <Image
              src={mediaItemUrl}
              alt={altText}
              layout="responsive"
              width={mediaDetails.width}
              height={mediaDetails.height}
            />
          </div>
        ))}
      </div>
      <div className={styles.services}>
        <UITitle className={styles.linksTitle}>
          {t('servicesMenuTitle')}
        </UITitle>
        <ul>
          {services.map((item) => {
            const images = cloneDeep(item.mainImages)
            return (
              <li key={item.id}>
                <Link
                  href={
                    '/service/' +
                    validateMultilingualUrl(uiStore.language, item.slug)
                  }
                >
                  <a
                    className={styles.serviceLink}
                    onMouseOver={() => handleOver(images)}
                    onMouseLeave={handleLeave}
                  >
                    {item.title}
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default withTranslation('common')(Services)
