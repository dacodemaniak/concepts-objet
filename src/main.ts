import { Roulette } from './roulette/roulette';
import { DigitIntegerSet } from './helpers/digit-integer-set';
import { IntegerSet } from './helpers/integer-set';
import { SpecialChars } from './helpers/special-chars';
import { Alphabet } from './helpers/alphabet';
import { RandomHelper } from './helpers/random-helper';
import { ArrayHelper } from './array-helper';

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
import { FullAlphabet } from './helpers/full-alphabet';

class Main {
    public constructor() {
        console.log('Application is ready')

        // Load a roulette game
        new Roulette()
    }
}

/**
 * Bootstraping application
 */
(() => {
    new Main()
})()