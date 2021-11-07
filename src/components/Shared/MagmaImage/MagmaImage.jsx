import Image from 'next/image'
import { forwardRef } from 'react'
import styles from './MagmaImage.module.scss'
import classNames from 'classnames/bind'

let cx = classNames.bind(styles)

const MagmaImage = forwardRef(({ image, className }, ref) => {

  const koff = image.mediaDetails.width / image.mediaDetails.height < 1.13

  const magmaClassName = cx({
    image: true,
    wide: !koff,
    thin: koff,
  })

  return (
    <div ref={ref} className={className + ' ' + magmaClassName}>
      <Image
        width={image.mediaDetails.width}
        height={image.mediaDetails.height}
        src={image.mediaItemUrl}
        alt={image.altText}
        layout="responsive"
        quality={100}
      />
    </div>
  )
})

MagmaImage.displayName = 'MagmaImage'

export default MagmaImage
