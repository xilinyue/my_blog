<template>
    <div class="blog-a-e">
        <h1>{{id === '0' ? '添加博客' : '编辑博客'}}</h1>
        <el-form :model="addBlogForm"
                 :rules="addBlogFormRules"
                 ref="addBlogForm"
                 label-width="100px">
            <el-form-item label="标题" prop="title">
                <el-input v-model="addBlogForm.title"
                          placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="概括" prop="abstract">
                <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入概括"
                        v-model="addBlogForm.abstract">
                </el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
                <el-select v-model="addBlogForm.type" placeholder="请选择类型">
                    <el-option
                            v-for="item in typeOptions"
                            :key="item.value"
                            :label="item.value"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标签" prop="tag">
                <el-select v-model="addBlogForm.tag" placeholder="请选择标签">
                    <el-option
                            v-for="item in tagList"
                            :key="item"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <div class="markdown">
                    <MarkdownPro
                            :copyCode="true"
                            :toolbars="toolbars"
                            @on-save="onSave"
                            v-model="addBlogForm.contentMarkdown"
                            :interval="5000"
                            :autoSave="true"
                    />
                </div>
            </el-form-item>
            <el-form-item label="封面">
                <el-upload
                        class="avatar-uploader"
                        action="http://47.104.155.124:3001/api/article/uploadSurface"
                        :show-file-list="false"
                        :on-success="handleSurfaceSuccess"
                        :before-upload="beforeSurfaceUpload">
                    <img v-if="addBlogForm.surface" :src="addBlogForm.surface" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="submitAddBlog">提交</el-button>
    </div>
</template>

<script>
    import articleInfoService from "../../../api/articleInfoService";
    import articleService from "../../../api/articleService";
    import { MarkdownPro } from 'vue-meditor'
    export default {
        name: "BlogEditAndAdd",
        components: {
            MarkdownPro
        },
        data() {
            return{
                //markdown工具
                toolbars: {
                    uploadImage: true
                },
                id: '',
                addBlogForm: {
                    title: '',
                    abstract: '',
                    tag: '',
                    type: '',
                    content: '',
                    contentMarkdown: '',
                    surface: ''
                },
                addBlogFormRules: {
                    title: [{required: true, message: '请填写博客标题', trigger: 'blur'}],
                    abstract: [{required: true, message: '请填写博客概括', trigger: 'blur'}],
                    tag: [{required: true, message: '请选择博客标签', trigger: 'change'}],
                    type: [{required: true, message: '请选择博客类型', trigger: 'change'}],
                    content: [{required: true, message: '请输入博客内容', trigger: 'blur'}],
                    surface: []
                },
                typeOptions: [
                    {value: '原创'},
                    {value: '转载'}],
                tagList: []
            }
        },
        mounted() {
            this.id = this.$route.params.id;
            if (this.id !== "0"){
                this.getBlogById();
            }
            this.getArticleInfo();
        },
        methods: {
            getArticleInfo() {
                articleInfoService.getAlltag().then(res => {
                    if (res.code === 0){
                        this.tagList = res.data;
                    }else {
                        this.$message({
                            type: 'error',
                            message: res.msg,
                            duration: 2000
                        });
                    }
                });
            },
            //添加博客
            submitAddBlog() {
                this.$refs.addBlogForm.validate(valid => {
                    if (valid){
                        //判断是新增还是编辑
                        if (this.id === "0"){
                            //新增
                            this.addMove()
                        }else{
                            //编辑
                            this.editMove();
                        }
                    }
                });
            },
            //编辑器自动存储
            onSave(o) {
                this.addBlogForm.content = o.html;
            },
            handleSurfaceSuccess(res, file) {
                if (res.code === 0){
                    this.$message({
                        type: 'success',
                        message: res.msg,
                        duration: 2000
                    });
                    this.addBlogForm.surface = res.surface;
                }
            },
            beforeSurfaceUpload(file) {
                const isLt1M = file.size / 1024 / 1024 < 1;

                if (!isLt1M) {
                    this.$message.error('上传封面图片大小不能超过 1MB!');
                }
                return isLt1M;
            },
            //新增到数据库
            addMove() {
                articleService.addBlog(this.addBlogForm).then(res => {
                   if (res.code === 0){
                       this.$message({
                           type: "success",
                           message: res.msg,
                       });
                       this.$refs.addBlogForm.resetFields();
                       this.$router.push("/admin/BlogManage");
                   }
                });
            },
            //编辑
            getBlogById(){
                articleService.getBlogById(this.id).then(res => {
                   if (res.code === 0){
                       let data = res.data;
                       this.addBlogForm.title = data.title;
                       this.addBlogForm.abstract = data.abstract;
                       this.addBlogForm.tag = data.tag;
                       this.addBlogForm.type = data.type;
                       this.addBlogForm.content = data.content;
                       this.addBlogForm.contentMarkdown = data.contentMarkdown;
                   }
                });
            },
            editMove() {
                articleService.updateBlog(this.id,this.addBlogForm).then(res => {
                    if (res.code === 0){
                        this.$message({
                            type: 'success',
                            message: res.msg
                        });
                        this.$refs.addBlogForm.resetFields();
                        this.$router.push("/admin/BlogManage");
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.msg
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .blog-a-e{
        width: 100%;
        box-sizing: border-box;
        h1{
            font-family: Kaiti;
            font-size: 25px;
            margin-bottom: 20px;
        }
    }
</style>