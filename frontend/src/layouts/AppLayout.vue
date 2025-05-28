Import
<script setup>
import NavigationBar from './NavigationBar.vue';

</script>

<template>
    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <navigation-bar></navigation-bar>

            <!-- Main content -->
            <div class="col-sm col-11 content">
                <RouterView />
            </div>
        </div>
    </div>
</template>

<style scoped>
.content {
    padding: 20px;
    padding-top: 0;
    padding-bottom: 0;
}
</style>