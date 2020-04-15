<template>
    <div class="message-manage">
        <h1>留言管理</h1>
        <div style="color: #ccc;margin: 20px">主要是进行留言的删除</div>
        <el-table
                :data="messageList"
                style="width: 100%"
                stripe>
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    label="内容">
                <template v-slot="scope">
                    <div v-html="scope.row.content"></div>
                </template>
            </el-table-column>
            <el-table-column
                    label="内容"
                    width="150">
                <template v-slot="scope">
                    {{scope.row.date | getTime}}
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center"
                    width="150"
            >
                <template v-slot="scope">
                    <el-button type="danger" size="mini" @click="deleteMessage(scope.row)">删除</el-button>
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
                :total="totalMessage">
        </el-pagination>
    </div>
</template>

<script>
    import messageService from "../../../api/messageService";

    export default {
        name: "MessageManage",
        data() {
            return{
                messageList: [],
                totalMessage: 0,
                currentPage: 1,
                query: {
                    skip: 0,
                    limit: 5
                }
            }
        },
        filters: {
            getTime(value){
                let date = new Date(value);
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}
                        ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            }
        },
        mounted() {
            this.getTotalMessage();
            this.getMessageListLazyed();
        },
        methods: {
            getTotalMessage() {
                messageService.getTotalMessage().then(res => {
                    if (res.code === 0){
                        this.totalMessage = res.total;
                    }
                });
            },
            getMessageListLazyed() {
                messageService.getMessageListLazyed(this.query).then(res => {
                    if (res.code === 0){
                        this.messageList = res.data;
                    }
                });
            },
            handleSizeChange(size) {
                this.query.limit = size;
                this.getMessageListLazyed();
            },
            handleCurrentChange(currentPage) {
                this.query.skip = (currentPage-1) * this.query.limit;
                this.getMessageListLazyed();
            },
            //删除留言
            deleteMessage(row) {
                this.$confirm('此操作将永久删除该条留言, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    messageService.deleteMessage(row._id).then(res => {
                        if (res.code === 0){
                            this.$message({
                                type: 'success',
                                message: res.msg
                            });
                            this.getTotalMessage();
                            this.getMessageListLazyed();
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.msg
                            });
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    .message-manage{
        width: 100%;
        box-sizing: border-box;
        h1{
            font-family: Kaiti;
            font-size: 25px;
            margin-bottom: 10px;
        }
    }
</style>