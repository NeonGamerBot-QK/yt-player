import React from 'react'
import styles from './Header.module.css'

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Music Player</h1>
      <p className={styles.description}>
   <em>Doges on the ads</em>
      </p>
    </div>
  )
}

export default Header
