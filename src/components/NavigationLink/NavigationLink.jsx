import React from 'react'
import { Link } from '../../../i18n'
import {
  getInternalUrl,
  isInternalUrl,
  validateMultilingualUrl,
} from '../../utils/link'

import { inject, observer } from 'mobx-react'

const NavigationLink = ({
  link,
  uiStore,
  children,
  returnUrl,
  id,
  className,
}) => {
  const { url, label } = link

  const handleClick = () => uiStore?.setMenuOpen(false)

  if (isInternalUrl(url) && uiStore) {
    let href = validateMultilingualUrl(uiStore.language, getInternalUrl(url))
    if (
      href ===
      (uiStore.language !== 'ua' ? `/${uiStore.language}/home` : '/home')
    )
      href = '/'
    if (
      href ===
      (uiStore.language !== 'ua' ? `/${uiStore.language}/gallery` : '/gallery')
    ) {
      href += '/brazilian-carnival'
    }

    if (returnUrl) {
      returnUrl(href)
      return <>{label || children}</>
    }

    return (
      <Link href={href}>
        <a className={className} role="link" id={id} onClick={handleClick}>
          {label || children}
        </a>
      </Link>
    )
  }

  return (
    <a
      className={className}
      target="_blank"
      href={url}
      rel={'noreferrer'}
      onClick={handleClick}
    >
      {label || children}
    </a>
  )
}

export default inject('uiStore')(observer(NavigationLink))
