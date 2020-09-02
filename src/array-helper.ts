export class ArrayHelper {
    private srcArray: number[];

    private averageValue: number;
    private highestValue: number;
    private minOddValue: number;

    private odds: number[]
    private evens: number[]

    public constructor(tableauSource: number[]) {
        this.srcArray = tableauSource;

        this.averageValue = this.average()
        this.highestValue = this.getHighestValue()
        this.minOddValue = this.getMinOddValue()

        this.splitSource()
    }

    public get avg(): number {
        return this.averageValue
    }

    public get highest(): number {
        return this.highestValue
    }

    public get minOdd(): number {
        return this.minOddValue
    }

    public get oddArray(): number[] {
        return this.odds
    }

    public get evenArray(): number[] {
        return this.evens
    }
    /**
     * Return the average of array values
     * @return number
     */
    private average(): number {
        let cumul: number = 0

        for (const value of this.srcArray) {
            cumul += value
        }

        return cumul / this.srcArray.length
    }

    /**
     * Returns highest value in the array
     * @return number
     */
    private getHighestValue(): number {
        let highest: number = this.srcArray[0];

        for (let i = 1; i < this.srcArray.length; i++) {
            if (this.srcArray[i] > highest) {
                highest = this.srcArray[i]
            }
        }

        return highest
    }

    private getMinOddValue(): number | null {
        const minOddValue: any = Math.min(
           ...this.srcArray.filter((value: number) => value % 2 === 0) 
        )
        
        return isFinite(minOddValue) ? minOddValue : null
    }

    private splitSource(): void {
        this.odds = this.srcArray.filter((value) => value % 0 === 0)
        this.evens = this.srcArray.filter((value) => value % 2 !== 0)
    }
}