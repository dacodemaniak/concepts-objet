import { RouletteNumbers } from './../helpers/roulette-numbers';

export class Roulette {
    /**
     * @var Map<number, any>
     *  Mapping of roulette desk
     *      each key represent one of the number
     *      each value represents an object that store color, and even or odd value of the key 
     */
    private rouletteMap: Map<number, any> = new Map<number, any>()

    private template: any;

    private static readonly reds: number[] = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25,
            27, 30, 32, 34, 36
    ]
    private static readonly desk: number[] = [
        0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23,
        10, 5, 24, 16, 33, 1, 20, 14, 31,9, 22, 18, 29, 7, 28, 12, 35, 3, 26
    ]
    private static startAngle: number = 0
    private static readonly arc: number = Math.PI / (Roulette.desk.length / 2)

    public constructor() {
        

        // Sets the desk config
        this.setRouletteDesk()

        

        // Get the template (better do it in a parent class that use an XHR object)
        const xmlHttpRequest: XMLHttpRequest = new XMLHttpRequest()
        xmlHttpRequest.open(
            'GET',
            '/templates/roulette.html'
        )
        xmlHttpRequest.onload = (): any => {
            this.template = document.createRange().createContextualFragment(xmlHttpRequest.responseText)
            
            let canvas: HTMLCanvasElement = this.template.getElementById('roulette')
            
            canvas.setAttribute('height', '500')
            canvas.setAttribute('width', '500')

            if (canvas.getContext) {
                const outsideRadius: number = 200
                const textRadius: number = 160
                const insideRadius: number = 125

                const context: CanvasRenderingContext2D = canvas.getContext('2d')
                context.clearRect(0, 0, 500, 500)

                context.strokeStyle = 'black'
                context.lineWidth = 2
                context.font = 'bold 12px Arial, Helvetica'

                let indice: number = 0
                this.rouletteMap.forEach((option: any, key: number) => {
                    
                    const angle: number = Roulette.startAngle + indice * Roulette.arc
                    context.fillStyle = option.color

                    context.beginPath()

                    context.arc(
                        250,
                        250,
                        outsideRadius,
                        angle,
                        angle + Roulette.arc,
                        false
                    )
                    context.arc(
                        250,
                        250,
                        insideRadius,
                        angle + Roulette.arc,
                        angle,
                        true
                    )

                    context.stroke()
                    context.fill()

                    context.save()

                    context.shadowOffsetX = -1
                    context.shadowOffsetY = -1
                    context.shadowBlur = 0
                    context.shadowColor = 'rgb(220, 220, 220)'
                    context.fillStyle = 'white'
                    context.translate(
                        250 + Math.cos(angle + Roulette.arc / 2) * textRadius,
                        250 + Math.sin(angle + Roulette.arc / 2) * textRadius
                    )
                    console.log(`Fill text : ${key.toString()}`)
                    context.rotate( angle + Roulette.arc / 2 + Math.PI / 2)
                    context.fillText(
                        key.toString(), -context.measureText(key.toString()).width / 2,
                        0
                    )

                    context.restore()

                    // Draw arrow
                    context.fillStyle = 'lightgreen'
                    context.beginPath();
                    context.moveTo(250 - 4, 250 - (outsideRadius + 5))
                    context.lineTo(250 + 4, 250 - (outsideRadius + 5))
                    context.lineTo(250 + 4, 250 - (outsideRadius - 5))
                    context.lineTo(250 + 9, 250 - (outsideRadius - 5))
                    context.lineTo(250 + 0, 250 - (outsideRadius - 13))
                    context.lineTo(250 - 9, 250 - (outsideRadius - 5))
                    context.lineTo(250 - 4, 250 - (outsideRadius - 5))
                    context.lineTo(250 - 4, 250 - (outsideRadius + 5))

                    context.fill();

                    indice++
                })
            }
            // Once template is loaded then add it to tsApp selector
            const appDock: HTMLElement = document.querySelector('[tsApp]')
            appDock.appendChild(this.template)
        }

        xmlHttpRequest.send()
    }

    /**
     * Sets all items of the roulette
     */
    private setRouletteDesk(): void {
        this.rouletteMap
            .set(
                0, { odd: true, color: 'green' }
            )
        
        // Loop through desk to build the full desk
        for (const deskValue of Roulette.desk) {
            if (deskValue !== 0) {
                this.rouletteMap.set(
                    deskValue,
                    this.getDeskConfig(deskValue)
                )
            }

        }
    }

    /**
     * @returns any
     *  Defines desk number settings (odd and color)
     */
    private getDeskConfig(deskValue: number): any {
        return {
            odd: ((deskValue % 2) === 0) ? true : false,
            color: Roulette.reds.indexOf(deskValue) !== -1 ? 'red' : 'black'
        }
    }
}