<script setup>
import { ref, onMounted } from 'vue'

const canvas = ref(null)

onMounted(() => {
  const ctx = canvas.value.getContext('2d')
  const ws = new WebSocket('ws://localhost:9999')

  ws.binaryType = 'arraybuffer'

  ws.onopen = () => console.log('WebSocket connected')
  ws.onerror = (err) => console.error('WebSocket error', err)

  ws.onmessage = (event) => {
    const blob = new Blob([event.data], { type: 'image/jpeg' })
    const url = URL.createObjectURL(blob)
    const img = new Image()
    img.onload = function () {
      ctx.drawImage(img, 0, 0, canvas.value.width, canvas.value.height)
      URL.revokeObjectURL(url)
    }
    img.src = url
  }
})
</script>

<template>
    <!-- Main -->
    <div class="section camera mb-3 d-flex flex-column align-items-center justify-content-start">
        <canvas ref="canvas" width="1390" height="700" ></canvas>
    </div>

    <div class="extension d-flex">
        <div class="col-6 me-2">
            <div class="section map">Map View</div>
        </div>

        <div class="col-6 row">
            <div class="count d-flex mb-3">
                <div class="col-6 section count__person">Person Count</div>
                <div class="col-6 section count__vehicle mx-3">Vehicle Count</div>
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
    background: #e9ecef;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    /* border: 1px solid #ccc; */
}

.camera {
    height: 700px;
}

.map {
    height: 415px;
}
</style>
