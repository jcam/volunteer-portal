/**
 * Superawesome splash screen
 * Seriously, who needs real content with lorem like this?
 *
 * @author mtownsend
 * @since Oct 2017
 **/

import React from 'react';
import logo from '../images/logo.svg';
import styles from './Splash.css';

const Splash = ({ reverse, onLogoClick }) => {
  const className = [ styles.Splash ];
  if (reverse) {
    className.push(styles.reversed);
  }
  return (
    <div className={className.join(' ')}>
      <header className={styles.header}>
        <img src={logo} className={styles.logo} alt="logo" onClick={ () => onLogoClick() } />
        <h1 className={styles.title}>ENLIST NOW</h1>
      </header>
      <p className={styles.intro}>
        Service guarantees citizenship
      </p>
    </div>
  );
};

export default Splash;