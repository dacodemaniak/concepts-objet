/**
 * @name Main
 * @author IDea Factory (jean-luc.a@ideafactory.fr) - Sept. 2020
 * @version 1.0.0
 * @abstract Entry point for application
 */

/**
 * Import main.scss
 */
import './scss/main.scss';

export class Main {
    public constructor() {
        console.log('Application is ready')
    }
}

/**
 * Bootstraping application
 */
document.addEventListener(
    'DOMContentLoaded',
    (event: any): void => {
        new Main()
    }
)