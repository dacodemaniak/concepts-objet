export class TextToSpeech {
    private synth: SpeechSynthesis
    private utterance: SpeechSynthesisUtterance
    private voice: SpeechSynthesisVoice

    private canUseTTS: boolean

    public constructor() {
        this.canUseTTS = true

        if (!(window.speechSynthesis)) {
            this.canUseTTS = false
        } else {
            this.synth = window.speechSynthesis
            this.setLocalVoice().then((voices: SpeechSynthesisVoice[]) => {
                const navigatorLanguage: string = window.navigator.language
                const userLanguage: string = navigatorLanguage.split('-')[0]
                
                this.voice = voices.reduce((voice) => 
                    voice.default && voice.lang.substr(0, 2) == userLanguage ? voice : voices[0]
                )
                this.utterance = new SpeechSynthesisUtterance()
                this.utterance.voice = this.voice
                this.utterance.pitch = .8
                this.utterance.rate = .9 
            })


            
        }
    }

    public say(what: string): void {
        if (this.canUseTTS) {

            this.utterance.text = what
            this.synth.speak(this.utterance)  
        }
    }

    private setLocalVoice(): Promise<SpeechSynthesisVoice[]> {
        return new Promise((resolve: any) => {
            let interval: any = setInterval(() => {
                const voices: SpeechSynthesisVoice[] = this.synth.getVoices()
                
                if (voices.length !== 0 ) {
                    resolve(voices)
                    clearInterval(interval)
                }

            },
            50)
        })
    }
}