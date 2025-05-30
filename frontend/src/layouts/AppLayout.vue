Import
<script setup>
import NavigationBar from './NavigationBar.vue';

</script>

<template>
    <div class="d-flex justify-content-center">
        <div class="row col-12">
            <!-- Sidebar -->
            <div class="col-sm-1 col-md-2 justify-content-center">
                <navigation-bar></navigation-bar>
            </div>

            <!-- Main content -->
            <div class="col-12 col-sm-11 col-md-10 justify-content-center">
                <RouterView />
            </div>
        </div>
    </div>
</template>
