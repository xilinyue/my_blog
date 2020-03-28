<template>
    <div>
        <Nav></Nav>
        <div class="canvas"></div>
    </div>
</template>

<script>
    import Nav from "../../components/Nav";
    export default {
        name: "index",
        components: {
            Nav
        }
    }
</script>

<style lang="less" scoped>
.canvas{
    height: 400px;
    width: 100%;
    background-color: red;
}
</style>