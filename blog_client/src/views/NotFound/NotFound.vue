<template>
    <div class="not-found">
        <Nav></Nav>
        <img src="../../assets/img/404.gif" alt="404">
    </div>
</template>

<script>
    import Nav from "../../components/Nav";
    export default {
        name: "NotFound",
        components: {Nav}
    }
</script>

<style scoped lang="less">
.not-found{
    width: 100%;
    height: 100%;
    padding-top: 60px;
    background-color: #ffff;
    img{
        display: block;
        margin: 0 auto;
    }
}
</style>