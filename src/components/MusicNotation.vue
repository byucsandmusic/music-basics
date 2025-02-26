<script lang="ts">
import { defineComponent, PropType } from 'vue'
import abcjs from 'abcjs'
import { Music } from '../models/types'
import 'abcjs/abcjs-audio.css'
import Translator from '../models/translator'
import { Cursor } from '../models/types'

export default defineComponent({
    name: 'MusicNotation',
    props: {
        music: {
            type: Object as PropType<Music>,
            required: true,
        },
        clickToPlay: {
            type: Boolean,
            default: false,
        },
        /**
         * @description A cursor object based on https://paulrosen.github.io/abcjs/audio/synthesized-sound.html#cursorcontrol-object
         * used to control specific playback functions: onStart, onBeat, onFinished, and onEvent. If you pass in this prop you overwrite the default
         * functionality of the cursor, which allows you to have fine-tuned control over playback.
         */
        cursor: {
            type: Object as PropType<Cursor>,
            default: {
                onStart: () => {
                    console.log('Playback started')
                },
                onEvent: (event: any) => {
                    console.log(event)
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
                        })
                    }
                },
                onFinished: () => {
                    console.log('Playback finished')
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
                },
            },
        },
        displaySheetMusic: {
            type: Boolean,
            default: true,
        },
        displayMidiPlayer: {
            type: Boolean,
            default: false,
        },
        midiOnTop: {
            type: Boolean,
            default: false,
        },
        highlightColor: {
            type: String,
            default: '#ff9d00',
        },
        translator: {
            type: Translator,
            required: true,
        },
    },
    data() {
        return {
            midiBuffer: undefined as abcjs.MidiBuffer | undefined,
            synthControl: undefined as abcjs.SynthObjectController | undefined,
        }
    },
    methods: {
        constructNotation() {
            let notation: string = ''
            if (this.music.instrument)
                notation += `%%MIDI program ${this.music.instrument}\n`
            if (this.music.title) notation += `T:${this.music.title}\n`
            if (this.music.meter) notation += `M:${this.music.meter}\n`
            if (this.music.beat) notation += `L:${this.music.beat}\n`
            if (this.music.tempo) notation += `Q:${this.music.tempo}\n`
            if (this.music.key) notation += `K:${this.music.key}\n`
            if (this.music.treble?.length || this.music.bass?.length) {
                for (
                    let measure = 0;
                    measure <
                    Math.max(
                        this.music.treble?.length || 0,
                        this.music.bass?.length || 0
                    );
                    measure++
                ) {
                    if (this.music.treble?.length > measure) {
                        notation += `V:1\n${this.music.treble[measure]}\n`
                    } else if (this.music.bass?.length > measure) {
                        notation += `V:1 clef=bass\n${this.music.bass[measure]}\n`
                    }
                    if (this.music.verses?.length) {
                        for (
                            let verse = 0;
                            verse < this.music.verses.length;
                            verse++
                        ) {
                            if (this.music.verses[verse].length > measure) {
                                const verseCount =
                                    this.music.verses.length > 1 &&
                                    measure === 0
                                        ? `${verse + 1}.~`
                                        : ''
                                notation += `w:${verseCount}${this.music.verses[verse][measure]}\n`
                            }
                        }
                    }
                    if (
                        this.music.treble?.length > measure &&
                        this.music.bass?.length > measure
                    )
                        notation += `V:2 clef=bass\n${this.music.bass[measure]}\n`
                }
            }
            return notation
        },
        clickListener(abcElem) {
            console.log(typeof abcElem)
            if (this.midiBuffer && this.synthControl) {
                this.midiBuffer.seek(abcElem?.currentTrackMilliseconds)

                if (this.clickToPlay) {
                    const lastClicked = abcElem.midiPitches
                    if (!lastClicked) return

                    abcjs.synth
                        .playEvent(
                            lastClicked,
                            abcElem.midiGraceNotePitches,
                            this.synthControl.visualObj.millisecondsPerMeasure()
                        )
                        .then(function (response) {
                            console.log('note played')
                        })
                        .catch(function (error) {
                            console.log('error playing note', error)
                        })
                }
            }
        },
        async playPause() {
            await this.synthControl.play()
        },
        async restart() {
            if (this.synthControl.isStarted) {
                await this.synthControl.play()
            }
            await this.synthControl.restart()
        },
    },
    mounted() {
        try {
            const tuneArray: abcjs.TuneObjectArray = abcjs.renderAbc(
                this.$refs.notationContainer,
                this.constructNotation(),
                {
                    selectionColor: this.highlightColor,
                    responsive: 'resize',
                    add_classes: true,
                    clickListener: this.clickListener,
                }
            )

            if (tuneArray.length > 0) {
                const visualObj: abcjs.TuneObject = tuneArray[0]
                this.synthControl = new abcjs.synth.SynthController()

                this.synthControl.load('#midi-player', this.cursor, {
                    displayLoop: true,
                    displayRestart: true,
                    displayPlay: true,
                    displayProgress: true,
                })
                this.midiBuffer = new abcjs.synth.CreateSynth()
                this.midiBuffer
                    .init({
                        visualObj,
                    })
                    .then(() => {
                        if (visualObj)
                            this.synthControl.setTune(visualObj, false)
                    })
            }
        } catch (err) {
            this.$refs.midiPlayer.innerText = this.translator.get(
                'general',
                'musicNotation',
                'error',
                'midiPlayer'
            )
        }
    },
})
</script>

<template>
    <div class="container">
        <div
            v-if="midiOnTop"
            :hidden="!displayMidiPlayer"
            ref="midiPlayer"
            id="midi-player"
        ></div>
        <div
            :hidden="!displaySheetMusic"
            ref="notationContainer"
        ></div>
        <div
            v-if="!midiOnTop"
            :hidden="!displayMidiPlayer"
            ref="midiPlayer"
            id="midi-player"
        ></div>
    </div>
</template>

<style lang="sass">
.abcjs-note_played
    fill: v-bind(highlightColor)

.abcjs-inline-audio
    height: 100%

.abcjs-inline-audio .abcjs-btn
    display: flex
    align-items: center
    height: 100%
    margin-bottom: 0
</style>
