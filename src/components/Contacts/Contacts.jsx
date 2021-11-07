import Header from '../Header'
import { withTranslation } from '../../../i18n'
import styles from './Contacts.module.scss'
import { UITitle } from '../Shared/UITItle/UITitle'
import Socials from '../Shared/Socials'
import MagmaImage from '../Shared/MagmaImage'
import Noise from '../Shared/Noise'
import MagmaJellyFish from '../Shared/MagmaJellyFish'

const Contacts = ({ t, contacts, mainInfoStore, uiStore }) => {
  const { facebook, instagram } = mainInfoStore.generalInfo
  const { ownerPhoto, creativePhoto, email, phone1, phone2 } = contacts

  return (
    <div className={styles.bg}>
      <MagmaJellyFish className={styles.meduzaTop} />
      <MagmaJellyFish className={styles.meduzaTopRight} />

      <Noise noise={mainInfoStore.generalInfo.noise.mediaItemUrl} />
      <div className={styles.soffit1} />
      <div className={styles.soffit2} />
      <div className={styles.soffit3} />
      <Header white absolute uiStore={uiStore} />
      <h2 className={styles.title}>{contacts.title}</h2>
      <section className={styles.infoSection}>
        <div className={styles.ownersWrap}>
          <UITitle className={styles.ownersTitle}>{t('yourMagma')}</UITitle>
          <div className={styles.owners}>
            <div className={styles.owner}>
              <MagmaImage className={styles.ownerImg} image={ownerPhoto} />
              <p className={styles.name}>{t('owner')}</p>
              <p className={styles.position}>Owner/CEO</p>
            </div>
            <div className={styles.creative}>
              <MagmaImage className={styles.ownerImg} image={creativePhoto} />
              <p className={styles.name}>{t('creative')}</p>
              <p className={styles.position}>Creative Executive</p>
            </div>
          </div>
        </div>

        <div className={styles.info}>
          <UITitle className={styles.ownersTitle}>email</UITitle>
          <a
            rel="noreferrer"
            target="_blank"
            href={`mailTo:${email}`}
            className={styles.email}
          >
            {email}
          </a>
          <UITitle className={styles.ownersTitle}>
            telegram viber whatsup
          </UITitle>
          <a href={`tel: ${phone1}`} className={styles.phone1}>
            {phone1}
          </a>
          <a href={`tel: ${phone2}`} className={styles.phone2}>
            {phone2}
          </a>
          <div className={styles.socialsWrap}>
            <UITitle className={styles.ownersTitle + ' ' + styles.socials}>
              {t('socials')}
            </UITitle>
            <div>
              <Socials href={facebook}>fb</Socials>
              <Socials href={instagram}>ig</Socials>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default withTranslation('common')(Contacts)
