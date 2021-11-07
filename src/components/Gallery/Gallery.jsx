import { withTranslation, Link } from '../../../i18n'
import { UITitle } from '../Shared/UITItle/UITitle'
import Header from '../Header'
import UIMainInfo from '../Shared/UIMainInfo'
import UIDescription from '../Shared/UIDescription'
import Masonry from 'react-masonry-css'
import styles from './Gallery.module.scss'
import MagmaImage from '../Shared/MagmaImage'
import { validateMultilingualUrl } from '../../utils/link'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { addToRefs } from '../../utils/addToRefs'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { imagesAnim } from '../../utils/animation'
import classNames from 'classnames/bind'
import MagmaJellyFish from '../Shared/MagmaJellyFish'

let cx = classNames.bind(styles)

gsap.registerPlugin(ScrollTrigger)

const Gallery = ({ t, galleriesStore, currentItem, uiStore }) => {
  const infoRef = useRef(null)
  const menuRef = useRef(null)
  const fadeIn = useRef(gsap.timeline())
  const arrRefs = useRef([])
  const [open, setOpen] = useState(false)

  const className = cx({
    arrow: true,
    rotate: open,
  })
  const link = cx({
    link: true,
    colored: true,
  })

  const showMenu = (e) => {
    e.preventDefault()
    setOpen(!open)
    document.addEventListener('click', closeMenu)
  }

  const closeMenu = (e) => {
    if (!menuRef.current.contains(e.target)) {
      setOpen(false)
      document.removeEventListener('click', closeMenu)
    }
  }

  const images = currentItem?.gallery?.map((image) => (
    <MagmaImage
      className={styles.image}
      ref={(ref) => addToRefs(ref, arrRefs.current)}
      key={image.id}
      image={image}
    />
  ))

  useEffect(() => {
    if (infoRef.current) {
      fadeIn.current.fromTo(
        infoRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 1 },
      )
    }
    return () => {
      fadeIn.current.kill()
    }
  }, [])

  useEffect(() => {
    imagesAnim(arrRefs.current)
  }, [currentItem])

  return (
    <div className={styles.bg}>
      <Header absolute uiStore={uiStore} />
      <section className={styles.info + ' gradient'}>
        <MagmaJellyFish className={styles.meduzaTopLeft} />
        <UITitle className={styles.linksTitle}>{t('galleryTitle')}</UITitle>
        <div className={styles.infoWrap}>
          <div className={styles.select}>
            <div className={styles.selectPicker}>
              <button
                ref={menuRef}
                onClick={showMenu}
                className={link + ' btn'}
              >
                {currentItem?.title}
              </button>
              <svg
                className={className}
                width="8"
                height="5"
                viewBox="0 0 8 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.64645 4.35355C3.84171 4.54882 4.15829 4.54882 4.35355 4.35355L7.53553 1.17157C7.7308 0.976311 7.7308 0.659728 7.53553 0.464466C7.34027 0.269204 7.02369 0.269204 6.82843 0.464466L4 3.29289L1.17157 0.464466C0.976311 0.269204 0.659728 0.269204 0.464466 0.464466C0.269204 0.659728 0.269204 0.976311 0.464466 1.17157L3.64645 4.35355ZM3.5 3L3.5 4L4.5 4L4.5 3L3.5 3Z"
                  fill="#999999"
                />
              </svg>
            </div>

            <div className={styles.menu}>
              {open &&
                galleriesStore?.items
                  .filter((item) => item !== currentItem)
                  .map((item) => (
                    <Link
                      href={
                        '/gallery/' +
                        validateMultilingualUrl(uiStore.language, item.slug)
                      }
                      key={item.slug}
                    >
                      <a className={styles.link}>{item.title}</a>
                    </Link>
                  ))}
            </div>
          </div>

          <div className={styles.linksCont}>
            <ul className={styles.linksWrap}>
              {galleriesStore?.items.map((item) => {
                return (
                  <li key={item?.slug} className={styles.linkWrap}>
                    <Link
                      href={
                        '/gallery/' +
                        validateMultilingualUrl(uiStore.language, item.slug)
                      }
                    >
                      <a
                        onClick={() => {
                          fadeIn.current.play(0)
                        }}
                        className={
                          styles.link +
                          ' ' +
                          (item?.slug === currentItem?.slug
                            ? styles.active
                            : '')
                        }
                      >
                        {item.title}
                      </a>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          <div ref={infoRef} className={styles.galleryInfo}>
            <h2 className={styles.galleryTitle}>{currentItem?.title}</h2>
            <UIMainInfo className={styles.mainInfo}>
              {currentItem?.mainInfo}
            </UIMainInfo>
            <UIDescription className={styles.additionalInfo}>
              {currentItem?.additionalInfo}
            </UIDescription>
          </div>
        </div>
        <MagmaJellyFish className={styles.meduzaTop} />

      </section>
      <section className={styles.imagesSection}>
        <div className={styles.magma}>magma</div>

        <MagmaJellyFish className={styles.meduzaBotLeft} />

        <div className={styles.imagesWrap}>
          <Masonry
            breakpointCols={2}
            className={styles.grid}
            columnClassName={styles.columns}
          >
            {images}
          </Masonry>
        </div>
      </section>
    </div>
  )
}

export default withTranslation('common')(Gallery)
