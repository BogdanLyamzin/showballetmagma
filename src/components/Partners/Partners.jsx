import styles from './Partners.module.scss'
import Image from 'next/image'
import { UITitle } from '../Shared/UITItle/UITitle'
import { withTranslation } from '../../../i18n'

const Partners = ({ t, partners }) => {
  const partnersArr = [...partners, ...partners]
  return (
    <section className={styles.partnersSection}>
      <UITitle className={styles.partnersTitle}>{t('partnersTitle')}</UITitle>
      <div className={styles.partnersCont}>
        {partnersArr.map(({ id, altText, mediaDetails, mediaItemUrl }, i) => (
          <div key={id + i} className={styles.partnerImage}>
            <Image
              width={mediaDetails.width}
              height={mediaDetails.height}
              src={mediaItemUrl}
              alt={altText}
              layout="responsive"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default withTranslation('common')(Partners)
