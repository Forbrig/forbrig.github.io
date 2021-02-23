import Head from 'next/head'
import React, { useState } from 'react';
// import Image from 'next/image'
import styles from '../styles/Home.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faStackOverflow, faLinkedin, faSteam, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function Home() {
  const [flip, setFlip] = useState(false);
  const [init, setInit] = useState(true);
  function flipCard() {
    setFlip(!flip);
    changeInit();
  }

  function changeInit() {
    setInit(false);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Forbrig's Portfolio</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className={styles.container}>
        {/* frontcard */}

        <div className={`${styles.card} ${flip ? styles.cardflipfront : styles.dalayedtransition}`}>
          <h2 className={styles.headline}>I Develop & other stuff</h2>
          <h1 className={styles.name}>Vitor Forbrig</h1>
          <div className={styles.medias}>
            <a href="https://github.com/Forbrig" target="blank">
              <FontAwesomeIcon className={styles.media} icon={faGithub} />
            </a>
            <a href="https://stackoverflow.com/users/8692530/forbrig" target="blank">
              <FontAwesomeIcon className={styles.media} icon={faStackOverflow} />
            </a>
            <a href="https://www.linkedin.com/in/forbrig/" target="blank">
              <FontAwesomeIcon className={styles.media} icon={faLinkedin} />
            </a>
            <a href="https://www.instagram.com/vitorforbrig/" target="blank">
              <FontAwesomeIcon className={styles.media} icon={faInstagram} />
            </a>
            <a href="https://steamcommunity.com/id/anonyclick" target="blank">
              <FontAwesomeIcon className={styles.media} icon={faSteam} />
            </a>
          </div>
          <FontAwesomeIcon onClick={flipCard} className={`${styles.arrow} ${styles.nextarrow}`} icon={faArrowRight} />
        </div>
        
        {/* backcard */}
        <div className={`${styles.card} ${styles.backcard} ${flip ? styles.cardflipback + ' ' + styles.dalayedtransition : ''} ${init ? styles.init : ''}`}>
          <h2 className={styles.headline}>I Develop & other stuff</h2>

          <img
            src="/doggy.png"
            className={styles['profile-image']}
            alt="Picture of the author"
          />
          
          <FontAwesomeIcon onClick={flipCard} className={`${styles.arrow} ${styles.prevarrow}`} icon={faArrowLeft} />
        </div>

        <div className={styles.footer}>v1.0</div>
      </main>
    </div>
  )
}