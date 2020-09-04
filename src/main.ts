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

        // Make an ArrayHelper instance
        let numbers: number[] = [1, 5, 7, 9];
        const array1: ArrayHelper = new ArrayHelper(numbers)
        console.log(`Moyenne de array1 : ${array1.avg}`)
        console.log(`Plus petite valeur paire de array1 : ${array1.minOdd}`)
        
        const array2: ArrayHelper = new ArrayHelper([2, 4, 6, 8])
        console.log(`Moyenne de array2 : ${array2.avg}`)
        console.log(`Plus petite valeur paire de array2 : ${array2.highest}`)

        // Appeler une méthode statique : NomClasse.methode()
        console.log(`Nombre entier aléatoire ${RandomHelper.getRandomInteger(10, 25)}`)

        // Affiche les majuscules et minuscules de l'alphabet
        const alpha: Alphabet = new FullAlphabet()
        console.log(alpha.toString())

        const specialChars: SpecialChars = new SpecialChars()
        console.log(specialChars.toString())

        const digits: IntegerSet = new DigitIntegerSet()
        console.log(digits.toString())
    }
}

/**
 * Bootstraping application
 */
(() => {
    new Main()
})()