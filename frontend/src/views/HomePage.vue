<script setup>
// No logic needed yet
</script>

<template>
    <!-- Main -->
    <div class="section camera mb-3">Camera View</div>

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

    <!-- </div> -->
</template>

<style scoped>
.section {
    background: #e9ecef;
    /* margin-bottom: 20px; */
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border: 1px solid #ccc;
}

.camera{
    height: 700px;
}

.map{
    height: 415px;
}
</style>
