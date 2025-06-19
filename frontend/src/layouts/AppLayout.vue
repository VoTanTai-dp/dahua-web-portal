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

function connectStream() {
    if (streamStore.ws) {
        console.warn('⚠️ Đã có WebSocket active. Ngắt trước khi connect mới.')
        disconnectStream()
    }

    fetch('http://localhost:3000/api/start-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username.value,
            password: password.value,
            ip: ip.value,
            port: port.value
        })
    })
        .then(() => {
            console.log('Đã khởi động stream WebSocket.')

            // Tạo WebSocket mới và lưu vào store
            streamStore.ws = new WebSocket('ws://localhost:9999')
            streamStore.ws.binaryType = 'arraybuffer'

            streamStore.ws.onopen = () => console.log('WebSocket connected')
            streamStore.ws.onerror = (err) => console.error('WebSocket error', err)

            router.push('/')
        })
        .catch(err => console.error('Connect error', err))
}

function disconnectStream() {
    if (streamStore.ws) {
        streamStore.ws.close()
        streamStore.ws = null
        console.log('Client WebSocket closed.')
    }

    fetch('http://localhost:3000/api/stop-stream', { method: 'POST' })
        .then(() => console.log('Backend stream stopped.'))
        .catch(err => console.error('Stop stream error', err))

    // Clear canvas và revoke image memory nếu có
    const canvas = document.querySelector('canvas')
    if (canvas) {
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        console.log('Canvas cleared.')
    }
}
</script>


<template>
    <div class="authentication d-flex">
        <input v-model="username" class="auth--item" type="text" placeholder="Username" />
        <input v-model="password" class="auth--item" type="password" placeholder="Password" />
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
