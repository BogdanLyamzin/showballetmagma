import styles from './UIMainInfo.module.scss'

const UIMainInfo = ({ children, className }) => {
  return <h2 className={styles.title + ' ' + className}>{children}</h2>
}

export default UIMainInfo
