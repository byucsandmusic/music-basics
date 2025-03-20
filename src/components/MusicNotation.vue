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
            default: () => {
                return {
                    onEvent: (event: any) => {
                        if (event && event.elements) {
                            // Remove previous highlights
                            document
                                .querySelectorAll('.abcjs-note_played, .abcjs-note_selected')
                                .forEach((el: SVGElement) => {
                                    el.classList.remove('abcjs-note_played', 'abcjs-note_selected')
                                    el.removeAttribute('fill')
                                })

                            // Apply highlight to current note
                            event.elements.forEach((el: SVGElement) => {
                                el[0].classList.add('abcjs-note_played')
                            })
                        }
                    },
                }
            },
        },
        displaySheetMusic: {
            type: Boolean,
            default: true,
        },
        fitToPage: {
            type: Boolean,
            default: false,
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
        correctColor: {
            type: String,
            default: '#00ff00',
        },
        incorrectColor: {
            type: String,
            default: '#ff0000',
        },
    },
    emits: ['lyric-clicked'],
    data() {
        return {
            midiBuffer: undefined as abcjs.MidiBuffer | undefined,
            synthControl: undefined as abcjs.SynthObjectController | undefined,
            isPlaying: false,
        }
    },
    methods: {
        constructNotation() {
            let notation: string = ''
            if (this.music.instrument) notation += `%%MIDI program ${this.music.instrument}\n`
            if (this.music.title) notation += `T:${this.music.title}\n`
            if (this.music.meter) notation += `M:${this.music.meter}\n`
            if (this.music.beat) notation += `L:${this.music.beat}\n`
            if (this.music.tempo) notation += `Q:${this.music.tempo}\n`
            if (this.music.key) notation += `K:${this.music.key}\n`
            if (this.music.treble?.length || this.music.bass?.length) {
                for (
                    let measure = 0;
                    measure < Math.max(this.music.treble?.length || 0, this.music.bass?.length || 0);
                    measure++
                ) {
                    if (this.music.treble?.length > measure) {
                        notation += `V:1\n${this.music.treble[measure]}\n`
                    } else if (this.music.bass?.length > measure) {
                        notation += `V:1 clef=bass\n${this.music.bass[measure]}\n`
                    }
                    if (this.music.verses?.length) {
                        for (let verse = 0; verse < this.music.verses.length; verse++) {
                            if (this.music.verses[verse].length > measure) {
                                const verseCount = this.music.verses.length > 1 && measure === 0 ? `${verse + 1}.~` : ''
                                notation += `w:${verseCount}${this.music.verses[verse][measure]}\n`
                            }
                        }
                    }
                    if (this.music.treble?.length > measure && this.music.bass?.length > measure)
                        notation += `V:2 clef=bass\n${this.music.bass[measure]}\n`
                }
            }
            return notation
        },
        clickListener(abcElem) {
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
            this.isPlaying = this.synthControl.isStarted
        },
        async restart() {
            if (this.synthControl.isStarted) {
                await this.synthControl.play()
            }
            await this.synthControl.restart()
            document.querySelectorAll('.abcjs-note_played, .abcjs-note_selected').forEach((el: SVGElement) => {
                el.classList.remove('abcjs-note_played', 'abcjs-note_selected')
                el.removeAttribute('fill')
            })
            if (this.cursor.verse !== undefined) {
                this.cursor.verse = 0
                const lyrics = document.querySelectorAll('.abcjs-lyric')
                lyrics.forEach((lyric) => {
                    for (let i = 0; i < lyric.children.length; i++) {
                        lyric.children[i].setAttribute('opacity', '1')
                    }
                })
            }
            this.isPlaying = false
        },
        updateNotationHeight(W: number, H: number) {
            if (this.fitToPage) {
                const nav = document.getElementById('nav-bar')
                const footer = document.getElementById('footer')
                const midi = document.getElementById('midi-player')
                const offsetHeight = (nav?.offsetHeight ?? 0) + (footer?.offsetHeight ?? 0) + (midi?.offsetHeight ?? 0)

                const ratio = W / H

                const h = window.innerHeight - offsetHeight
                const w = h * ratio
                const padding = Math.max(this.$refs.notationPadding.offsetWidth - w, 0) / 2
                this.$refs.notationPadding.style.padding = `0 ${padding}px`
            }
        },
        rotateIcon(icon: HTMLElement, duration: number) {
            const style = icon.getAttribute('style')
            icon.setAttribute('style', `--fa-animation-duration: ${duration / 1000}s`)
            icon.classList.add('fa-spin', 'fa-spin-reverse')
            setTimeout(() => {
                icon.classList.remove('fa-spin', 'fa-spin-reverse')
                if (style) icon.setAttribute('style', style)
                else icon.removeAttribute('style')
            }, duration)
        },
    },
    mounted() {
        if (this.cursor.onStart === undefined && this.cursor.onFinished === undefined) {
            this.cursor.verse = 0
            this.cursor.onStart = () => {
                console.log(`Starting verse ${this.cursor.verse + 1}`)
                const lyrics = document.querySelectorAll('.abcjs-lyric')
                lyrics.forEach((lyric) => {
                    for (let i = 0; i < lyric.children.length; i++) {
                        if (
                            i !== this.cursor.verse &&
                            lyric.children.length - 1 > this.cursor.verse // This is to make sure that if we are on the chorus it is still highlighted
                        ) {
                            lyric.children[i].setAttribute('opacity', '0.25')
                        } else {
                            lyric.children[i].setAttribute('opacity', '1')
                        }
                    }
                })
            }
            this.cursor.onFinished = async () => {
                console.log(`Finished verse ${this.cursor.verse + 1}`)
                document.querySelectorAll('.abcjs-note_played, .abcjs-note_selected').forEach((el: SVGElement) => {
                    el.classList.remove('abcjs-note_played', 'abcjs-note_selected')
                    el.removeAttribute('fill')
                })

                this.cursor.verse++
                const lyrics = document.querySelectorAll('.abcjs-lyric')
                if (this.cursor.verse === lyrics[0].children.length - 1) {
                    lyrics.forEach((lyric) => {
                        for (let i = 0; i < lyric.children.length; i++) {
                            lyric.children[i].setAttribute('opacity', '1')
                        }
                    })
                    this.cursor.verse = 0
                    this.isPlaying = false
                } else {
                    await this.synthControl.restart()
                    await this.synthControl.play()
                }
            }
        }
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
                    displayLoop: false,
                    displayRestart: false,
                    displayPlay: false,
                    displayProgress: true,
                })
                this.midiBuffer = new abcjs.synth.CreateSynth()
                this.midiBuffer
                    .init({
                        visualObj,
                    })
                    .then(() => {
                        if (visualObj) this.synthControl.setTune(visualObj, false)
                    })

                const lyrics = document.querySelectorAll('.abcjs-lyric')
                lyrics.forEach((lyric) => {
                    for (let i = 0; i < lyric.children.length; i++) {
                        lyric.children[i].addEventListener('click', () => {
                            this.$emit('lyric-clicked', {
                                verse: i,
                                lyric: lyric.children[i].textContent,
                            })
                        })
                    }
                })
            }
        } catch (err) {
            this.$refs.midiPlayer.innerText = this.translator.get('general', 'musicNotation', 'error', 'midiPlayer')
        }

        const W = this.$refs.notationPadding.offsetWidth
        const H = this.$refs.notationPadding.offsetHeight
        this.updateNotationHeight(W, H)
        window.addEventListener('resize', () => {
            this.updateNotationHeight(W, H)
        })
    },
    unmounted() {
        this.restart()
    },
})
</script>

