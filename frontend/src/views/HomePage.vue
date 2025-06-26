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

    <div class="extension d-flex">
        <div class="col-6 me-2">
            <div class="section map">Map View</div>
        </div>

        <div class="col-6 row">
            <div class="count d-flex mb-3">
                <div class="col-6 section count__people">
                    <span class="count__title">People</span>
                    <div class="count__number">
                        0
                    </div>
                </div>
                <div class="col-6 section count__vehicle mx-3">
                    <span class="count__title">Vehicle</span>
                    <div class="count__number">
                        0
                    </div>
                </div>
            </div>

            <div class="sensor d-flex">
                <div class="col-6 section sensor__temp">Temperature</div>
                <div class="col-6 section sensor__humidity mx-3">Humidity</div>
            </div>
        </div>
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

.map {
    height: 415px;
}

.count__people,
.count__vehicle{
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.count__title{
    font-weight: 600;
    font-size: 30px;
    padding: 10px 10px 5px;
}

.count__number{
    font-weight: 600;
    font-size: 60px;
    margin-top: 10px;
}
</style>
