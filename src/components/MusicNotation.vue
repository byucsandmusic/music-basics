<script lang="ts">
import { defineComponent, PropType } from 'vue'
import abcjs from 'abcjs'
import { Music } from '../models/music'
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
        displayMidiPlayer: Boolean,
        highlightNotes: Boolean,
        highlightColor: String,
        translator: {
            type: Translator,
            required: true,
        },
    },
    methods: {
        constructNotation() {
            let notation: string = ''
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
    },
    mounted() {
        try {
            const tuneArray: abcjs.TuneObjectArray = abcjs.renderAbc(
                this.$refs.notationContainer,
                this.constructNotation(),
                {
                    selectionColor: this.highlightColor || '#2694cf',
                    responsive: 'resize',
                    add_classes: true,
                }
            )

            if (this.displayMidiPlayer && tuneArray.length > 0) {
                const visualObj: abcjs.TuneObject = tuneArray[0]
                const synthControl: abcjs.SynthObjectController =
                    new abcjs.synth.SynthController()

                let cursor: Cursor | null = null
                if (this.highlightNotes) {
                    // Add Note Highlighting During Playback
                    cursor = {
                        onStart: () => {
                            console.log('Playback started')
                        },
                        onEvent: (event: any) => {
                            if (event && event.elements) {
                                // Remove previous highlights
                                document
                                    .querySelectorAll('.abcjs-note_selected')
                                    .forEach((el: SVGElement) => {
                                        el.classList.remove(
                                            'abcjs-note_selected'
                                        )
                                        el.style.fill = ''
                                    })

                                // Apply highlight to current note
                                event.elements.forEach((el: SVGElement) => {
                                    el[0].classList.add('abcjs-note_selected')
                                    el[0].style.fill =
                                        this.highlightColor || '#2694cf'
                                })
                            }
                        },
                        onFinished: () => {
                            console.log('Playback finished')
                            document
                                .querySelectorAll('.abcjs-note_selected')
                                .forEach((el: SVGElement) => {
                                    el.classList.remove('abcjs-note_selected')
                                    el.style.fill = ''
                                })
                        },
                    }
                }
                synthControl.load('#midi-player', cursor, {
                    displayLoop: true,
                    displayRestart: true,
                    displayPlay: true,
                    displayProgress: true,
                })
                const midiBuffer: abcjs.MidiBuffer =
                    new abcjs.synth.CreateSynth()
                midiBuffer
                    .init({
                        visualObj,
                    })
                    .then(() => {
                        if (visualObj) synthControl.setTune(visualObj, false)
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
        <div ref="notationContainer"></div>
        <div
            ref="midiPlayer"
            id="midi-player"
        ></div>
    </div>
</template>

<style scoped></style>
