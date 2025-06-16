<script setup>
// Không cần logic setup lúc này
</script>

<template>
    <div class="sidebar overflow-hidden">
        <nav class="nav flex-column h-100">
            <div class="top-nav">
                <RouterLink
                    style="text-decoration: none; color: white; display:flex; justify-content:flex-start; align-items: center;"
                    class="nav-item" to="/user">
                    <i class="bi bi-person-circle" style="font-size: 2rem; margin-right: 10px;"></i>
                    <span>User</span>
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

            <div class="bottom-nav">
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
/* Sidebar chính */
.sidebar {
    background: var(--bg-secondary-color);
    color: var(--text-light-color);
    padding: 20px 10px;
    border-radius: 5px;
    margin-right: 20px;
}

/* Nav item */
.nav-item {
    margin-bottom: 10px;
    padding: 8px;
    transition: background 0.2s ease, padding 0.2s ease;
    border-radius: 8px;
}

.nav-item:hover {
    background: rgba(255, 255, 255, 0.1);
    padding-left: 25px;
}

.nav-item i {
    font-size: 2rem;
    margin-right: 10px;
}

.nav-item-bottom{
    margin-bottom: 0 !important;
}

/* Phần nav */
.nav {
    flex-wrap: nowrap;
}

/* Smooth scrolling */
body {
    scroll-behavior: smooth;
}

/* .router-link-active {
    background: rgba(255, 255, 255, 0.15);
    color: #ffc107 !important;
}

.router-link-active i {
    color: #ffc107 !important;
} */
</style>
