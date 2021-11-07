import styles from './Button.module.scss'

const Button = ({ type, children, disabled }) => {
  return (
    <button type={type} className={styles.btn} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
