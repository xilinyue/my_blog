<template>
    <div>
        <el-container>
            <el-aside width="250px">
                <h1>博客后台管理系统</h1>
                <AsideMenu></AsideMenu>
            </el-aside>
            <el-main>
                <div class="header"></div>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import AsideMenu from "../../components/AsideMenu";
    export default {
        name: "index",
        components: {AsideMenu},
        data() {
            return {
            };
        },
        methods: {

        }
    }
</script>

<style lang="less" scoped>
    .el-aside{
        height: 100vh;
        border-right: 1px solid #eee;
        h1{
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-align: center;
            border-bottom: 1px solid #eee;
            font-family: Kaiti;
        }
    }
    .el-main{
        position: relative;
        padding-top: 71px;
        .header{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 51px;
            background-color: #eeeeee;
        }
    }
</style>