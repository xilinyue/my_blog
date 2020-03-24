<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="less">
    @import "assets/css/reset.css";
    @import "assets/css/font.css";
    #app{
        width: 100%;
        height: 3000px;
        background: url("assets/img/bg.png") center top/cover fixed;
    }
</style>
