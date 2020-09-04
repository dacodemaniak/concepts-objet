/**
 * Génère un tableau avec des entiers compris entre x et y
 */
export abstract class IntegerSet {
    protected digits: number[] = []

    public constructor(from: number, to: number) {

        for (let i = from; i <= to; i++) {
            this.digits.push(i)
        }
    }

    public toString(): string {
        return this.digits.join(' ')
    }
}