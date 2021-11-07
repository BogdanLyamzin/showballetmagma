import LanguageSwitcher from '../LanguageSwitcher'
import Menu from '../Menu'
import styles from './Header.module.scss'
import classNames from 'classnames/bind'
import MagmaLink from '../MagmaLink'
import { inject, observer } from 'mobx-react'


let cx = classNames.bind(styles)

const Header = ({ uiStore, white, absolute, animated, fixed, innerRef }) => {
  const header = cx({
    header: true,
    absolute: absolute,
    fixed: uiStore.menuOpen || fixed,
    animated: animated,
  })

  return (
    <header ref={innerRef} className={header}>
      <LanguageSwitcher white={white} />
      <MagmaLink white={white} />
      <Menu white={white} />
    </header>
  )
}

export default inject('uiStore')(observer(Header))
