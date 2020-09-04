import { IntegerSet } from './integer-set'

/**
 * Alimente un tableau de valeurs entières comprises entre 0 et 9
 */
export class DigitIntegerSet extends IntegerSet {
    public constructor() {
        super(0, 9)
    }
}