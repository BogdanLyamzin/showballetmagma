import { Link } from '../../../i18n'
import styles from './MagmaLink.module.scss'
import classNames from 'classnames/bind'
import { inject, observer } from 'mobx-react'

let cx = classNames.bind(styles)

const MagmaLink = ({ uiStore, white }) => {
  const className = cx({
    link: true,
    black: true,
    white: uiStore.menuOpen || white,
  })

  return (
    <Link href={'/'}>
      <a
        onClick={() => uiStore.setMenuOpen(false)}
        className={className + ' link'}
      >
        Magma show
      </a>
    </Link>
  )
}

export default inject('uiStore')(observer(MagmaLink))
