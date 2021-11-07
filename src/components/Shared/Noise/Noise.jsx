import styles from './Noise.module.scss'

const Noise = ({ noise, className }) => {
  return (
    <div
      className={className + ' ' + styles.noise}
      style={{
        background: `url(${noise}) 50%`,
      }}
    />
  )
}

export default Noise
