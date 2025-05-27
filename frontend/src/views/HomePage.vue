<script setup>
// No logic needed yet
</script>

<template>
    <!-- <div class=" full-width-container"> -->
    <div class="row">
        <!-- Main content -->
        <div class="col-sm col-11 content">
            <div class="row">
                <div class=" section cam-view">Camera View</div>
            </div>
            <div class="row">
                <div class="col map">
                    <div class="section map-view">Map View</div>
                </div>

                <div class="col sensor">
                    <div class="row">
                        <div class="col left-view section person-count">Person Count</div>
                        <div class="col section vehicle-count">Vehicle Count</div>
                    </div>

                    <div class="row">
                        <div class="col left-view section temp-info">Temperature</div>
                        <div class="col section humidity-info">Humidity</div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <!-- </div> -->
</template>

<style scoped>
.content {
    margin-left: 20px;
}

.section {
    background: #e9ecef;
    margin-bottom: 20px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border: 1px solid #ccc;
}

.cam-view {
    height: 500px;
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
}
</style>
