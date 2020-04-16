<template>
    <div>
        <el-container>
            <el-aside width="250px">
                <h1>博客后台管理系统</h1>
                <AsideMenu></AsideMenu>
            </el-aside>
            <el-main>
                <div class="header">
                    <div class="logout">
                        <el-dropdown @command="handleCommand">
                            <div class="userInfo">
                                <div class="img" :style="{'backgroundImage': 'url('+$store.state.userInfo.avatar+')'}"></div>
                                <span>{{$store.state.userInfo.username}}</span>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import userService from "../../api/userService";
    import AsideMenu from "../../components/AsideMenu";
    export default {
        name: "index",
        components: {AsideMenu},
        data() {
            return {
            };
        },
        methods: {
            //下拉框的触发事件
            handleCommand(command) {
                if (command === 'logout'){
                    userService.userLogout().then(res => {
                        if (res.code === 0){
                            this.$message({
                                type: 'success',
                                message: res.msg,
                                duration: 2000
                            });
                            setTimeout(function () {
                                window.location.reload();
                            },1000);
                        }
                    });
                }
            },
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
            .logout{
                float: right;
                margin-right: 30px;
                height: 51px;
                line-height: 51px;
                .userInfo{
                    display: flex;
                    cursor: pointer;
                    div{
                        margin-top: 5.5px;
                        margin-right: 10px;
                        width: 40px;
                        height: 40px;
                        background-size: cover;
                        border-radius: 50%;
                    }
                }
            }
        }
    }
</style>