<template>
    <div id="register">
        <el-form :model="registerForm" :rules="registerRules" ref="registerForm" label-width="100px" class="register">
            <h3>注册</h3>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="registerForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="registerForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPassword">
                <el-input type="password" v-model="registerForm.checkPassword"></el-input>
            </el-form-item>
            <el-button @click="registerUser">注册</el-button>
            <span class="home" @click="goHome">返回首页...</span>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "register",
        data() {
            return{
                registerForm: {
                    username: '',
                    password: '',
                    checkPassword: ''
                },
                registerRules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {type: 'string', pattern: /^[\w\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00\-]{2,7}$/,message: '2-7位，数字 字母 _ - 中日韩文', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {type: 'string', pattern: /^[\w<>,.?|;':"{}!@#$%^&*()\/\-\[\]\\]{6,18}$/,message: '6-18位，不包含特殊字符', trigger: 'blur'}
                    ],
                    checkPassword: [
                        {required: true, message: '请输入确认密码', trigger: 'blur'},
                        {
                            validator: (rule,value,cb) => {
                                if (value === this.registerForm.password){
                                    cb();
                                }else{
                                    cb(new Error('两次输入的密码不一致'));
                                }
                            },trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            goHome() {
                this.$router.push('/home')
            },
            registerUser(){}
        }
    }
</script>

<style lang="less" scoped>
#register{
    height: 100%;
    overflow: hidden;
    .register{
        position: relative;
        text-align: center;
        margin: 10% auto 0;
        /*border: 1px solid ;*/
        width: 500px;
        padding-top: 20px;
        padding-right: 20px;
        h3{
            text-align: center;
            margin-bottom: 20px;
            font-size: 26px;
            color: #f07c82;
        }
        /deep/ .el-input__inner {
            background-color: transparent;
            &:focus{
                border-color: #ed5a65;
                outline: 0;
            }
        }
        /deep/ .el-button:focus, .el-button:hover {
            color: #fff;
            font-weight: bold;
            border-color: #2c9678;
            background-color: #2c9678;
        }
        .home{
            position: absolute;
            color: #2177b8;
            font-weight: bold;
            font-size: 16px;
            bottom: 0;
            right: 20px;
            cursor: pointer;
        }
    }
}
</style>