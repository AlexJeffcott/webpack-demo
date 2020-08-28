import React from 'react'
import styles from './home.module.css'
import { CthulhuPNG, CoffeeSVG } from 'Assets'
import { Title } from 'Components'

function HomePage() {
  return (
    <div data-testid="HomePage Component">
      <h1 className={styles.title}>Hello React!</h1>
      <Title title="Hello Again React!" />
      <p>hi there</p>
      <img src={CthulhuPNG} alt="logo" />
      <CoffeeSVG />
    </div>
  )
}

export default HomePage
