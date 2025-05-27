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
    height: 100dvh;
    padding: 20px 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

/* Nav item */
.nav-item {
    margin-bottom: 10px;
    padding: 8px;
    transition: background 0.2s ease, padding 0.2s ease;
    border-radius: 8px;
    display: flex;
    align-items: center;
}

.nav-item:hover {
    background: rgba(255, 255, 255, 0.1);
    padding-left: 12px;
}

.nav-item i {
    font-size: 2rem;
    margin-right: 10px;
}

/* Phần nav */
.nav {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    flex-wrap: nowrap;
}

/* Responsive sidebar: thu gọn sidebar ở màn hình nhỏ */
@media (max-width: 768px) {
    .sidebar {
        width: 60px;
        padding: 10px 5px;
    }

    .nav-item {
        justify-content: center;
        padding: 8px 0;
    }

    .nav-item i {
        margin-right: 0;
    }

    .nav-item span,
    .nav-item-text {
        display: none;
    }

    .top-nav,
    .bottom-nav {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}

/* Mặc định màn hình lớn */
@media (min-width: 769px) {
    .sidebar {
        width: 220px;
    }
}

/* Smooth scrolling */
body {
    scroll-behavior: smooth;
}
</style>
