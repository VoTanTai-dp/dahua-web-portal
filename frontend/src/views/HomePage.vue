<script setup>
import { ref, onMounted, watch } from 'vue'
import { streamStore } from '../stores/streamStore'

const canvas = ref(null)

function attachStream(ws) {
    if (!ws) {
        console.warn('Chưa có stream WebSocket.')
        return
    }

    const ctx = canvas.value.getContext('2d')

    ws.onmessage = (event) => {
        const message = JSON.parse(event.data)
        if (message.type === 'frame') {
            const img = new Image()
            img.crossOrigin = "Anonymous"
            img.onload = function () {
                ctx.drawImage(img, 0, 0, canvas.value.width, canvas.value.height)
            }
            img.src = 'data:image/jpeg;base64,' + message.data
        }
    }

    console.log('Stream attached vào canvas.')
}

onMounted(() => {
    if (streamStore.ws) {
        attachStream(streamStore.ws)
    }

    watch(
        () => streamStore.ws,
        (ws) => {
            if (ws) {
                attachStream(ws)
            }
        }
    )
})
</script>

<template>
    <div class="section camera mb-3 d-flex flex-column align-items-center justify-content-start">
        <canvas ref="canvas" width="1390" height="700" style="border-radius: 5px;"></canvas>
    </div>
</template>

<style scoped>
.section {
    background: var(--bg-secondary-color);
    color: var(--text-light-color);
    height: 200px;
    display: flex;
    font-weight: bold;
    border-radius: 5px;
}

.camera {
    height: 700px;
    background-image: url('../assets/pics/no-signal.png');
    background-size: 100%;
    background-repeat: no-repeat;
}
</style>
