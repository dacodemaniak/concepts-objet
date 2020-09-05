import { RandomHelper } from './helpers/random-helper';
import { SpecialChars } from './helpers/special-chars';
import { DigitIntegerSet } from './helpers/digit-integer-set';
import { FullAlphabet } from './helpers/full-alphabet';

export class PasswordGenerator {
    private fullAlphabet:   FullAlphabet
    private digits:         DigitIntegerSet
    private specialChars:   SpecialChars

    private passwordLength: number = 8
    private nbMajusculesMini: number = 1
    private nbDigitsMini: number = 1
    private nbSpecialsMini: number = 1

    private passwordArray: string[] // Tous les caractères du mot de passe

    private majs: string[] = [] // Contiendra les majuscules
    private chiffres: number[] = [] // Contiendra les chiffres
    private specials: string[] = [] // Contiendra les caractères spéciaux

    public constructor() {
        // Instancier les classes spécifiques
        this.fullAlphabet = new FullAlphabet()
        this.digits = new DigitIntegerSet()
        this.specialChars = new SpecialChars()

        // Generate all required chars
        this.setRequiredMajs()
        this.setRequiredDigits()
        this.setRequiredSpecials()

        // Put all values into passwordArray attribute
        this.passwordArray = this.majs.concat(this.specials)
        this.passwordArray.concat(
            this.chiffres.map((value) => { // Map transform all values to another thing
                return value.toString()
            })
        )

        // Fill remaining chars...


        // Shuffle final array

        

    }

    private setRequiredMajs(): void {
        let i: number = 0
        const lesMajuscules: string[] = this.fullAlphabet.getMajuscules()

        while(i < this.nbMajusculesMini) {
            const nbAleatoire: number = RandomHelper.getRandomInteger(
                0,
                lesMajuscules.length - 1
            )
            
            this.majs.push(lesMajuscules[nbAleatoire])

            i++ // Don't forget else... deadloop
        }
    }

    private setRequiredSpecials(): void {
        let i: number = 0
        while(i < this.nbSpecialsMini) {
            const nbAleatoire: number = RandomHelper.getRandomInteger(
                0,
                this.specialChars.getSpecialChars().length - 1 // Else eventually outbound
            )
            this.specials.push(this.specialChars.getSpecialChars()[nbAleatoire])

            i++ // Don't forget else... deadloop
        }
    }

    private setRequiredDigits(): void {
        let i: number = 0
        while(i < this.nbDigitsMini) {
            const nbAleatoire: number = RandomHelper.getRandomInteger(
                0,
                this.digits.getDigits().length - 1
            )
            this.chiffres.push(this.digits.getDigits()[nbAleatoire])

            i++ // Don't forget else... deadloop
        }
    }
}