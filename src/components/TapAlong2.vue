<script lang="ts">
import { defineComponent } from 'vue'
import Translator from '../models/translator'
import MusicNotation from './MusicNotation.vue'
import { Cursor } from '../models/types'

export default defineComponent({
    name: 'TapAlong2',
    props: {
        translator: {
            type: Translator,
            required: true,
        },
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
            canTap: false,
            startTime: 0,
            tolerance: 200,
            bpm: 60,
            rhythmInput: '',
            tempRhythm: [1, 1, 1, 1],
            errorMessage: '',
            currentNoteIndex: 0,
            rhythmElements: [],
            rhythmTimes: [],
            countdown: '',
            tapResults: [],
            currentBeat: 0,
            metronomeCursor: {
                onStart: this.onStart.bind(this),
                onEvent: this.onEvent.bind(this),
                onFinished: this.onFinished.bind(this),
            } as Cursor,
        }
    },

    mounted() {
        window.addEventListener('keydown', this.handleKeyPress)
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.handleKeyPress)
    },

    methods: {
        // --- Metronome Cursor functions ---
        onStart() {
            console.log('Playback started')
            this.currentBeat = 0
        },
        onEvent() {
            this.currentBeat += 1
            if (this.currentBeat == 5) {
                console.log('Beat 5 reached')
                // Play example
                this.playExample()
            }
            if (this.currentBeat == 13) {
                console.log('Measure 13 reached')
                this.canTap = true
            }
        },
        onFinished() {
            this.finish()
        },
        // -------------------------

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

            const beatDuration = (60 / this.bpm) * 1000

            // Start Metronome (in parallel)
            this.startMetronome()
            if (!this.playing || curKey != this.playKey) return
            this.instructionsText = this.translator.get(
                'general',
                'tapAlong',
                'instructions',
                'beat'
            )
            console.log('Starting metronome...')
            if (!this.playing || curKey != this.playKey) return

            // Play example 4 beats
            console.log('Playing example...')
            this.instructionsText = this.translator.get(
                'general',
                'tapAlong',
                'instructions',
                'rhythm'
            )

            // Wait for 4 beats for prep
            if (!this.playing || curKey != this.playKey) return
            this.instructionsText = this.translator.get(
                'general',
                'tapAlong',
                'instructions',
                'prep'
            )
            if (!this.playing || curKey != this.playKey) return

            // Allow tapping after the example plays
            if (!this.playing || curKey != this.playKey) return
            this.instructionsText = this.translator.get(
                'general',
                'tapAlong',
                'instructions',
                'go'
            )
            this.tapResults.fill(0)
            this.canTap = true
            console.log('User can start tapping!')
        },

        startMetronome() {
            console.log('Playing metronome...')
            if (this.$refs.metronomeMusicNotation) {
                ;(this.$refs.metronomeMusicNotation as any).playPause()
            } else {
                console.error(
                    'MetronomeMusicNotation component is not available'
                )
            }
        },

        playExample() {
            console.log('Playing example rhythm...')
            if (this.$refs.rhythmMusicNotation) {
                ;(this.$refs.rhythmMusicNotation as any).playPause()
            } else {
                console.error('RhythmMusicNotation component is not available')
            }
        },

        reset() {
            this.playing = false
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

            const currentTapTime = Date.now() - this.startTime
            const expectedTime = this.rhythmTimes[this.currentNoteIndex]
            const difference = Math.abs(currentTapTime - expectedTime)

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
        const metronome = {
            title: 'Metronome',
            meter: '4/4',
            beat: '1/4',
            treble: ['EEEE|EEEE|EEEE|EEEE'],
        }
        return { defaultMusic, metronome }
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
        ref="metronomeMusicNotation"
        :music="metronome"
        :displayMidiPlayer="false"
        :displaySheetMusic="false"
        :cursor="metronomeCursor"
        :translator="translator"
    ></MusicNotation>
    <MusicNotation
        ref="rhythmMusicNotation"
        :music="defaultMusic"
        :displayMidiPlayer="false"
        :displaySheetMusic="true"
        :translator="translator"
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
