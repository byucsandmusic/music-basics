<script lang="ts">
import { defineComponent } from 'vue'
import Translator from '../models/translator'
import MusicNotation from './MusicNotation.vue'

export default defineComponent({
    name: 'TapAlong',
    props: {
        translator: Translator,
        rhythm: {
            type: Array,
            default: [1, 1, 1, 1],
        },
    },
    components: {
        MusicNotation,
    },
    data() {
        return {
            playKey: 0,
            tapped: false,
            playing: false,
            delayCancel: null,
            playButtonText: this.translator.get('general', 'tapAlong', 'play'),
            instructionsText: this.translator.get(
                'general',
                'tapAlong',
                'instructions',
                'intro'
            ),
            countdown: '',
            expectedTapsData: [],
            expectedTaps: [],
            currentNoteIndex: 0,
            canTap: false,
            tapResults: [],
            startTime: 0,
            tolerance: 200,
            bpm: 60,
            rhythmInput: '',
            tempRhythm: [1, 1, 1, 1],
            errorMessage: '',
        }
    },

    mounted() {
        window.addEventListener('keydown', this.handleKeyPress)
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.handleKeyPress)
    },

    methods: {
        async play() {
            this.playKey++
            let curKey = this.playKey
            this.playing = true
            this.playButtonText = this.translator.get(
                'general',
                'tapAlong',
                'reset'
            )
            console.log('playing')

            // Create expected input
            this.expectedTapsData = [...this.tempRhythm]
            this.expectedTaps = []
            const beatDuration = (60 / this.bpm) * 1000

            // Convert timing data into actual time offsets
            for (let i = 0; i < this.expectedTapsData.length; i++) {
                this.expectedTapsData[i] =
                    this.expectedTapsData[i] * beatDuration
            }
            console.log(this.expectedTapsData)

            // Precompute expected tap times
            let accumulatedTime = Date.now() + 12 * beatDuration
            this.expectedTaps.push(accumulatedTime)
            for (let i = 1; i < this.expectedTapsData.length; i++) {
                accumulatedTime += this.expectedTapsData[i - 1]
                this.expectedTaps.push(accumulatedTime)
            }

            // Start Metronome (in parallel)
            if (!this.playing || curKey != this.playKey) return
            this.instructionsText = this.translator.get(
                'general',
                'tapAlong',
                'instructions',
                'beat'
            )
            console.log('Starting metronome...')
            this.runMetronome(beatDuration, curKey)
            this.showCountdown(beatDuration, curKey)
            await this.delay(4 * beatDuration)
            if (!this.playing || curKey != this.playKey) return
            this.countdown = ''

            // Play example 4 beats
            console.log('Playing example...')
            this.instructionsText = this.translator.get(
                'general',
                'tapAlong',
                'instructions',
                'rhythm'
            )
            await this.playExample()

            // Wait for 4 beats for prep
            if (!this.playing || curKey != this.playKey) return
            this.instructionsText = this.translator.get(
                'general',
                'tapAlong',
                'instructions',
                'prep'
            )
            this.showCountdown(beatDuration, curKey)
            await this.delay(4 * beatDuration)
            if (!this.playing || curKey != this.playKey) return
            this.countdown = ''

            // Allow tapping after the example plays
            if (!this.playing || curKey != this.playKey) return
            this.instructionsText = this.translator.get(
                'general',
                'tapAlong',
                'instructions',
                'go'
            )
            this.canTap = true
            this.currentNoteIndex = 0
            this.tapResults = Array(this.expectedTapsData.length).fill(0)
            console.log('User can start tapping!')
            await this.delay(4 * beatDuration)
            if (!this.playing || curKey != this.playKey) return
            this.finish()
        },

        async runMetronome(beatDuration, curKey) {
            let count = 0
            const audioContext = new window.AudioContext() // TEMP: For placeholder sound
            while (this.playing && curKey == this.playKey) {
                console.log(`Metronome beat ${(count % 4) + 1}`)
                // TODO: Play metronome sound
                this.playBeep(audioContext, 'low') // TEMP: Placeholder sound
                await this.delay(beatDuration)
                count++
            }
        },

        playBeep(audioContext, pitch) {
            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()

            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)

            oscillator.type = 'sine' // Sine wave sound
            if (pitch == 'low') {
                oscillator.frequency.setValueAtTime(
                    440,
                    audioContext.currentTime
                ) // Frequency (440Hz = A4 note)
            } else {
                oscillator.frequency.setValueAtTime(
                    880,
                    audioContext.currentTime
                ) // Frequency (440Hz = A4 note)
            }
            oscillator.start()

            gainNode.gain.setValueAtTime(1, audioContext.currentTime) // Volume
            gainNode.gain.linearRampToValueAtTime(
                0,
                audioContext.currentTime + 0.1
            ) // Fade out
            oscillator.stop(audioContext.currentTime + 0.1) // Stop after a short duration
        },

        async playExample() {
            const audioContext = new window.AudioContext() // TEMP: For placeholder sound
            for (let i = 0; i < this.expectedTapsData.length; i++) {
                if (!this.playing) break
                console.log(`Example Note ${i + 1} played`)
                // TODO: Play note sound
                this.playBeep(audioContext, 'high') // Placeholder sound
                await this.delay(this.expectedTapsData[i])
            }
        },

        async showCountdown(beatDuration, curKey) {
            for (let i = 1; i < 5; i++) {
                if (!this.playing || curKey != this.playKey) break
                this.countdown = i
                await this.delay(beatDuration)
            }
        },

        delay(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms))
        },

        reset() {
            this.playing = false
            if (this.delayCancel) {
                this.delayCancel()
                this.delayCancel = null
            }
            this.playButtonText = this.translator.get(
                'general',
                'tapAlong',
                'play'
            )
            console.log('reset')
            this.instructionsText = this.translator.get(
                'general',
                'tapAlong',
                'instructions',
                'intro'
            )
            this.countdown = ''
            // TODO: Perform reset visually
        },

        tap() {
            if (!this.canTap || !this.playing) return

            const currentTapTime = Date.now()
            const expectedTime = this.expectedTaps[this.currentNoteIndex]
            const difference = Math.abs(currentTapTime - expectedTime)

            console.log(
                `Tapped at: ${currentTapTime}, Expected time: ${expectedTime}, Difference: ${difference}`
            )

            // Check if the tap is within tolerance range
            if (difference <= this.tolerance) {
                this.tapResults[this.currentNoteIndex] = 1
                console.log('Correct tap!')
            } else {
                console.log('Incorrect tap')
            }

            // Move to the next note
            this.currentNoteIndex++

            // Check if there are more notes to tap for
            if (this.currentNoteIndex >= this.expectedTaps.length) {
                this.finish()
            }
        },

        handleKeyPress(event) {
            if (event.code === 'Space') {
                event.preventDefault()
                if (this.playing) {
                    this.tap()
                }
            }
        },

        finish() {
            console.log('Tapping session complete!')
            this.canTap = false
            this.playing = false
            this.playButtonText = this.translator.get(
                'general',
                'tapAlong',
                'play'
            )
            console.log('Final tap results:', this.tapResults)
            let totalCorrect = 0
            for (let i = 0; i < this.tapResults.length; i++) {
                totalCorrect += this.tapResults[i]
            }
            if (totalCorrect < this.tapResults.length / 2) {
                this.instructionsText = this.translator.get(
                    'general',
                    'tapAlong',
                    'instructions',
                    'failed'
                )
            } else if (totalCorrect < this.tapResults.length) {
                this.instructionsText = this.translator.get(
                    'general',
                    'tapAlong',
                    'instructions',
                    'almost'
                )
            } else {
                this.instructionsText = this.translator.get(
                    'general',
                    'tapAlong',
                    'instructions',
                    'succeeded'
                )
            }
        },

        updateRhythm() {
            const parsedRhythm = this.rhythmInput
                .split(',')
                .map((num) => parseFloat(num.trim()))
                .filter((num) => !isNaN(num)) // Ensure valid numbers

            let sum = 0
            for (let i = 0; i < parsedRhythm.length; i++) {
                sum += parsedRhythm[i]
            }
            if (sum != 4) {
                this.errorMessage = this.translator.get(
                    'general',
                    'tapAlong',
                    'input',
                    'errorMessage'
                )
            } else {
                this.tempRhythm = parsedRhythm
                this.errorMessage = ''
            }
        },
    },
    setup() {
        const defaultMusic = {
            title: 'Quarter Notes',
            meter: '4/4',
            beat: '1/4',
            treble: ['BBBB'],
        }
        return { defaultMusic }
    },
})
</script>

