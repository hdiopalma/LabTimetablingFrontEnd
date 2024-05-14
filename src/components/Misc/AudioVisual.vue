<script setup>
import { mdiPlay } from '@mdi/js';
import BaseButton from '@/components/BaseButton.vue';
import FormFilePicker from '../FormFilePicker.vue';
import SectionMain from '../SectionMain.vue';
import SectionTitleLineWithButton from '../SectionTitleLineWithButton.vue';
import { render, onMounted, ref } from 'vue';

const defaultAudio = ref('/assets/audio/Monodrama.mp3');
//as file object
const audioFile = ref(null);
const audioSrc = ref(null);

const setupAudioVisualizer = () => {

    const fileInput = document.getElementById("audiofile");
    const audio = document.getElementById("audio");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let analyser;
    let dataArray;
    let barWidth;
    let x;

    const files = fileInput.files;
    // audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audio.play();
    const context = new AudioContext();
    const src = context.createMediaElementSource(audio);
    analyser = context.createAnalyser();

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    barWidth = (canvas.width / bufferLength) * 2.5;
    x = 0;

    renderFrame(analyser, dataArray, barWidth, x);
}

const renderFrame = (analyser, dataArray, barWidth, x) => {

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    function animate() {
        requestAnimationFrame(animate);

        x = 0;

        analyser.getByteFrequencyData(dataArray);

        //transparent background
        // ctx.fillStyle = "#000";
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < dataArray.length; i++) {
            const barHeight = dataArray[i];

            const r = barHeight + 25 * (i / dataArray.length);
            const g = 250 * (i / dataArray.length);
            const b = 50;

            ctx.fillStyle = `rgb(${r},${g},${b})`;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

            x += barWidth + 1;
        }
    }

    animate();
}

const handleFileChange = () => {
    const audio = document.getElementById("audio");
    audio.pause();
    const files = audioFile.value;
    console.log('File:', files);
    audio.src = URL.createObjectURL(files);
    setupAudioVisualizer()
}

const startPlayback = () => {
    const audio = document.getElementById("audio");
    audio.play();
    setupAudioVisualizer();
}

onMounted(() => {
    // audioContextRef = new AudioContext();
})

</script>

<template>
    <div>

        <SectionMain class="relative">
            <FormFilePicker v-model="audioFile" label="Upload" accept="audio/*" id="audiofile"
                @change="handleFileChange" color="danger" class="hidden" />
            <BaseButton @click="startPlayback" target="_blank" :icon="mdiPlay" label="Vibe Mode" color="red"
                rounded-full small />
            
        </SectionMain>

        <div id="audiovisual" class="fixed bottom-0 right-0 w-full">
            <canvas id="canvas" class="bg-transparent">
            </canvas>
            <audio id="audio" :src="defaultAudio" autoplay loop hidden controls>

            </audio>
        </div>
    </div>
</template>

<style>
#audiovisual {
    height: 380px;
    pointer-events: none;
}

#audiofile {
    position: absolute;
    top: 10px;
    left: 10px;
    /* z-index: 100; */
}

#canvas {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /* background-color: transparent; */
}

audio {
    position: absolute;
    left: 10px;
    bottom: 10px;
    width: calc(100% - 20px);
}
</style>