import { i18n } from '../../../i18n'
import styles from './LanguageSwitcher.module.scss'
import { inject, observer } from 'mobx-react'
import classNames from 'classnames/bind'
import { gsap } from 'gsap'

let cx = classNames.bind(styles)

const LanguageSwitcher = ({ uiStore, white }) => {
  const className = cx({
    btn: true,
    black: true,
    white: uiStore.menuOpen || white,
  })

  const btnsWrapClassName = cx({
    btnWrapBg: uiStore.menuOpen,
    btnsWrap: true,
  })

  const handleClick = () => {
    const otherLang =
      i18n.language === 'ua' || i18n.language === 'ru' ? 'en' : 'ua'
    i18n.changeLanguage(otherLang).then(() => {
      uiStore.changeLanguage(i18n.language)
    })
    gsap.set(document.getElementsByClassName('hide')[0], { display: 'none' })
  }
  const handleClickRu = () => {
    const otherLang = i18n.language === 'ru' ? 'ua' : 'ru'
    i18n.changeLanguage(otherLang).then(() => {
      uiStore.changeLanguage(otherLang)
    })
    gsap.set(document.getElementsByClassName('hide')[0], { display: 'none' })
  }

  return (
    <div className={styles.switcherWrap}>
      <button
        className={className + ' btn'}
        onClick={() =>
          gsap.set(document.getElementsByClassName('hide')[0], {
            display: 'flex',
          })
        }
      >
        {uiStore.language}
      </button>
      <div className={btnsWrapClassName + ' hide'}>
        <button className={className + ' btn'} onClick={handleClick}>
          {(uiStore.language === 'ua' && 'en') ||
            (uiStore.language === 'ru' && 'en') ||
            (uiStore.language === 'en' && 'ua')}
        </button>
        <button className={className + ' btn'} onClick={handleClickRu}>
          {(uiStore.language === 'ua' && 'ru') ||
            (uiStore.language === 'ru' && 'ua') ||
            (uiStore.language === 'en' && 'ru')}
        </button>
      </div>
    </div>
  )
}

export default inject('uiStore')(observer(LanguageSwitcher))
