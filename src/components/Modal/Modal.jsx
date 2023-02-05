import React from 'react'
import styles from './Modal.module.scss'
function Modal({children, ...props}) {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        {children}
      </div>
    </div>
  )
}

export default Modal