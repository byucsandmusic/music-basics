<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Translator from '../models/translator'
import MusicNotation from './MusicNotation.vue'
import { Cursor } from '../models/types'
import { Music } from '../models/types'
import { progress, ProgressInfo } from '../models/progress'

/**
 * usage:
 *     TapAlong is a Vue 3 component that provides an interactive rhythm exercise where users tap along to a given rhythm.
 *     The component handles a metronome and a rhythm track, guiding the user through a sequence of beats.
 *     Tapping is validated based on timing accuracy, and results are displayed at the end of the exercise.
 *
 * props:
 *     translator: An instance of the Translator class for handling multilingual text. Required.
 *     rhythm: An object of type Music representing the rhythm to be played.
 *
 * data:
 *    playing: Boolean indicating if the exercise is currently active.
 *    playButtonText: Text for the play button, changes based on state.
 *    instructionsText: Text providing instructions to the user.
 *    canTap: Boolean indicating if the user can start tapping.
 *    startTime: Timestamp when the user can start tapping.
 *    tolerance: Time tolerance in milliseconds for tap accuracy.
 *    currentNoteIndex: Index of the current note being played.
 *    rhythmTimes: Array of timestamps for each note in the rhythm.
 *    rhythmElements: Array of elements representing the rhythm notes.
 *    countdownText: Text for the countdown before tapping starts.
 *    tapResults: Array of results for each tap (1 for correct, 0 for incorrect).
 *    currentBeat: Current beat in the metronome sequence.
 *    metronomeCursor: Cursor object for controlling metronome playback.
 *    rhythmCursor: Cursor object for controlling rhythm playback.
 *
 * methods:
 *    play(): Starts the exercise and metronome.
 *    startMetronome(): Begins metronome playback.
 *    playExample(): Plays the example rhythm.
 *    reset(): Resets the exercise and clears any visual feedback.
 *    tap(): Handles user taps, validating timing accuracy.
 *    finish(): Finalizes the exercise, evaluates user performance, and updates instructions.
 *    handleKeyPress(event): Listens for spacebar presses to trigger tap actions.
 *    clearRhythmFill(): Clears visual feedback from previous taps.
 *
 */