<template>
    <div class="container" ref="notationPadding">
        <div v-if="midiOnTop" :hidden="!displayMidiPlayer" id="midi-container">
            <button @click="playPause" id="play-btn">
                <i class="fa-solid" :class="isPlaying ? 'fa-pause' : 'fa-play'"></i>
            </button>
            <button
                @click="
                    (event) => {
                        restart()
                        const icon =
                            ((event.target as Element).firstElementChild as HTMLElement) ??
                            (event.target as HTMLElement)
                        rotateIcon(icon, 100)
                    }
                "
                id="reset-btn"
            >
                <i class="fa-solid fa-rotate-left"></i>
            </button>
            <div ref="midiPlayer" id="midi-player"></div>
        </div>
        <div :hidden="!displaySheetMusic" ref="notationContainer"></div>
        <div v-if="!midiOnTop" :hidden="!displayMidiPlayer" id="midi-container">
            <button @click="playPause" id="play-btn">
                <i class="fa-solid" :class="isPlaying ? 'fa-pause' : 'fa-play'"></i>
            </button>
            <button
                @click="
                    (event) => {
                        restart()
                        const icon =
                            ((event.target as Element).firstElementChild as HTMLElement) ??
                            (event.target as HTMLElement)
                        rotateIcon(icon, 100)
                    }
                "
                id="reset-btn"
            >
                <i class="fa-solid fa-rotate-left"></i>
            </button>
            <div ref="midiPlayer" id="midi-player"></div>
        </div>
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

.abcjs-note_correct
    fill: v-bind(correctColor)

.abcjs-note_incorrect
    fill: v-bind(incorrectColor)

#midi-container
    display: flex

    #play-btn,
    #reset-btn
        min-height: 100%
        flex: 1
        margin-right: 5px

#midi-player
    width: 100%
    height: auto
    flex: 30
</style>
