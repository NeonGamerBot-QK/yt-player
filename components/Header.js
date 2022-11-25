import React from 'react'
import styles from './Header.module.css'

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Audio Player for your Music</h1>
      <p className={styles.description}>
   Doges on the ads
      </p>
    </div>
  )
}

export default Header
