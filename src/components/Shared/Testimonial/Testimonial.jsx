import { UITitle } from '../UITItle/UITitle'
import { withTranslation } from '../../../../i18n'
import { gsap } from 'gsap'
import UIMainInfo from '../UIMainInfo'
import { useEffect, useRef, useState } from 'react'
import styles from './Testimonial.module.scss'

const Testimonial = ({ t, testimonialsStore }) => {
  const [index, setIndex] = useState(0)
  const testRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      testRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 1 },
    )
  }, [index])
  return (
    <div className={styles.container}>
      <UITitle className={styles.title}>{t('testimonialTitle')}</UITitle>
      <div ref={testRef} className={styles.testimonial}>
        <UIMainInfo className={styles.text}>
          {testimonialsStore.items[index].text}
        </UIMainInfo>
        <UITitle className={styles.author}>
          {testimonialsStore.items[index].author}
        </UITitle>
      </div>

      <div className={styles.lineCont}>
        {testimonialsStore.items.map(({ id }, i) => {
          return (
            <div
              key={id}
              className={styles.lineWrap}
              onClick={() => setIndex(i)}
            >
              <div
                style={{ backgroundColor: i === index && '#9b4592' }}
                className={styles.line}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default withTranslation('common')(Testimonial)
