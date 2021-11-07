import { withTranslation } from '../../../i18n'
import { UITitle } from '../Shared/UITItle/UITitle'
import UIMainInfo from '../Shared/UIMainInfo'
import UIDescription from '../Shared/UIDescription'
import Masonry from 'react-masonry-css'
import Testimonial from '../Shared/Testimonial'
import Partners from '../Partners'
import styles from './Service.module.scss'
import Header from '../Header/Header'
import MagmaImage from '../Shared/MagmaImage'
import { useEffect, useRef } from 'react'
import { addToRefs } from '../../utils/addToRefs'
import { useMediaQuery } from 'react-responsive'
import { imagesAnim } from '../../utils/animation'
import MagmaJellyFish from '../Shared/MagmaJellyFish'

const Service = ({ t, service, partners, testimonialsStore, uiStore }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' })
  const arrRefs = useRef([])
  const images = service?.gallery.map((image) => (
    <MagmaImage
      className={styles.image}
      ref={(ref) => addToRefs(ref, arrRefs.current)}
      key={image.id}
      image={image}
    />
  ))

  useEffect(() => {
    imagesAnim(arrRefs.current)
  }, [service])

  return (
    <div className={styles.bg}>
      <Header absolute uiStore={uiStore} />
      <section className={styles.info}>
        <MagmaJellyFish className={styles.meduzaTop} />
        <UITitle>{t('serviceTitle')}</UITitle>
        <h2 className={styles.title}>{service?.title}</h2>
        <UIMainInfo className={styles.mainInfo}>{service?.mainInfo}</UIMainInfo>
        <UIDescription className={styles.description}>
          {service?.additionalInfo}
        </UIDescription>
      </section>
      <section>
        <div className={styles.imagesWrap}>
          <Masonry
            breakpointCols={isMobile ? 1 : 2}
            className={styles.grid}
            columnClassName={styles.columns}
          >
            {images}
          </Masonry>
          <MagmaJellyFish className={styles.meduzaGalleryTopRight} />
          <MagmaJellyFish className={styles.meduzaGalleryLeft} />
        </div>
      </section>
      <section className={styles.tesimonialSection}>
        <MagmaJellyFish className={styles.meduzaTestimonial} />
        <Testimonial testimonialsStore={testimonialsStore} />
      </section>
      <section className={styles.partnersSection}>
        <Partners partners={partners} />
      </section>
    </div>
  )
}
export default withTranslation('common')(Service)
