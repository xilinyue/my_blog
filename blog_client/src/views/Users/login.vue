<template>
    <div id="login">
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="100px" class="login">
            <h3>登录</h3>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-button @click="userLogin">登录</el-button>
            <span class="register" @click="goRegister">没有账号，前往注册...</span>
        </el-form>
    </div>
</template>

<script>
    import userService from "../../api/userService";
    export default {
        name: "login",
        data() {
            return{
                loginForm: {
                    username: '',
                    password: ''
                },
                loginRules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {
                            type: 'string',
                            pattern: /^[\w\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00\-]{2,7}$/,
                            message: '2-7位，数字 字母 _ - 中日韩文',
                            trigger: 'blur'
                        }
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {
                            type: 'string',
                            pattern: /^[\w<>,.?|;':"{}!@#$%^&*()\/\-\[\]\\]{6,18}$/,
                            message: '6-18位，不包含特殊字符',
                            trigger: 'blur'
                        }
                    ],
                }
            }
        },
        methods: {
            goRegister(){
                this.$router.push('/register');
            },
            userLogin() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        userService.loginUser(this.loginForm).then(res => {
                            let data = res.data;
                            if (data.code !== 0) {
                                this.$message({
                                    type: 'error',
                                    message: data.msg,
                                    duration: 2000
                                });
                            }else{
                                this.$message({
                                    type: 'success',
                                    message: data.msg,
                                    duration: 2000
                                });
                                if(this.$route.query.returnURL) {
                                    this.$router.push(this.$route.query.returnURL);
                                }else{
                                    this.$router.push("/blog/0")
                                }
                            }
                        })
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    #login{
        /*height: 100%;*/
        height: 937px;
        overflow: hidden;
        .login{
            position: relative;
            width: 600px;
            background-color: #00000040;
            margin: 15% auto 0;
            text-align: center;
            padding-top: 20px;
            padding-right: 20px;
            padding-bottom: 20px;
            h3{
                font-size: 25px;
                font-weight: bold;
                color: #f07c82;
                margin-bottom: 20px;
                letter-spacing: 10px;
            }
            /deep/ .el-input__inner {
                background-color: transparent;
                border: none;
                border-bottom: 2px solid #fff;
                border-radius: 0;
                padding-right: 10px;
                &:focus{
                    border-color: #ed5a65;
                    outline: 0;
                    color: #f07c82;
                }
            }
            .el-button{
                width: 300px;
                background: linear-gradient(to right,#ed5a65,#2177b8);
                color: #fff;
                font-weight: bold;
                letter-spacing: 20px;
                border: none;
                border-radius: 19px;
            }
            .register{
                position: absolute;
                color: #fff;
                font-weight: bold;
                font-size: 12px;
                bottom: 20px;
                right: 20px;
                cursor: pointer;
            }
        }
    }
</style>