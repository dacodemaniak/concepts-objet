import { RandomHelper } from './../helpers/random-helper';
import { RouletteNumbers } from './../helpers/roulette-numbers';
import { times } from 'lodash';

export class Roulette {
    /**
     * @var Map<number, any>
     *  Mapping of roulette desk
     *      each key represent one of the number
     *      each value represents an object that store color, and even or odd value of the key 
     */
    private static rouletteMap: Map<number, any> = new Map<number, any>()

    private static template: any;

    private static context: CanvasRenderingContext2D;

    private static readonly reds: number[] = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25,
            27, 30, 32, 34, 36
    ]
    private static readonly desk: number[] = [
        0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23,
        10, 5, 24, 16, 33, 1, 20, 14, 31,9, 22, 18, 29, 7, 28, 12, 35, 3, 26
    ]
    private static startAngle: number = 0
    private static readonly arc: number = Math.PI / (Roulette.desk.length / 2)

    /**
     * Store timeout function result to stop it
     */
    private static spinTimeout: any

    /**
     * @var number
     *  Set start angle for rotation
     */
    private static spinAngleStart: number

    /**
     * @var number
     *  Spin elapsed time
     */
    private static spinTime: number

    /**
     * @var number
     *  Total spin duration
     */
    private static spinTimeTotal: number

    private static button: HTMLElement;

    private static canvas: HTMLCanvasElement

    public constructor() {
        

        // Sets the desk config
        Roulette.setRouletteDesk()

        

        // Get the template (better do it in a parent class that use an XHR object)
        const xmlHttpRequest: XMLHttpRequest = new XMLHttpRequest()
        xmlHttpRequest.open(
            'GET',
            '/templates/roulette.html'
        )
        xmlHttpRequest.onload = (): any => {
            Roulette.template = document.createRange().createContextualFragment(xmlHttpRequest.responseText)
            
            Roulette.canvas = Roulette.template.getElementById('roulette')

            // Set event handler on button
            Roulette.button = Roulette.template.getElementById('spin')
            Roulette.button.addEventListener(
                'click',
                (event: any): void => Roulette.launch()
            )            
            Roulette.draw()

            // Once template is loaded then add it to tsApp selector
            const appDock: HTMLElement = document.querySelector('[tsApp]')
            appDock.appendChild(Roulette.template)

 
        }

        xmlHttpRequest.send()
    }

    private static launch(): void {
        Roulette.spinAngleStart = Math.random() * 10 + 10
        Roulette.spinTime = 0
        Roulette.spinTimeTotal = Math.random() * 3 + 4 * 1000

        Roulette.button.textContent = 'Rien ne va plus...'
        Roulette.button.setAttribute('disabled', 'disabled')

        Roulette.rotateRoulette()
    }

    private static rotateRoulette(): void {

        Roulette.spinTime += 30

        // Stop rotation as time elapsed
        if (Roulette.spinTime >= Roulette.spinTimeTotal) {
            Roulette.stopRouletteRotation()
            return
        }

        // Proceed
        const effect: number = Roulette.setEffect(Roulette.spinTime, 0, Roulette.spinAngleStart, Roulette.spinTimeTotal)
        const spinAngle: number = Roulette.spinAngleStart - effect
        
        Roulette.startAngle += (spinAngle * Math.PI / 180)
        Roulette.draw()

        Roulette.spinTimeout = setTimeout(
            Roulette.rotateRoulette,
            30
        )
    }

    private static stopRouletteRotation(): void {
        clearTimeout(Roulette.spinTimeout)

        const degrees: number = Roulette.startAngle * 180 / Math.PI + 90
        const arccd: number = Roulette.arc * 180 / Math.PI
        const index: number = Math.floor((360 - degrees % 360) / arccd)
        
        Roulette.context.save()
        Roulette.context.font = 'bold 30px Arial,Helvetica'

        const text: string = Roulette.desk[index].toString()
        
        console.log(`${text} from index : ${index}`)
        
        Roulette.context.fillText(
            text,
            250 - Roulette.context.measureText(text).width / 2,
            260
        )

        Roulette.context.restore()

        Roulette.button.textContent = 'Lancer'
        Roulette.button.removeAttribute('disabled')
    }

    /**
     * Sets all items of the roulette
     */
    private static setRouletteDesk(): void {
        Roulette.rouletteMap
            .set(
                0, { odd: true, color: 'green' }
            )
        
        // Loop through desk to build the full desk
        for (const deskValue of Roulette.desk) {
            if (deskValue !== 0) {
                Roulette.rouletteMap.set(
                    deskValue,
                    Roulette.getDeskConfig(deskValue)
                )
            }

        }
    }

    /**
     * @returns any
     *  Defines desk number settings (odd and color)
     */
    private static getDeskConfig(deskValue: number): any {
        return {
            odd: ((deskValue % 2) === 0) ? true : false,
            color: Roulette.reds.indexOf(deskValue) !== -1 ? 'red' : 'black'
        }
    }

    private static draw(): void {
        

        Roulette.canvas.setAttribute('height', '500')
        Roulette.canvas.setAttribute('width', '500')

        if (Roulette.canvas.getContext) {
            const outsideRadius: number = 200
            const textRadius: number = 160
            const insideRadius: number = 125

            Roulette.context = Roulette.canvas.getContext('2d')
            Roulette.context.clearRect(0, 0, 500, 500)

            Roulette.context.strokeStyle = 'black'
            Roulette.context.lineWidth = 2
            Roulette.context.font = 'bold 12px Arial, Helvetica'

            let indice: number = 0
            Roulette.rouletteMap.forEach((option: any, key: number) => {
                
                const angle: number = Roulette.startAngle + indice * Roulette.arc
                Roulette.context.fillStyle = option.color

                Roulette.context.beginPath()

                Roulette.context.arc(
                    250,
                    250,
                    outsideRadius,
                    angle,
                    angle + Roulette.arc,
                    false
                )
                Roulette.context.arc(
                    250,
                    250,
                    insideRadius,
                    angle + Roulette.arc,
                    angle,
                    true
                )

                Roulette.context.stroke()
                Roulette.context.fill()

                Roulette.context.save()

                Roulette.context.shadowOffsetX = -1
                Roulette.context.shadowOffsetY = -1
                Roulette.context.shadowBlur = 0
                Roulette.context.shadowColor = 'rgb(220, 220, 220)'
                Roulette.context.fillStyle = 'white'
                Roulette.context.translate(
                    250 + Math.cos(angle + Roulette.arc / 2) * textRadius,
                    250 + Math.sin(angle + Roulette.arc / 2) * textRadius
                )
                
                Roulette.context.rotate( angle + Roulette.arc / 2 + Math.PI / 2)
                Roulette.context.fillText(
                    key.toString(), -Roulette.context.measureText(key.toString()).width / 2,
                    0
                )

                Roulette.context.restore()

                // Draw arrow
                Roulette.context.fillStyle = 'lightgreen'
                Roulette.context.beginPath();
                Roulette.context.moveTo(250 - 4, 250 - (outsideRadius + 5))
                Roulette.context.lineTo(250 + 4, 250 - (outsideRadius + 5))
                Roulette.context.lineTo(250 + 4, 250 - (outsideRadius - 5))
                Roulette.context.lineTo(250 + 9, 250 - (outsideRadius - 5))
                Roulette.context.lineTo(250 + 0, 250 - (outsideRadius - 13))
                Roulette.context.lineTo(250 - 9, 250 - (outsideRadius - 5))
                Roulette.context.lineTo(250 - 4, 250 - (outsideRadius - 5))
                Roulette.context.lineTo(250 - 4, 250 - (outsideRadius + 5))

                Roulette.context.fill();

                indice++
            })
        }
    }
    private static setEffect(currentElapsedTime: number, base: number, angle: number, totalTime: number ): number {
        const ts = (currentElapsedTime/=totalTime) * currentElapsedTime
        const tc = ts * currentElapsedTime

        return base + angle * (tc + -3 * ts + 3 * currentElapsedTime)
    }
}