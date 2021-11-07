import { inject, observer } from 'mobx-react'
import { withTranslation } from '../../../i18n'
import UIMainInfo from '../Shared/UIMainInfo'
import UIDescription from '../Shared/UIDescription'
import CTAForm from './CTAForm'
import styles from './CTA.module.scss'
import MagmaImage from '../Shared/MagmaImage'

const CTA = ({ mainInfoStore, t }) => {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaGradient + ' gradient'}>
        <div className={styles.ctaFormWrap}>
          <UIMainInfo className={styles.ctaInfo}>{t('ctaInfo')}</UIMainInfo>
          <UIDescription className={styles.ctaInfoAdd}>
            {t('ctaInfoAdd')}
          </UIDescription>
          <CTAForm />
        </div>
      </div>
      {mainInfoStore.generalInfo && (
        <MagmaImage
          image={mainInfoStore.generalInfo.ctaImage}
          className={styles.ctaImage}
        />
      )}
    </section>
  )
}

export default withTranslation('common')(inject('mainInfoStore')(observer(CTA)))
