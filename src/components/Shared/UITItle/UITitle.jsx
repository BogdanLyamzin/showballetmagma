import styles from './UITitle.module.scss'
import { forwardRef } from 'react'

export const UITitle = forwardRef(({ children, className }, ref) => {
  return (
    <p ref={ref} className={styles.title + ' ' + className}>
      {children}
    </p>
  )
})

UITitle.displayName = 'UITitle'
