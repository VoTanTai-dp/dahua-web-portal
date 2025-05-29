Import
<script setup>
import NavigationBar from './NavigationBar.vue';

</script>

<template>
    <div class="d-flex justify-content-center">
        <!-- Sidebar -->
        <div class="col-sm-2 justify-content-center align-items-center">
            <navigation-bar></navigation-bar>
        </div>

        <!-- Main content -->
        <div class="col-sm-10">
            <RouterView />
        </div>
    </div>
</template>
