import classNames from 'classnames/bind'
import styles from './Socials.module.scss'

let cx = classNames.bind(styles)

const Socials = ({ colored, children, href, contacts }) => {
  const className = cx({
    base: true,
    colored: colored,
    contacts: contacts,
  })

  return (
    <a target="_blank" rel="noreferrer" className={className} href={href}>
      {children}
    </a>
  )
}
export default Socials
