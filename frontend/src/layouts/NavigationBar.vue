<script setup>
// Không cần logic setup lúc này
</script>

<template>
    <div class="col-1 sidebar">
        <nav class="nav">
            <div class="top-nav">
                <RouterLink
                    style="text-decoration: none; color: white; display:flex; justify-content:flex-start; align-items: center;"
                    class="nav-item" to="/user">
                    <i class="bi bi-person-circle" style="font-size: 2rem; margin-right: 10px;"></i>
                    User
                </RouterLink>
                <RouterLink
                    style="text-decoration: none; color: white; display:flex; justify-content:flex-start; align-items: center;"
                    class="nav-item" to="/">
                    <i class="bi bi-house" style="font-size: 2rem; margin-right: 10px;"></i>
                    Home
                </RouterLink>
                <RouterLink
                    style="text-decoration: none; color: white; display:flex; justify-content:flex-start; align-items: center;"
                    class="nav-item" to="/database">
                    <i class="bi bi-database" style="font-size: 2rem; margin-right: 10px;"></i>
                    Database
                </RouterLink>
                <RouterLink
                    style="text-decoration: none; color: white; display:flex; justify-content:flex-start; align-items: center;"
                    class="nav-item" to="/devices">
                    <i class="bi bi-camera-video" style="font-size: 2rem; margin-right: 10px;"></i>
                    Devices
                </RouterLink>
            </div>

            <div class="bottom">
                <RouterLink
                    style="text-decoration: none; color: white; display:flex; justify-content:flex-start; align-items: center;"
                    class="nav-item" to="/message">
                    <i class="bi bi-chat-dots" style="font-size: 2rem; margin-right: 10px;"></i>
                    Message
                </RouterLink>
                <RouterLink
                    style="text-decoration: none; color: white; display:flex; justify-content:flex-start; align-items: center;"
                    class="nav-item" to="/upload">
                    <i class="bi bi-cloud-upload" style="font-size: 2rem; margin-right: 10px;"></i>
                    Upload
                </RouterLink>
                <RouterLink
                    style="text-decoration: none; color: white; display:flex; justify-content:flex-start; align-items: center;"
                    class="nav-item" to="/download">
                    <i class="bi bi-cloud-download" style="font-size: 2rem; margin-right: 10px;"></i>
                    Download
                </RouterLink>
                <RouterLink
                    style="text-decoration: none; color: white; display:flex; justify-content:flex-start; align-items: center;"
                    class="nav-item nav-item-bottom" to="/setting">
                    <i class="bi bi-gear" style="font-size: 2rem; margin-right: 10px;"></i>
                    Setting
                </RouterLink>
            </div>
        </nav>
    </div>
</template>

<style scoped>
.sidebar {
    background: var(--bg-secondary-color);
    color: var(--text-light-color);
    height: 100vh;
    padding: 20px 10px;
    border-radius: 5px;
}

.nav {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.nav-item {
    margin-bottom: 10px;
    padding: 0;
}

.nav-item-bottom {
    margin: 0;
}

.top-nav {
    align-items: flex-start;
    flex: 1;
}

.bottom-nav {
    align-items: flex-end;

}
</style>
