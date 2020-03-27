<template>
    <div>
        <Nav></Nav>
        <Container></Container>
    </div>
</template>

<script>
    import Nav from "../../components/Nav";
    import Container from "./Container";
    export default {
        name: "index",
        components: {
            Nav,Container
        }
    }
</script>

<style scoped>

</style>