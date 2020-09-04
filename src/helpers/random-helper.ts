import { floor } from "lodash"

/**
 * RandomHelper
 *  Méthodes statiques pour la génération de nombres aléatoires
 */
export class RandomHelper {
    public static getRandomInteger(min: number, max: number): number {

        // min : 10 max : 25
        // max - min = 25 - 10 => 15
        // +1 => 16
        // + min => 26
        // floor() : 25 * random number (between 0 .. 1)
        // Math.random() => 0.5896 * (25 - 10 + 1) => 0.5896 * 16 => 9, 4336
        // Math.floor(9,4336) => 9 + 10 => 19

        return Math.floor(
            Math.random() * (max - min + 1) + min
        ) 
    }
}