import styles from './AboutUs.module.scss'
import { withTranslation, Link } from '../../../i18n'
import Header from '../Header'
import { UITitle } from '../Shared/UITItle/UITitle'
import Partners from '../Partners'
import Services from '../Shared/Services'
import UIMainInfo from '../Shared/UIMainInfo'
import UIDescription from '../Shared/UIDescription'
import Button from '../Shared/Button'
import Ticker from '../Shared/Ticker'
import MagmaImage from '../Shared/MagmaImage'
import { addToRefs } from '../../utils/addToRefs'
import { useEffect, useRef } from 'react'
import { imagesAnim } from '../../utils/animation'
import { useMediaQuery } from 'react-responsive'
import Noise from '../Shared/Noise'
import MagmaJellyFish from '../Shared/MagmaJellyFish'

const AboutUs = ({
  t,
  content,
  mainInfoStore,
  serviceImages,
  servicesStore,
  uiStore,
}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' })

  const services = servicesStore.items
  const arrRefs = useRef([])

  useEffect(() => {
    isMobile && imagesAnim(arrRefs.current)
  }, [])

  return (
    <>
      <Header absolute white uiStore={uiStore} />
      <div className={styles.overflow}>
        <div className={styles.bg}>
          <MagmaJellyFish className={styles.meduzaTop} />
          <Noise noise={mainInfoStore.generalInfo.noise.mediaItemUrl} />
          <div className={styles.soffit1} />
          <div className={styles.soffit2} />
          <div className={styles.soffit3} />
          <UITitle className={styles.subTitleTop}>{t('aboutTitle')}</UITitle>
          <h2 className={styles.title}>{content.title}</h2>
          <h3 className={styles.subTitle}>{content.subTitle}</h3>
        </div>
        <div className={styles.infoBg}>
          <MagmaJellyFish className={styles.meduzaTopRight} />

          <section className={styles.info}>
            <div className={styles.mainInfoText}>
              <UIMainInfo className={styles.mainInfo}>
                {content.mainInfo}
              </UIMainInfo>
              <UIDescription className={styles.additionalInfo}>
                {content.additionalInfo}
              </UIDescription>
            </div>
            <MagmaImage
              ref={(ref) => addToRefs(ref, arrRefs.current)}
              image={content.topImage}
              className={styles.mainInfoImage}
            />
            <div className={styles.description}>
              <MagmaImage
                className={styles.midImage}
                ref={(ref) => addToRefs(ref, arrRefs.current)}
                image={content.midImage}
              />
              <div className={styles.descriptionText}>
                <UIMainInfo className={styles.mainInfo}>
                  {content.mainDescription}
                </UIMainInfo>
                <UIDescription className={styles.additionalInfo}>
                  {content.description}
                </UIDescription>
              </div>
            </div>
            <div className={styles.conclusion + ' gradient'}>
              <div className={styles.conclusionImages}>
                <MagmaImage
                  ref={(ref) => addToRefs(ref, arrRefs.current)}
                  className={styles.conclusionImageLeft}
                  image={content.mainConclusionImage}
                />
                <MagmaImage
                  ref={(ref) => addToRefs(ref, arrRefs.current)}
                  className={styles.conclusionImageRight}
                  image={content.conclusionImage}
                />
              </div>

              <div className={styles.conclusionText}>
                <MagmaJellyFish className={styles.meduzaConclusion} />

                <UIMainInfo className={styles.conclusionInfo}>
                  {content.mainConclusion}
                </UIMainInfo>
                <UIDescription className={styles.conclusionDescription}>
                  {content.conclusion}
                </UIDescription>
              </div>
              <div className={styles.btnWrap}>
                <Link href={`/gallery/brazilian-carnival`}>
                  <a>
                    <Button>{t('galleryTitle')}</Button>
                  </a>
                </Link>
              </div>
              <div className={styles.tickerWrap}>
                <Ticker
                  servicesStore={servicesStore}
                  className={styles.ticker}
                />
              </div>
            </div>
          </section>
          <section className={styles.importantEvents}>
            <h2 className={styles.eventsTitle}>{t('importantEvents')}</h2>
            <div className={styles.eventsCont}>
              <div className={styles.leftEvent}>
                <MagmaImage
                  image={content.riyadhevent.logo}
                  className={styles.logo}
                />
                <div>
                  <p className={styles.eventInfo}>
                    {content.riyadhevent.maininfo}
                  </p>
                  <p className={styles.eventDescription}>
                    {content.riyadhevent.description}
                  </p>
                </div>

                <div className={styles.eventNumbers}>
                  <div>
                    <p className={styles.eventNumber}>1500</p>
                    <p className={styles.eventNumberCaption}>
                      {t('performers')}
                    </p>
                  </div>
                  <div>
                    <p className={styles.eventNumber}>25</p>
                    <p className={styles.eventNumberCaption}>{t('floats')}</p>
                  </div>
                </div>
              </div>
              <div className={styles.rightEvent}>
                <MagmaImage
                  image={content.slevent.logo}
                  className={styles.logo}
                />
                <div>
                  <p className={styles.eventInfo}>{content.slevent.maininfo}</p>
                  <p className={styles.eventDescription}>
                    {content.slevent.description}
                  </p>
                </div>
                <div className={styles.eventNumbers}>
                  <div>
                    <p className={styles.eventNumber}>1mln</p>
                    <p className={styles.eventNumberCaption}>
                      {t('prizePool')}
                    </p>
                  </div>
                  <div>
                    <p className={styles.eventNumber}>24</p>
                    <p className={styles.eventNumberCaption}>
                      {t('cybersportTeams')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.eventsImages}>
              {content.eventsimages.map((image) => (
                <MagmaImage
                  ref={(ref) => addToRefs(ref, arrRefs.current)}
                  key={image.id}
                  image={image}
                  className={styles.eventImage}
                />
              ))}
            </div>
          </section>

          <Partners partners={mainInfoStore.generalInfo.partners} />
          <section className={styles.servicesSection}>
            <MagmaJellyFish className={styles.meduzaServices} />
            <Services
              content={serviceImages}
              services={services}
              uiStore={uiStore}
            />
          </section>
          <section className={styles.actionSection}>
            <MagmaJellyFish className={styles.meduzaAction} />

            <h2 className={styles.actionQuestion}>{t('actionQuestion')}</h2>
            <p className={styles.actionInfo}>{t('actionInfo')}</p>
            <a
              href={content?.formUrl}
              onClick={(e) => !content.formUrl && e.preventDefault()}
            >
              <Button>{t('actionBtn')}</Button>
            </a>
          </section>
        </div>
      </div>
    </>
  )
}

export default withTranslation('common')(AboutUs)
