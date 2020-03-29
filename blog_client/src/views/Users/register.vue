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
            <el-form-item label="验证码" class="svg-code" prop="vCode">
                <el-input v-model="registerForm.vCode"></el-input>
                <div class="svg" v-html="registerVCode.svgCodeHtml"></div>
                <el-link :disabled="registerVCode.refreshDisabled" @click="handleRefresh">{{registerVCode.svgCodeText}}</el-link>
            </el-form-item>
            <el-button @click="registerUser">注册</el-button>
            <span class="home" @click="goHome">返回首页...</span>
        </el-form>
    </div>
</template>

<script>
    import userService from "../../api/userService";
    export default {
        name: "register",
        data() {
            return{
                registerForm: {
                    username: '',
                    password: '',
                    checkPassword: '',
                    vCode: '',
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
                    ],
                    vCode: [
                        {required: true, message: '请输入验证码', trigger: 'blur'},
                        {
                            validator: async (rule,value,cb) => {
                                let res = await this.checkVCode(value);
                                let flag = res.data.data;
                                if (flag){
                                    cb();
                                }else{
                                    cb(new Error('验证码错误'));
                                }
                            },trigger: 'blur'
                        }
                    ]
                },
                registerVCode: {
                    svgCodeHtml: 'loading',
                    refreshDisabled: false,
                    svgCodeText: '刷新',
                    timer: null,
                    num: 59
                }
            }
        },
        mounted() {
            this.getCheckSvgCode();
            this.refresh();
        },
        methods: {
            goHome() {
                this.$router.push('/home')
            },
            refresh() {
                this.registerVCode.refreshDisabled = true;
                this.registerVCode.timer = setInterval(() => {
                    this.registerVCode.svgCodeText = this.registerVCode.num + '秒后刷新!';
                    this.registerVCode.num--;
                    if (this.registerVCode.num === 0){
                        clearInterval(this.registerVCode.timer);
                        this.registerVCode.refreshDisabled = false;
                        this.registerVCode.svgCodeText = '刷新';
                    }
                },1000);
            },
            handleRefresh() {
                this.registerVCode.svgCodeHtml = 'loading';
                this.getCheckSvgCode();
                this.refresh();
            },
            checkVCode(vcode) {
                return userService.checkVCode(vcode);
            },
            getCheckSvgCode() {
                userService.getCheckSvgCode().then(res => {
                    let data = res.data;
                    if (data.code === 0){
                        this.registerVCode.num = 59;
                        this.registerVCode.svgCodeHtml = data.data;
                    }else{
                        clearInterval(this.registerVCode.timer);
                        this.registerVCode.svgCodeHtml = '禁止频繁操作';
                        this.registerVCode.num =parseInt(data.data/1000);
                        this.refresh();
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            registerUser(){
                this.$refs.registerForm.validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {

                        return false;
                    }
                });
            }
        }
    }
</script>

<style lang="less" scoped>
#register{
    user-select: none;
    /*height: 100%;*/
    height: 937px;
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
        .svg-code{
            .el-input{
                float: left;
                width: 40%;
            }
            .svg{
                margin-left: 3%;
                float: left;
                width: 27%;
                /deep/ svg{
                    border-radius: 5px;
                    width: 100%;
                    height: 100%;
                    background-color: #fff;
                }
            }
            .el-link{
                float: left;
                width: 30%;
            }
            /deep/ .el-link.is-underline:hover:after{
                border: none;
            }
        }
        .el-button{
            background: linear-gradient(to right,#ed5a65,#2177b8);
            color: #fff;
            font-weight: bold;
            border: none;
        }
        .home{
            position: absolute;
            color: #fff;
            font-weight: bold;
            font-size: 16px;
            bottom: 0;
            right: 20px;
            cursor: pointer;
        }
    }
}
</style>