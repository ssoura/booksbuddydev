import React from "react";
import { Link } from "react-router-dom";

import styles from './NotFound.module.css'

export function NotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.heading}>404</div>
            <div className={styles.subheading}>Page Not Found</div>
            <div className={styles.description}>
                <div>We're sorry the page you requested could not be found</div>
                <div>Please go back to the homepage</div>
            </div>
            <Link to="/">
                <button className={styles.button}>Go to Home</button>
            </Link>
        </div>
    );
}
