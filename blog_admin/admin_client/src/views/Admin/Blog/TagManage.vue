<template>
    <div class="tag-manage">
        <h1>博客标签管理</h1>
        <el-button type="primary" @click="addTagDialogVisible = true">添加标签</el-button>
        <el-table
                :data="tagList"
                style="width: 100%">
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="Tag"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center"
                    width="300">
                <template v-slot="scope">
                    <el-button type="danger" size="mini" @click="deleteTag(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
                title="添加标签"
                :visible.sync="addTagDialogVisible"
                width="30%"
                :before-close="handleAddTagDialogClose"
                :close-on-click-modal="false"
                :show-close="false">
            <el-form :model="addTagForm" :rules="addTagFormRules" ref="addTagForm" label-width="100px">
                <el-form-item label="标签名称" prop="tag">
                    <el-input v-model="addTagForm.tag"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleAddTagDialogClose">取 消</el-button>
                <el-button type="primary" @click="addSubmit">提交</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
    import articleInfoService from "../../../api/articleInfoService";
    export default {
        name: "TagManage",
        data() {
            return{
                addTagDialogVisible: false,
                addTagForm: {
                    tag: ''
                },
                addTagFormRules: {
                    tag: {required: true, message: '请输入标签名称', trigger: 'blur'}
                },
                tagList: []
            }
        },
        methods: {
            //关闭添加tag对话框
            handleAddTagDialogClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.addTagDialogVisible = false;
                        this.$refs.addTagForm.resetFields();
                    })
                    .catch(_ => {});
            },
            //提交添加tag
            addSubmit(){
                this.$refs.addTagForm.validate(valid => {
                    if (valid){
                        articleInfoService.addTag(this.addTagForm.tag).then(res => {
                           if (res.code === 0){
                               this.$refs.addTagForm.resetFields();
                               this.addTagDialogVisible = false;
                               this.getAlltag();
                               this.$message({
                                   type: 'success',
                                   message: res.msg,
                                   duration: 2000
                               })
                           }else{
                               this.$message({
                                   type: 'error',
                                   message: res.msg,
                                   duration: 2000
                               });
                           }
                        });
                    }
                });
            },
            //获取所有tag
            getAlltag(){
                articleInfoService.getAlltag().then(res => {
                    if (res.code === 0){
                        let list = [];
                        res.data.forEach(item => {
                            list.push({"name": item});
                        });
                        this.tagList = list;
                    }else {
                        this.$message({
                            type: 'error',
                            message: res.msg,
                            duration: 2000
                        });
                    }
                });
            },
            //删除tag
            deleteTag(row) {
                this.$confirm('是否确定删除该tag,可能会导致具有该tag的博客无法通过tag搜索到, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    articleInfoService.deleteTag(row.name).then(res => {
                        if (res.code === 0){
                            this.getAlltag();
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else{
                            this.$message({
                                type: 'warning',
                                message: '删除失败!'
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
        },
        mounted() {
            this.getAlltag();
        }
    }
</script>

<style lang="less" scoped>
    .tag-manage{
        width: 100%;
        box-sizing: border-box;
        h1{
            font-family: Kaiti;
            font-size: 25px;
            margin-bottom: 10px;
        }
    }
</style>