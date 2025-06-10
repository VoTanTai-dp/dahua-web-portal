<script setup>
import NavigationBar from './NavigationBar.vue';

</script>

<template>
    <div class="d-flex justify-content-center">
        <div class="row col-12">
            <!-- Sidebar -->
            <div class="left-nav col-sm-1 col-md-2 justify-content-center">
                <navigation-bar></navigation-bar>
            </div>

            <!-- Main content -->
            <div class="main col-12 col-sm-11 col-md-10 justify-content-center">
                <RouterView />
            </div>
        </div>
    </div>
</template>

<style scoped>
.left-nav{
    padding: 0;
}

.main{
    padding: 0;
}
</style>