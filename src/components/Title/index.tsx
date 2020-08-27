import React, { FC } from 'react'
// @ts-ignore
import styles from './title.module'

const Title: FC = ({ children }) => {
  return <h1 className={styles.title}>{children}</h1>
}

export default Title
