<template>

    <div class="parent">
        <div class="div1">1</div>
        <div class="div2">2</div>
        <div class="div7">7</div>
        <div class="div8">8</div>
        <div class="div9">9</div>
        <div class="div10">10</div>
        <div class="div11">11</div>
    </div>

</template>

<style scoped>
.parent {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(8, 1fr);
    gap: 20px;
    height: 100vh;
}

.div1 {
    grid-column: span 2 / span 2;
    grid-row: span 8 / span 8;
    background-color: aliceblue;
}

.div2 {
    grid-column: span 10 / span 10;
    grid-row: span 4 / span 4;
    grid-column-start: 3;
    background-color: aliceblue;
}

.div7 {
    grid-column: span 6 / span 6;
    grid-row: span 4 / span 4;
    grid-column-start: 3;
    grid-row-start: 5;
    background-color: aliceblue;
}

.div8 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 9;
    grid-row-start: 5;
    background-color: aliceblue;
}

.div9 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 11;
    grid-row-start: 5;
    background-color: aliceblue;
}

.div10 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 9;
    grid-row-start: 7;
    background-color: aliceblue;
}

.div11 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 11;
    grid-row-start: 7;
    background-color: aliceblue;
}
</style>