export default defineComponent({
    name: 'TapAlong2',
    props: {
        translator: {
            type: Translator,
            required: true,
        },
        rhythm: {
            type: Object as PropType<Music>,
            required: true,
        },
        progressKeys: {
            type: Object as PropType<ProgressInfo>,
            required: true,
        },
        description: {
            type: String,
            default: '',
        },
    },
    components: {
        MusicNotation,
    },
    data() {
        return {
            isTest: false,
            playing: false,
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
            currentNoteIndex: 0,
            rhythmTimes: [],
            rhythmElements: [],
            countdownText: '',
            tapResults: [],
            currentBeat: 0,
            metronomeCursor: {
                onStart: this.onMetronomeStart.bind(this),
                onEvent: this.onMetronomeEvent.bind(this),
                onFinished: this.onMetronomeFinished.bind(this),
            } as Cursor,
            rhythmCursor: {
                onStart: this.onExampleStart.bind(this),
                onEvent: this.onExampleEvent.bind(this),
                onFinished: this.onExampleFinished.bind(this),
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
        onMetronomeStart() {
            console.log('Playback started')
            this.currentBeat = 0
            this.tapResults = []
            this.rhythmTimes = []
            this.rhythmElements = []
        },
        onMetronomeEvent() {
            if (!this.playing) return
            this.currentBeat += 1
            if (this.currentBeat == 5) {
                // Play example
                console.log('Playing example rhythm...')
                this.playExample()
                this.instructionsText = this.translator.get(
                    'general',
                    'tapAlong',
                    'instructions',
                    'rhythm'
                )
            }
            if (this.currentBeat == 9) {
                // Prep for tapping
                console.log('Prepping for tapping...')
                this.instructionsText = this.translator.get(
                    'general',
                    'tapAlong',
                    'instructions',
                    'prep'
                )
                this.countdownText = '4'
            }
            if (this.currentBeat == 10) {
                this.countdownText = '3'
            }
            if (this.currentBeat == 11) {
                this.countdownText = '2'
            }
            if (this.currentBeat == 12) {
                this.countdownText = '1'
            }
            if (this.currentBeat == 13) {
                // Allow tapping
                console.log('Allowing tapping...')
                this.startTime = Date.now()
                this.currentNoteIndex = 0
                this.canTap = true
                this.countdownText = ''
                this.instructionsText = this.translator.get(
                    'general',
                    'tapAlong',
                    'instructions',
                    'go'
                )
            }
        },
        onMetronomeFinished() {
            if (this.canTap) this.finish()
        },
        // -------------------------

        // --- Example Cursor functions ---
        onExampleStart() {
            console.log('Example started')
        },
        onExampleEvent(event: any) {
            if (event && event.elements) {
                // Remove previous highlights
                document
                    .querySelectorAll(
                        '.abcjs-note_played, .abcjs-note_selected'
                    )
                    .forEach((el: SVGElement) => {
                        el.classList.remove(
                            'abcjs-note_played',
                            'abcjs-note_selected'
                        )
                        el.removeAttribute('fill')
                    })

                // Apply highlight to current note
                event.elements.forEach((el: SVGElement) => {
                    el[0].classList.add('abcjs-note_played')
                    this.rhythmElements.push(el)
                })
                // Store the time of the note
                this.rhythmTimes.push(event.milliseconds)
            }
        },
        onExampleFinished() {
            console.log('Example finished')
            document
                .querySelectorAll(
                    '.abcjs-note_played, .abcjs-note_correct, .abcjs-note_incorrect'
                )
                .forEach((el: SVGElement) => {
                    el.classList.remove(
                        'abcjs-note_played',
                        'abcjs-note_correct',
                        'abcjs-note_incorrect'
                    )
                    el.removeAttribute('fill')
                })
        },
        // -------------------------

        async play() {
            this.clearRhythmFill()
            this.playing = true
            this.playButtonText = this.translator.get(
                'general',
                'tapAlong',
                'reset'
            )
            await this.startMetronome()
        },

        async startMetronome() {
            console.log('Playing metronome...')
            if (this.$refs.metronomeMusicNotation) {
                this.instructionsText = this.translator.get(
                    'general',
                    'tapAlong',
                    'instructions',
                    'beat'
                )
                await (this.$refs.metronomeMusicNotation as any).playPause()
            } else {
                console.error(
                    'MetronomeMusicNotation component is not available'
                )
            }
        },

        async playExample() {
            if (this.$refs.rhythmMusicNotation) {
                await (this.$refs.rhythmMusicNotation as any).playPause()
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
            this.countdownText = ''
            // Reseting music notations
            if (this.$refs.metronomeMusicNotation) {
                ;(this.$refs.metronomeMusicNotation as any).restart()
            } else {
                console.error('MetronomeMusicNotation component not available')
            }
            if (this.$refs.rhythmMusicNotation) {
                ;(this.$refs.rhythmMusicNotation as any).restart()
            } else {
                console.error('RhythmMusicNotation component not available')
            }
            this.clearRhythmFill()
            this.saveProgress(false)
            this.isDone = this.isComponentDone()
        },

        tap(currentTapTime = Date.now() - this.startTime) {
            if (!this.canTap || !this.playing) return

            const expectedTime = this.rhythmTimes[this.currentNoteIndex]
            const difference = Math.abs(currentTapTime - expectedTime)
            console.log('Difference:', difference)

            // Check if the tap is within tolerance range
            if (difference <= this.tolerance) {
                this.tapResults.push(1)
                this.rhythmElements[this.currentNoteIndex][0].classList.add(
                    'abcjs-note_correct'
                )
                console.log('Correct tap!')
            } else {
                this.tapResults.push(0)
                this.rhythmElements[this.currentNoteIndex][0].classList.add(
                    'abcjs-note_incorrect'
                )
                console.log('Incorrect tap')
            }

            // Move to the next note
            this.currentNoteIndex++

            // Check if there are more notes to tap for
            console.log(this.rhythmTimes.length)
            if (
                this.currentNoteIndex >= this.rhythmTimes.length &&
                !this.isTest
            ) {
                this.finish()
            }
        },

        clearRhythmFill() {
            for (let i = 0; i < this.rhythmElements.length; i++) {
                this.rhythmElements[i][0].classList.remove(
                    'abcjs-note_played',
                    'abcjs-note_correct',
                    'abcjs-note_incorrect'
                )
                this.rhythmElements[i][0].removeAttribute('fill')
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
            if (this.$refs.metronomeMusicNotation) {
                ;(this.$refs.metronomeMusicNotation as any).restart()
            } else {
                console.error('MetronomeMusicNotation component not available')
            }
            console.log('Tapping session complete!')
            this.playing = false
            this.playButtonText = this.translator.get(
                'general',
                'tapAlong',
                'play'
            )
            this.canTap = false
            console.log('Final tap results:', this.tapResults)
            if (this.tapResults.length == 0) {
                this.instructionsText = this.translator.get(
                    'general',
                    'tapAlong',
                    'instructions',
                    'noTaps'
                )
                return
            }
            if (this.tapResults.length != this.rhythmTimes.length) {
                let part_1 = this.translator.get(
                    'general',
                    'tapAlong',
                    'instructions',
                    'incomplete_part_1'
                )
                let part_2 = this.translator.get(
                    'general',
                    'tapAlong',
                    'instructions',
                    'incomplete_part_2'
                )
                let part_3 = this.translator.get(
                    'general',
                    'tapAlong',
                    'instructions',
                    'incomplete_part_3'
                )
                this.instructionsText =
                    part_1 +
                    this.tapResults.length +
                    part_2 +
                    this.rhythmTimes.length +
                    part_3
                return
            }
            let totalCorrect = 0
            for (let i = 0; i < this.tapResults.length; i++) {
                totalCorrect += this.tapResults[i]
            }
            if (totalCorrect < this.rhythmTimes.length / 2) {
                this.instructionsText = this.translator.get(
                    'general',
                    'tapAlong',
                    'instructions',
                    'failed'
                )
            } else if (totalCorrect < this.rhythmTimes.length) {
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
                this.saveProgress(true)
                this.isDone = this.isComponentDone()
            }
        },
    },

    setup(props) {
        // Set up progress logic
        const { saveProgress, getProgress, isComponentDone } = progress(
            props.progressKeys
        )
        const isDone = isComponentDone()
        // Set up Metronome
        if (!props.rhythm) {
            throw new Error('rhythm prop is required')
        }
        if (!props.rhythm.treble || props.rhythm.treble.length === 0) {
            throw new Error('rhythm prop must contain a treble part')
        }
        const beatGroups = props.rhythm.treble[0].split('|').length
        const metronomeTreble = Array(beatGroups * 4)
            .fill('CCCC')
            .join('|')

        console.log('metronomeTreble', metronomeTreble)
        const metronome = {
            title: 'Metronome',
            meter: props.rhythm.meter,
            tempo: props.rhythm.tempo,
            beat: props.rhythm.beat,
            treble: [metronomeTreble],
            instrument: 115,
        }
        return { metronome, saveProgress, getProgress, isComponentDone }
    },
})
</script>

<template>
    <h1>{{ translator.get('general', 'tapAlong', 'title') }}</h1>
    <p>{{ description }}</p>
    <div>
        <div class="music-notation-container">
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
                :music="rhythm"
                :displayMidiPlayer="false"
                displaySheetMusic
                :cursor="rhythmCursor"
                :translator="translator"
            ></MusicNotation>
        </div>
        <div class="header-container">
            <h3>{{ instructionsText }}</h3>
            <h3>{{ countdownText }}</h3>
        </div>
        <div class="button-container">
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
        </div>
    </div>
</template>

<style scoped>
.header-container {
    display: flex;
    gap: 10px;
    align-items: center;
}

p {
    margin: 0;
    padding: 0;
}

.centered-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.music-notation-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding-bottom: 10px;
}

.button-container {
    display: flex;
    gap: 10px;
    width: 100%;
    justify-content: left;
}

button {
    flex: 1;
    font-size: 20px;
    padding: 16px;
    height: 60px;
    border-radius: 8px;
    border: none;
    transition: background-color 0.2s ease-in-out;
    max-width: 200px;
}
</style>
