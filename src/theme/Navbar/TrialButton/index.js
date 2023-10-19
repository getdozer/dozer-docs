import React from 'react';
import styles from './styles.module.css';

const TrialButton = () => {
    return (
        <a
            href="https://cloud.getdozer.io/signup"
            target="_blank"
            className={styles.trialButton}
            rel="noopener">
            <div className={styles.trialText}>
                Start Free Trial
            </div>
            <div className={styles.trialSubText}>
                No credit card required
            </div>

        </a>
    );
};

export default TrialButton;
