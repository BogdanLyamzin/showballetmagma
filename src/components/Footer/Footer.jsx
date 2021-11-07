import { Link, withTranslation } from '../../../i18n'
import styles from './Footer.module.scss'
import { inject, observer } from 'mobx-react'
import Socials from '../Shared/Socials'

const Footer = ({ t, mainInfoStore }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.socials}>
        {mainInfoStore.generalInfo && (
          <>
            <Socials href={mainInfoStore.generalInfo.facebook}>fb</Socials>
            <Socials href={mainInfoStore.generalInfo.instagram}>ig</Socials>
          </>
        )}
      </div>
      <Link href={'/'}>
        <a className={styles.link + ' link'}>Magma show</a>
      </Link>
      <span className={styles.rights}>&copy; {t('rights')}</span>
    </footer>
  )
}

export default withTranslation('common')(
  inject('mainInfoStore')(observer(Footer)),
)
