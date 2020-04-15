<template>
    <div class="user-manage">
        <h1>用户管理</h1>
        <div style="color: #ccc;margin: 20px">暂时不进行用户的删除!!!删除用户的时候记得删除最近访客列表中的数据
            在登录的时候可以在vuex中设置userinfo判断是否存在再iflogin</div>
        <el-table
                :data="userList"
                style="width: 100%"
                stripe>
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="用户名"
                    align="center"
                    width="300">
            </el-table-column>
            <el-table-column
                    label="是否禁用"
                    align="center"
                    width="150">
                <template v-slot="scope">
                    <el-switch
                            v-model="scope.row.disabled"
                            active-color="#f00"
                            inactive-color="#eee"
                            @change="handleDisabledChange(scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    label="管理员"
                    align="center"
                    width="150">
                <template v-slot="scope">
                    <el-switch
                            v-model="scope.row.admin"
                            active-color="#13ce66"
                            inactive-color="#eee"
                            @change="handleAdminChange(scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center"
            >
                <template v-slot="scope">
                    <el-button type="danger" size="mini" disabled>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 15]"
                :page-size="5"
                layout="total, sizes, prev, pager, next"
                :total="totalUser">
        </el-pagination>
    </div>
</template>

<script>
    import userService from "../../../api/userService";
    export default {
        name: "UserManage",
        data() {
            return{
                userList: [],
                totalUser: 0,
                currentPage: 1,
                query: {
                    skip: 0,
                    limit: 5
                }
            }
        },
        mounted() {
            this.getTotalUser();
            this.getUserListLazyed();
        },
        methods: {
            getTotalUser() {
                userService.getTotalUser().then(res => {
                    if (res.code === 0){
                        this.totalUser = res.total;
                    }
                });
            },
            getUserListLazyed() {
                userService.getUserListLazyed(this.query).then(res => {
                   if (res.code === 0){
                       this.userList = res.data;
                   }
                });
            },
            handleSizeChange(size) {
                this.query.limit = size;
                this.getUserListLazyed();
            },
            handleCurrentChange(currentPage) {
                this.query.skip = (currentPage-1) * this.query.limit;
                this.getUserListLazyed();
            },
            //修改用户的disabled属性
            handleDisabledChange(row){
                userService.updateUserDisabledById(row._id,row.disabled).then(res => {
                   if (res.code === 0){
                       this.$message({
                           type: 'success',
                           message: res.msg,
                           duration: 3000
                       });
                       this.getUserListLazyed();
                   }else{
                       this.$message({
                           type: 'error',
                           message: res.msg,
                           duration: 3000
                       });
                   }
                });
            },
            //修改用户的admin属性
            handleAdminChange(row){
                userService.updateUserAdminById(row._id,row.admin).then(res => {
                    if (res.code === 0){
                        this.$message({
                            type: 'success',
                            message: res.msg,
                            duration: 3000
                        });
                        this.getUserListLazyed();
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.msg,
                            duration: 3000
                        });
                    }
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    .user-manage{
        width: 100%;
        box-sizing: border-box;
        h1{
            font-family: Kaiti;
            font-size: 25px;
            margin-bottom: 10px;
        }
    }
</style>