<template>
    <h1>{{ translator.get('general', 'tapAlong', 'title') }}</h1>
    <div>
        <label for="rhythmInput">
            {{ translator.get('general', 'tapAlong', 'input', 'instructions') }}
        </label>
        <div class="input-wrapper">
            <input
                id="rhythmInput"
                v-model="rhythmInput"
                type="text"
                @keydown.enter="updateRhythm"
            />
            <button @click="updateRhythm">
                {{ translator.get('general', 'tapAlong', 'input', 'enter') }}
            </button>
        </div>
        <p
            v-if="errorMessage"
            style="color: red"
        >
            {{ errorMessage }}
        </p>
    </div>
    <MusicNotation
        :music="defaultMusic"
        :displayMidiPlayer="false"
    ></MusicNotation>
    <div class="header-container">
        <h3>{{ instructionsText }}</h3>
        <h3>{{ countdown }}</h3>
    </div>
    <button
        type="button"
        @click="playing ? reset() : play()"
    >
        {{ playButtonText }}
    </button>
    <button
        type="button"
        @click="tap()"
        :disabled="!playing"
    >
        Tap
    </button>
</template>

<style scoped>
.header-container {
    display: flex;
    gap: 10px;
    align-items: center;
}

.input-wrapper {
    display: flex;
    gap: 10px;
    align-items: center;
}

.input-wrapper input {
    height: 40px;
    padding: 5px;
    font-size: 16px;
}

.input-wrapper button {
    height: 40px;
    padding: 5px 10px;
    font-size: 16px;
    cursor: pointer;
    margin-bottom: 18px;
}
</style>

<!-- Bugs to do
 -->
