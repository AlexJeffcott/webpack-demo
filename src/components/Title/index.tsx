import React, { FC } from 'react'
// @ts-ignore
import styles from './title.module.scss'

type Props = { title: string }
const Title: FC<Props> = ({ title }) => {
  return (
    <h1 data-testid="Title Component" className={styles.title}>
      {title}
    </h1>
  )
}

export default Title
