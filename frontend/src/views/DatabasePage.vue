<script setup>
import { ref, onMounted } from 'vue';
const data = ref({ devices: [], sessions: [], session_counts: [], sensor_data: [] });

async function fetchData() {
  const res = await fetch('http://localhost:3000/api/database/all');
  data.value = await res.json();
}

onMounted(fetchData);

// Chuyển giờ UTC sang giờ Việt Nam (GMT+7)
function formatVietnamTime(datetimeStr) {
  if (!datetimeStr) return '';
  const date = new Date(datetimeStr);
  return date.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
}
</script>

<template>
  <div class="container-fluid">
    <div class="section mb-4">
      <h3 class="table-title">Thiết bị</h3>
      <table class="table table-dark table-striped text-center align-middle">
        <thead>
          <tr>
            <th style="width: 5%">ID</th>
            <th style="width: 20%">Tên đăng nhập</th>
            <th style="width: 30%">IP</th>
            <th style="width: 10%">Port</th>
            <th style="width: 35%">Thời điểm tạo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d in data.devices" :key="d.id">
            <td>{{ d.id }}</td>
            <td>{{ d.username }}</td>
            <td>{{ d.ip }}</td>
            <td>{{ d.port }}</td>
            <td>{{ formatVietnamTime(d.created_at) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section mb-4">
      <h3 class="table-title">Phiên hoạt động</h3>
      <table class="table table-dark table-striped text-center align-middle">
        <thead>
          <tr>
            <th style="width: 5%">ID</th>
            <th style="width: 10%">Thiết bị</th>
            <th style="width: 42%">Bắt đầu</th>
            <th style="width: 43%">Kết thúc</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in data.sessions" :key="s.id">
            <td>{{ s.id }}</td>
            <td>{{ s.device_id }}</td>
            <td>{{ formatVietnamTime(s.start_time) }}</td>
            <td>{{ formatVietnamTime(s.end_time) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section mb-4">
      <h3 class="table-title">Số lượng người & phương tiện</h3>
      <table class="table table-dark table-striped text-center align-middle">
        <thead>
          <tr>
            <th style="width: 5%">ID</th>
            <th style="width: 15%">Phiên</th>
            <th style="width: 40%">Người</th>
            <th style="width: 40%">Phương tiện</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in data.session_counts" :key="c.id">
            <td>{{ c.id }}</td>
            <td>{{ c.session_id }}</td>
            <td>{{ c.human_count }}</td>
            <td>{{ c.vehicle_count }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section mb-4">
      <h3 class="table-title">Dữ liệu nhiệt độ & độ ẩm</h3>
      <table class="table table-dark table-striped text-center align-middle">
        <thead>
          <tr>
            <th style="width: 5%">ID</th>
            <th style="width: 10%">Phiên</th>
            <th style="width: 20%">Nhiệt độ (°C)</th>
            <th style="width: 20%">Độ ẩm (%)</th>
            <th style="width: 45%">Thời gian</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in data.sensor_data" :key="r.id">
            <td>{{ r.id }}</td>
            <td>{{ r.session_id }}</td>
            <td>{{ r.temperature }}</td>
            <td>{{ r.humidity }}</td>
            <td>{{ formatVietnamTime(r.timestamp) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="d-flex justify-content-center mt-4 mb-5">
      <button class="btn btn-success px-4 py-2" @click="fetchData">Làm mới</button>
    </div>
  </div>
</template>

<style scoped>
.section {
  background-color: var(--bg-secondary-color);
  padding: 20px;
  border-radius: 10px;
}

.table-title {
  color: var(--text-light-color);
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
}
</style>
