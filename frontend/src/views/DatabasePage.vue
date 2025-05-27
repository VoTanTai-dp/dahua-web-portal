<script>
</script>

<template>
    <div class="content">
        <div class="col-sm tb-device">
            <table>
                <thead>
                    <tr class="tr-device">
                        <th class="th-device">ID</th>
                        <th class="th-device">Name</th>
                        <th class="th-device">IP Address</th>
                        <th class="th-device">MAC Address</th>
                        <th class="th-device">ONVIF Version</th>
                        <th class="th-device">Location</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>01</td>
                        <td>Camera Dahua</td>
                        <td>172.1.1.1</td>
                        <td>0000:1111:2222</td>
                        <td>3.1</td>
                        <td>Bac Lieu</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="tb-user">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Password</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>001</td>
                        <td>Vo Tan Tai</td>
                        <td>votantai</td>
                        <td>12321312312</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.content {
    width: 100%;
}

/* table{
    margin: 10px;
} */

.tb-device {
    background-color: var(--bg-secondary-color);
    color: var(--text-light-color);
    margin-bottom: 20px;
    border-radius: 10px;
}



.tb-user {
    background-color: var(--bg-secondary-color);
    color: var(--text-light-color);
}
</style>