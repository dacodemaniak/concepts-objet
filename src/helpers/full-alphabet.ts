import { Alphabet } from './alphabet';
/**
 * FullAphabet : Définit tous les caractères de l'alphabet de a jusqu'à z et A .. Z
 */
export class FullAlphabet extends Alphabet {
    public constructor() {
        super('a', 'z') // Constructeur de la classe parente
    }

    /**
     * Override super.toString()
     */
    public toString(): string {
        return this.minuscules.join('*') + '\n' + super.toString()
    }
}