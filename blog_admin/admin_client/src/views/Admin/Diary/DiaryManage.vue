<template>
    <div class="diary-manage">
        <h1>日记管理</h1>
        <el-button type="primary" @click="addDialogVisible=true">添加日记</el-button>
        <el-table
                :data="diaryList"
                style="width: 100%"
                stripe>
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    label="日记标题"
                    width="200"
                    prop="title">
            </el-table-column>
            <el-table-column
                    label="日记内容">
                <template v-slot="scope">
                    <div v-html="scope.row.content"></div>
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center"
                    width="150"
            >
                <template v-slot="scope">
                    <el-button type="danger" size="mini" @click="deleteDiary(scope.row)">删除</el-button>
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
                :total="totalDiary">
        </el-pagination>


        <el-dialog
                title="添加日记"
                :visible.sync="addDialogVisible"
                :close-on-click-modal="false"
                :show-close="false"
                width="50%">
            <div :style="[{'color': '#f00','margin': '10px 0 20px'}]">日记内容建议使用html语法</div>
            <el-form :model="addDiaryForm" :rules="addDiaryFormRules" ref="addDiaryForm" label-width="100px">
                <el-form-item label="日记标题" prop="title">
                    <el-input v-model="addDiaryForm.title" placeholder="请输入日记标题"></el-input>
                </el-form-item>
                <el-form-item label="日记内容" prop="content">
                    <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入日记内容"
                            v-model="addDiaryForm.content">
                    </el-input>
                </el-form-item>
                <el-form-item label="上传图片">
                    <el-upload
                            ref="uploadDiaryImg"
                            action="http://localhost:3001/api/diary/uploadDiaryImage"
                            list-type="picture-card"
                            :on-success="onUploadSuccess"
                            :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCloseAddDialog">取 消</el-button>
                <el-button type="primary" @click="submitAddDialog">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import diaryService from "../../../api/diaryService";
    export default {
        name: "DiaryManage",
        data() {
            return{
                diaryList: [],
                currentPage: 1,
                totalDiary: 0,
                query: {
                    skip: 0,
                    limit: 5
                },

                addDialogVisible: false,
                addDiaryForm: {
                    title: '',
                    content: '',
                    imgArr: []
                },
                addDiaryFormRules: {
                    title: [{required: true, message: '日记标题必须', trigger: 'blur'}],
                    content: [{required: true, message: '日记内容必须', trigger: 'blur'}],
                }
            }
        },
        computed: {
            content() {
                let content = '<h1 id="1231231">1231231</h1>↵<ul>↵<li class=" ">123</li>↵<li class=" ">12312</li>↵<li class=" ">12312</li>↵</ul>↵<h3 id="123123123">123123123</h3>↵';
                let reg = new RegExp("↵", "g");
                return content.replace(reg,"")
            }
        },
        mounted() {
            this.getTotalDiary();
            this.getDiaryListLazyed();
        },
        methods: {
            //取消添加日记dialog
            handleCloseAddDialog() {
                this.$confirm('确定该对添加对话框?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$refs.addDiaryForm.resetFields();
                    this.addDialogVisible = false;
                    this.addDiaryForm.imgArr = [];
                    this.$refs.uploadDiaryImg.clearFiles();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消关闭'
                    });
                });
            },
            //submitAddDialog提交添加日记
            submitAddDialog() {
                this.$refs.addDiaryForm.validate(valid => {
                    if (valid) {
                        diaryService.addDiary(this.addDiaryForm).then(res => {
                            if (res.code === 0){
                                this.$message({
                                    type: 'success',
                                    message: res.msg
                                });
                                this.$refs.addDiaryForm.resetFields();
                                this.addDialogVisible = false;
                                this.addDiaryForm.imgArr = [];
                                this.$refs.uploadDiaryImg.clearFiles();
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: res.msg
                                });
                            }
                        });
                    }
                });
            },

            //上传图片相关方法
            handleRemove(file) {
                let index = this.addDiaryForm.imgArr.indexOf(file.response.imgSrc);
                this.addDiaryForm.imgArr.splice(index,1);
            },
            onUploadSuccess(res) {
                if (res.code === 0){
                    this.$message({
                        type: 'success',
                        message: res.msg,
                        duration: 2000
                    });
                    this.addDiaryForm.imgArr.push(res.imgSrc);
                }
            },

            //管理日记相关方法
            deleteDiary(row){
                this.$confirm('确定删除该篇日记?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    diaryService.deleteDiaryById(row._id).then(res => {
                        if (res.code === 0){
                            this.$message({
                                type: 'success',
                                message: res.msg
                            });
                            this.getTotalDiary();
                            this.getDiaryListLazyed();
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
            },
            handleSizeChange(size) {
                this.query.limit = size;
                this.getDiaryListLazyed();
            },
            handleCurrentChange(currentPage) {
                this.query.skip = (currentPage-1) * this.query.limit;
                this.getDiaryListLazyed();
            },
            getTotalDiary() {
                diaryService.getTotalDiary().then(res=>{
                    if (res.code === 0){
                        this.totalDiary = res.total;
                    }
                });
            },
            getDiaryListLazyed() {
                diaryService.getDiaryListLazyed(this.query).then(res=>{
                    if (res.code === 0){
                        this.diaryList = res.data;
                    }
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    .diary-manage{
        width: 100%;
        box-sizing: border-box;
        h1{
            font-family: Kaiti;
            font-size: 25px;
            margin-bottom: 20px;
        }
    }
</style>