/**
 * Alphabet : service de création de tableau avec les lettres de l'alphabet
 */
export class Alphabet {
    protected minuscules: string[] = []
    protected majuscules: string[] = []


    public constructor(caractereDepart: string, caractereFin: string) {
        // caractereDepart : A
        // caractereDepart.toLowerCase() : a
        // 'a'.charCodeAt(0) => 97
        // Donc... codeCaractereDepart = 97
        const codeCaractereDepart: number = caractereDepart.toLowerCase().charCodeAt(0)
        const codeCaractereFin: number = caractereFin.toLowerCase().charCodeAt(0)

        // Boucle entre a: 97 jusqu'à z: 122 de 1 en 1
        // et utilise fromCharCode(i) pour récupérer le caractère associé
        for (let i = codeCaractereDepart; i <= codeCaractereFin; i++) {
            this.minuscules.push(String.fromCharCode(i))
            this.majuscules.push(String.fromCharCode(i).toUpperCase())
        }
    }

    public getMajuscules(): string[] {
        return this.majuscules
    }

    public getMinuscules(): string[] {
        return this.minuscules
    }
    
    public toString(): string {
        console.log('Hey i m the boss')
        return this.majuscules.join(',') + ' - ' + this.minuscules.join(',')
    }
}

/// My Name is Bond (Chaîne de caractères)
/// 'My Name is Bond'.charCodeAt(0) <=> Retourne la valeur unicode de M
/// 'My Name is Bond'.charCodeAt(3) <=> Retourne la valeur unicode de N