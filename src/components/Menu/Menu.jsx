import { inject, observer } from 'mobx-react'
import { Link, withTranslation } from '../../../i18n'
import NavigationLink from '../NavigationLink'
import Video from '../Shared/Video'
import { UITitle } from '../Shared/UITItle/UITitle'
import Socials from '../Shared/Socials'
import classNames from 'classnames/bind'
import styles from './Menu.module.scss'
import { validateMultilingualUrl } from '../../utils/link'

let cx = classNames.bind(styles)

const Menu = ({
  t,
  navigationStore,
  servicesStore,
  pageStore,
  uiStore,
  white,
}) => {
  const { menuOpen, setMenuOpen } = uiStore
  const className = cx({
    black: true,
    white: menuOpen || white,
  })

  const menuClassName = cx({ visible: menuOpen })

  const burgerClassName = cx({
    burgerLine: true,
    closeBurger: menuOpen,
    blackBg: true,
    whiteBg: menuOpen || white,
  })

  const content = pageStore.pages.get('home').homePage

  const Burger = () => (
    <div className={styles.burger}>
      <div className={burgerClassName} />
      <div className={burgerClassName} />
      <div className={burgerClassName} />
    </div>
  )
  const MenuBtnValue = () => (
    <span className={styles.menuBtnValue}>{!menuOpen ? 'menu' : 'close'}</span>
  )

  return (
    <menu className={styles.menu}>
      <button
        className={className + ' ' + styles.openClose + ' btn'}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Burger />
        <MenuBtnValue />
      </button>

      {menuOpen && (
        <nav className={menuClassName + ' ' + styles.navbar}>
          <div className={styles.video}>
            <Video
              menuOpen={uiStore.menuOpen}
              video={content.video.mediaItemUrl}
              videoWebm={content.videoWebm.mediaItemUrl}
              poster={content.poster.mediaItemUrl}
            />
          </div>

          <div className={styles.pages}>
            <UITitle className={styles.linksTitle}>
              {t('pagesMenuTitle')}
            </UITitle>
            <ul className={styles.pageLinks}>
              {navigationStore.items.map((item) => (
                <li className={styles.pageLinkWrap} key={item.id}>
                  <NavigationLink className={styles.pageLink} link={item}>
                    {item.label}
                  </NavigationLink>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.services}>
            <UITitle className={styles.linksTitle}>
              {t('servicesMenuTitle')}
            </UITitle>

            <ul>
              {servicesStore.items.map((item) => {
                return (
                  <li className={styles.serviceLinkWrap} key={item.id}>
                    <Link
                      href={
                        '/service/' +
                        validateMultilingualUrl(uiStore.language, item.slug)
                      }
                    >
                      <a
                        onClick={() => uiStore.setMenuOpen(false)}
                        className={styles.serviceLink}
                      >
                        {item.title}
                      </a>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className={styles.socialsWrap}>
            <Socials href="https://www.facebook.com/magmashowgirls">fb</Socials>
            <Socials href="https://www.instagram.com/showballetmagma/">
              ig
            </Socials>
          </div>
        </nav>
      )}
    </menu>
  )
}

export default withTranslation('common')(
  inject(
    'navigationStore',
    'servicesStore',
    'pageStore',
    'uiStore',
  )(observer(Menu)),
)
