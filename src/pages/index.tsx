import Head from 'next/head';
import React, { useState } from 'react';
// import Image from 'next/image'
import styles from '../styles/Home.module.scss';

import Highlight from 'react-highlight';
import '../../node_modules/highlight.js/styles/my-theme.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faStackOverflow, faLinkedin, faSteam, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function Home() {
  const [flip, setFlip] = useState(false);
  const [init, setInit] = useState(true);

  var code = `// find me on the internet
function socialMedias(media) {
  switch(media) {
    case 'github':
      window.location.replace("`;

  var code2 = `");
      break;
    case 'stackoverflow':
      window.location.replace("`;

  var code3 = `");
      break;
    case 'linkedin':
      window.location.replace("`;
  
  var code4 = `");
      break;
    case 'instagram':
      window.location.replace("`;
  
  var code5 = `");
      break;
    case 'steam':
      window.location.replace("`;
  
  var code6 = `");
      break;
    default:
      window.location.replace("`;
  
  var code7 = `");
  }
}`

  var code1 = `function socialMedias(media) {
    switch(media) {
      case 'github':
        window.location.replace("https://github.com/Forbrig");
        break;
      case 'stackoverflow':
        window.location.replace("https://stackoverflow.com/users/8692530/forbrig");
        break;
      case 'linkedin':
        window.location.replace("https://www.linkedin.com/in/forbrig");
        break;
      case 'instagram':
        window.location.replace("https://www.instagram.com/vitorforbrig");
        break;
      case 'steam':
        window.location.replace("https://steamcommunity.com/id/anonyclick");
        break;
      default:
        window.location.replace("https://forbrig.netlify.app");
    }
  }`;

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
          <div className={styles.content}>
            <div className={styles.side}>
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
            </div>
            {/* <div className={styles.side}>
              <div className={styles.sidea}>
                <img
                  src="/keyboard.svg"
                  className={styles['card-logo']}
                  alt="Card logo"
                />
              </div>
            </div> */}
          </div>
          <FontAwesomeIcon onClick={flipCard} className={`${styles.arrow} ${styles.nextarrow}`} icon={faArrowRight} />
        </div>
        
        {/* backcard */}
        <div className={`${styles.card} ${styles.backcard} ${flip ? styles.cardflipback + ' ' + styles.dalayedtransition : ''} ${init ? styles.init : ''}`}>
          <h2 className={styles.headline}>I Develop & other stuff</h2>

          <div className={styles.code}>
            <Highlight language="javascript">
              {code}
                <a href="https://github.com/Forbrig" target="blank">https://github.com/Forbrig</a>
              {code2}
                <a href="https://stackoverflow.com/users/8692530/forbrig" target="blank">https://stackoverflow.com/users/8692530/forbrig</a>
              {code3}
                <a href="https://www.linkedin.com/in/forbrig" target="blank">https://www.linkedin.com/in/forbrig</a>
              {code4}
                <a href="https://www.instagram.com/vitorforbrig" target="blank">https://www.instagram.com/vitorforbrig</a>
              {code5}
                <a href="https://steamcommunity.com/id/anonyclick" target="blank">https://steamcommunity.com/id/anonyclick</a>
              {code6}
                <a href="https://forbrig.netlify.app" target="blank">https://forbrig.netlify.app/</a>
              {code7}
            </Highlight>
          </div>

          {/* <img
            src="/doggy.png"
            className={styles['profile-image']}
            alt="Picture of the author"
          /> */}
          
          <FontAwesomeIcon onClick={flipCard} className={`${styles.arrow} ${styles.prevarrow}`} icon={faArrowLeft} />
        </div>

        <div className={styles.footer}>v1.0</div>
      </main>
    </div>
  )
}