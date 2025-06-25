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
        console.log('Received frame:', event.data.byteLength)

        const blob = new Blob([event.data], { type: 'image/jpeg' })
        const url = URL.createObjectURL(blob)
        const img = new Image()
        img.crossOrigin = "Anonymous"  // 👈 thêm dòng này

        img.onload = function () {
            ctx.drawImage(img, 0, 0, canvas.value.width, canvas.value.height)
            URL.revokeObjectURL(url)
        }
        img.src = url
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
                    <div class="count__number"></div>
                </div>
                <div class="col-6 section count__vehicle mx-3">
                    <span class="count__title">Vehicle</span>
                    <div class="count__number"></div>
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
    /* background-image: url('../assets/pics/no-signal.png'); */
    background-size: 100%;
    background-repeat: no-repeat;
}

.map {
    height: 415px;
}

.count__people,
.count__vehicle {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}

.count__title {
    font-size: 30px;
    font-weight: 500;
    padding: 10px 10px 5px;
    margin-bottom: 10px;
}

.count__number {
    font-size: 60px;
    font-weight: 600;
}
</style>
