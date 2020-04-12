<template>
    <div>
        <el-menu
                class="el-menu-vertical-demo"
                ref="menu"
                :router="true"
                :unique-opened="true"
                :default-active="defaultActive"
        >
            <el-submenu index="Blog">
                <template slot="title">
                    <i class="el-icon-tickets"></i>
                    <span>博客管理</span>
                </template>
                <el-menu-item index="/admin/blogManage">博客管理</el-menu-item>
                <el-menu-item index="/admin/tagManage">标签管理</el-menu-item>
            </el-submenu>
            <el-submenu index="Diary">
                <template slot="title">
                    <i class="el-icon-chat-line-square"></i>
                    <span>日记管理</span>
                </template>
                <el-menu-item index="/admin/diaryManage">日记管理</el-menu-item>
            </el-submenu>
            <el-submenu index="Message">
                <template slot="title">
                    <i class="el-icon-message"></i>
                    <span>留言管理</span>
                </template>
                <el-menu-item index="/admin/messageManage">留言管理</el-menu-item>
            </el-submenu>
            <el-submenu index="Links">
                <template slot="title">
                    <i class="el-icon-link"></i>
                    <span>友链管理</span>
                </template>
                <el-menu-item index="/admin/linksManage">友链管理</el-menu-item>
            </el-submenu>
            <el-submenu index="User">
                <template slot="title">
                    <i class="el-icon-user"></i>
                    <span>用户管理</span>
                </template>
                <el-menu-item index="/admin/userManage">用户管理</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "AsideMenu",
        data() {
            return{
                defaultActive: ''
            }
        },
        methods: {
            changeDefaultActive() {
                if (this.$route.path.startsWith('/admin/blog/')){
                    this.defaultActive = '/admin/blogManage';
                    return;
                }
                this.defaultActive = this.$route.path;
            }
        },
        created() {
            this.changeDefaultActive();
        },
        watch: {
            $route() {
                this.changeDefaultActive()
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-menu{
        border: none;
    }
</style>