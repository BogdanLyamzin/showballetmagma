import styles from './ImageCaption.module.scss'

const ImageCaption = ({ children }) => {
  return <p className={styles.caption}>{children}</p>
}
export default ImageCaption
