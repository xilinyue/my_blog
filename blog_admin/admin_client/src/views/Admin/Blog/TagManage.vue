<template>
    <div class="tag-manage">
        <h1>博客标签管理</h1>
        <el-button type="primary" @click="addTagDialogVisible = true">添加标签</el-button>


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
                }
            }
        },
        methods: {
            handleAddTagDialogClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.addTagDialogVisible = false;
                        this.$refs.addTagForm.resetFields();
                    })
                    .catch(_ => {});
            },
            addSubmit(){
                this.$refs.addTagForm.validate(valid => {
                    if (valid){
                        articleInfoService.addTag(this.addTagForm.tag).then(res => {
                           if (res.code === 0){
                               this.$refs.addTagForm.resetFields();
                               this.addTagDialogVisible = false;
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
            }
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