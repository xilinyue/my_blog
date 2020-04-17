<template>
    <div>
        <el-dialog
                title="修改头像"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose"
                :close-on-click-modal="false">
            <el-upload
                    class="avatar-uploader"
                    action="http://47.104.155.124:3000/api/upload/avatar"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :with-credentials="true">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Avatar",
        props:['dialogVisible'],
        data() {
            return{
                imageUrl: ''
            }
        },
        methods: {
            //修改头像相关
            handleClose() {
                this.$emit('closeAvatar')
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.$message({
                    message: "头像上传成功",
                    type: 'success',
                    duration : 2000
                });
                setTimeout(()=>{
                    window.location.reload();
                },1700)
            },
            beforeAvatarUpload(file) {
                const isType = /^(image\/jpeg|image\/png|image\/gif)$/.test(file.type);
                const isLt1000K = file.size / 1024  < 1000;

                if (!isType) {
                    this.$message.error('上传头像图片只能是 JPG/PNG/GIF 格式!');
                }
                if (!isLt1000K) {
                    this.$message.error('上传头像图片大小不能超过 1000K !');
                }
                return isType && isLt1000K;
            }
        }

    }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>