<script setup>
import NavigationBar from './NavigationBar.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { streamStore } from '../stores/streamStore'

const router = useRouter()

const username = ref('')
const password = ref('')
const ip = ref('')
const port = ref('')

async function connectStream() {
    try {
        if (streamStore.ws) {
            console.warn('>>>>>>>>>> WebSocket already active. Terminate before new connection')
            await disconnectStream()
        }

        const response = await fetch('http://localhost:3000/api/start-stream', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username.value,
                password: password.value,
                ip: ip.value,
                port: port.value
            })
        })

        if (!response.ok) throw new Error('>>>>>>>>>> Start stream failed')

        console.log('WebSocket stream started')

        // MJPEG stream WebSocket
        streamStore.ws = new WebSocket('ws://localhost:9999')
        streamStore.ws.binaryType = 'arraybuffer'
        streamStore.ws.onopen = () => console.log('WebSocket stream connected')
        streamStore.ws.onerror = (err) => console.error('>>>>>>>>>> WebSocket stream error', err)

        // Count WebSocket
        streamStore.countWs = new WebSocket('ws://localhost:9998')
        streamStore.countWs.onopen = () => console.log('Count WebSocket connected')
        streamStore.countWs.onerror = (err) => console.error('>>>>>>>>>> Count WebSocket error', err)

        // Sensor WebSocket
        streamStore.sensorWs = new WebSocket('ws://localhost:9997')
        streamStore.sensorWs.onopen = () => console.log('Sensor WebSocket connected')
        streamStore.sensorWs.onerror = (err) => console.error('>>>>>>>>>> Sensor WebSocket error', err)

        router.push('/')
    } catch (err) {
        console.error('>>>>>>>>>> Connect error', err)
    }
}

async function disconnectStream() {
    try {
        if (streamStore.ws) {
            streamStore.ws.close()
            streamStore.ws = null
            console.log('Stream WebSocket closed')
        }
        if (streamStore.countWs) {
            streamStore.countWs.close()
            streamStore.countWs = null
            console.log('Count WebSocket closed')
        }
        if (streamStore.sensorWs) {
            streamStore.sensorWs.close()
            streamStore.sensorWs = null
            console.log('Sensor WebSocket closed')
        }

        const response = await fetch('http://localhost:3000/api/stop-stream', { method: 'POST' })
        if (!response.ok) throw new Error('>>>>>>>>>> Stop stream failed.')

        console.log('Backend stream stopped')

        const canvasEl = document.querySelector('canvas')
        if (canvasEl) {
            const ctx = canvasEl.getContext('2d')
            ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
            console.log('Canvas cleared')
        }

        // Emit event để các view reset lại state
        window.dispatchEvent(new Event('app-disconnected'))

    } catch (err) {
        console.error('>>>>>>>>>> Disconnect error', err)
    }
}
</script>

<template>
    <div class="authentication d-flex">
        <input v-model="username" class="auth--item" type="text" placeholder="Username" />
        <input v-model="password" class="auth--item" type="text" placeholder="Password" />
        <input v-model="ip" class="auth--item" type="text" placeholder="IP" />
        <input v-model="port" class="auth--item" type="text" placeholder="Port" />
        <button class="auth--item btn" @click="connectStream">Connect</button>
        <button class="auth--item btn-disable" @click="disconnectStream">Disconnect</button>
    </div>

    <div class="d-flex justify-content-center">
        <div class="row col-12">
            <div class="left-nav col-sm-1 col-md-2 justify-content-center">
                <navigation-bar></navigation-bar>
            </div>
            <div class="main col-12 col-sm-11 col-md-10 justify-content-center">
                <RouterView />
            </div>
        </div>
    </div>
</template>

<style scoped>
.left-nav {
    padding: 0;
}

.main {
    padding: 0;
}

.authentication {
    margin-bottom: 20px;
}

.auth--item {
    margin-right: 10px;
}
</style>
