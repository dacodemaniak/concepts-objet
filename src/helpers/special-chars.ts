export class SpecialChars {
    /**
     * Collection of special chars
     */
    private specialChars: string[] = []

    public constructor() {
        let from: number = 33
        const to: number = 64

        while (from <= to) {
            if (from > 47 && from < 58) {
                from++
                continue // Ne pas tenir compte des ces daubes
            }
            this.specialChars.push(String.fromCharCode(from))
            from++
        }
    }

    public toString(): string {
        return this.specialChars.join(' ')
    }
}