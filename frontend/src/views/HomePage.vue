<script setup>
import { ref, onMounted, watch } from 'vue'
import { streamStore } from '../stores/streamStore'

const canvas = ref(null)
const peopleCount = ref(0)
const vehicleCount = ref(0)

function attachStream(ws) {
    if (!ws) return
    const ctx = canvas.value.getContext('2d')

    ws.onmessage = (event) => {
        const message = JSON.parse(event.data)
        if (message.type === 'frame') {
            const img = new Image()
            img.crossOrigin = 'Anonymous'
            img.onload = () => {
                ctx.drawImage(img, 0, 0, canvas.value.width, canvas.value.height)
            }
            img.src = 'data:image/jpeg;base64,' + message.data
        }
    }
}

function attachCountStream(ws) {
    if (!ws) return
    ws.onmessage = (event) => {
        const message = JSON.parse(event.data)
        if (message.type === 'count') {
            console.log('Count received realtime:', message.data)
            peopleCount.value = message.data.Human
            vehicleCount.value = message.data.Vehicle
        }
    }
}

onMounted(() => {
    if (streamStore.ws) attachStream(streamStore.ws)
    if (streamStore.countWs) attachCountStream(streamStore.countWs)

    watch(() => streamStore.ws, (ws) => { if (ws) attachStream(ws) })
    watch(() => streamStore.countWs, (ws) => { if (ws) attachCountStream(ws) })
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
                    <div class="count__number">{{ peopleCount }}</div>
                </div>
                <div class="col-6 section count__vehicle mx-3">
                    <span class="count__title">Vehicle</span>
                    <div class="count__number">{{ vehicleCount }}</div>
                </div>
            </div>
            <div class="sensor d-flex">
                <div class="col-6 section sensor__temp">
                    <span class="sensor__title">Temperature</span>
                    <div class="sensor__number"></div>
                </div>
                <div class="col-6 section sensor__hum mx-3">
                    <span class="sensor__title">Humidity</span>
                    <div class="sensor__number"></div>
                </div>
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
.count__vehicle,
.sensor__temp,
.sensor__hum{
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.count__title,
.sensor__title{
    font-weight: 600;
    font-size: 30px;
    padding: 10px 10px 5px;
}

.count__number,
.sensor__number{
    font-weight: 600;
    font-size: 60px;
    margin-top: 10px;
}
</style>
