import styles from './UIDescription.module.scss'

const UIDescription = ({ children, className }) => {
  return <h3 className={styles.title + ' ' + className}>{children}</h3>
}
export default UIDescription
