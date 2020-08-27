import React from 'react'
import styles from './home.module'
import { CthulhuPNG, CoffeeSVG } from 'Assets'
import { Title } from 'Components'

function HomePage() {
  return (
    <div>
      <h1 className={styles.title}>Hello React!</h1>
      <Title>Hello Again React!</Title>
      <p>hi there</p>
      <img src={CthulhuPNG} alt="logo" />
      <CoffeeSVG />
    </div>
  )
}

export default HomePage
