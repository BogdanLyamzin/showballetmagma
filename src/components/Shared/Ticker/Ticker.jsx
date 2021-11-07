import { inject, observer } from 'mobx-react'
import styles from './Ticker.module.scss'

const Ticker = ({ servicesStore, className }) => {
  const services = [...servicesStore.items, ...servicesStore.items]

  return (
    <div className={styles.marqueeWrap}>
      <div className={styles.marquee}>
        {services.map((service, i) => {
          return (
            <span
              className={className + ' ' + styles.marqueeItem}
              key={service.id + i}
            >
              {service.title}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default inject('servicesStore')(observer(Ticker))
