<script lang="ts">
import { defineComponent, PropType } from 'vue'
import abcjs from 'abcjs'
import { Music } from '../models/music'
import 'abcjs/abcjs-audio.css'

export default defineComponent({
    name: 'MusicNotation',
    props: {
        music: Object as PropType<Music>,
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
                                notation += `w:${this.music.verses[verse][measure]}\n`
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
        const tuneArray: abcjs.TuneObjectArray = abcjs.renderAbc(
            this.$refs.notationContainer,
            this.constructNotation(),
            { selectionColor: '#2694cf', responsive: 'resize' }
        )

        const visualObj: abcjs.TuneObject = tuneArray[0]
        const synthControl: abcjs.SynthObjectController =
            new abcjs.synth.SynthController()
        synthControl.load('#midi-player', null, {
            displayLoop: true,
            displayRestart: true,
            displayPlay: true,
            displayProgress: true,
        })
        try {
            const midiBuffer: abcjs.MidiBuffer = new abcjs.synth.CreateSynth()
            midiBuffer
                .init({
                    visualObj,
                })
                .then(() => {
                    if (visualObj) synthControl.setTune(visualObj, false)
                })
        } catch (e) {
            console.error('An error occurred:', e)
        }
    },
})
</script>

<template>
    <div class="container">
        <div ref="notationContainer"></div>
        <div id="midi-player"></div>
    </div>
</template>

<style scoped></style>
