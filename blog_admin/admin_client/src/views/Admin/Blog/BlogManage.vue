<template>
    <div class="blog-manage">
        <h1>博客管理</h1>
        <el-button type="primary" @click="toAddBlog">添加博客</el-button>
        <el-table
                :data="blogList"
                style="width: 100%"
                stripe>
            <el-table-column
                    type="index">
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="标题">
            </el-table-column>
            <el-table-column
                    prop="tag"
                    label="标签"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="类型"
                    width="80">
            </el-table-column>
            <el-table-column width="150"
                    label="日期">
                <template v-slot="scope">
                    {{scope.row.date | getTime}}
                </template>
            </el-table-column>
            <el-table-column
                    width="300"
                    label="操作"
                    align="center">
                <template v-slot="scope">
                    <el-button @click="toEditBlog(scope.row)">编辑</el-button>
                    <el-button type="warning" @click="deleteOne(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="limit"
                layout="total, sizes, prev, pager, next"
                :total="total">
        </el-pagination>
    </div>
</template>

<script>
    function toTwo(value) {
        if (value < 10){
            return '0' + value;
        }
        return value;
    }
    import articleService from "../../../api/articleService";
    import articleInfoService from "../../../api/articleInfoService";
    export default {
        name: "BlogManage",
        data() {
            return{
                blogList: [],
                skip: 0,
                limit: 5,
                currentPage: 1,
                total: 5
            }
        },
        filters: {
            getTime(value) {
                let date = new Date(value);
                let y = date.getFullYear();
                let m = date.getMonth() + 1;
                let d = date.getDate();
                let h = date.getHours();
                let M = toTwo(date.getMinutes());
                let s = toTwo(date.getSeconds());
                return `${y}-${m}-${d} ${h}:${M}:${s}`;
            }
        },
        mounted() {
            this.getBlogLazyed();
            this.getArticleInfo();
        },
        methods: {
            getArticleInfo() {
                articleInfoService.getArticleTotal().then(res => {
                    if (res.code === 0){
                        this.total = res.total;
                    }
                });
            },
            toAddBlog(){
                this.$router.push("/admin/blog/0");
            },
            toEditBlog(row) {
                this.$router.push("/admin/blog/"+row._id);
            },
            //后去列表数据
            getBlogLazyed() {
                articleService.getBlogLazyed(this.skip,this.limit).then(res => {
                    if (res.code === 0){
                        this.blogList = res.data;
                    }else{
                        this.$message({
                            type: 'error',
                            msg: res.msg
                        });
                    }
                })
            },
            handleSizeChange(value){
                this.limit = value;
                this.skip = this.skip*this.limit;
                this.getBlogLazyed();
            },
            handleCurrentChange(value) {
                this.skip = (value - 1)*this.limit;
                this.getBlogLazyed();
            },
            //删除
            deleteOne(row){
                this.$confirm('是否确定删除该博客?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let _id = row._id;
                    articleService.deleteBlogById(_id).then(res=> {
                        if (res.code === 0){
                            this.$message({
                                type: 'success',
                                message: res.msg
                            });
                            this.getBlogLazyed();
                            this.getArticleInfo()
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
    .blog-manage{
        width: 100%;
        box-sizing: border-box;
        h1{
            font-family: Kaiti;
            font-size: 25px;
            margin-bottom: 10px;
        }
        .el-table{
            margin-bottom: 20px;
        }
    }
</style>