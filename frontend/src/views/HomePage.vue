<script setup>
// No logic needed yet
</script>

<template>
    <!-- Main -->
    <div class="section cam-view mb-3">Camera View</div>

    <div class="extension d-flex">
        <div class="col-6 map me-3">
            <div class="section map-view">Map View</div>
        </div>
    
        <div class="col-6">
            <div class="count d-flex mb-3">
                <div class="col-6 section person-count me-3">Person Count</div>
                <div class="col-6 section vehicle-count">Vehicle Count</div>
            </div>
    
            <div class="sensor d-flex">
                <div class="col-6 section temp-info me-3">Temperature</div>
                <div class="col-6 section humidity-info">Humidity</div>
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

/* .cam-view {
    height: 500px;
    padding: 0;
}

.map {
    padding-left: 0;
    padding-right: 0;
    margin-right: 20px;
}

.map-view {
    height: 420px;
}

.left-view {
    margin-right: 20px;
}

.person-count,
.vehicle-count,
.temp-info,
.humidity-info,
.device-info {
    height: 200px;
    padding: 0;
} */
</style>
