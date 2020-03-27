<template>
    <div id="nav">
        <div class="nav-main">
            <div class="n-m-logo">Mr.Gan</div>
            <div class="n-m-login">
                <el-button type="primary" size="mini" id="login" @click="handleNavClick('login')">登录</el-button>
                <el-button type="success" size="mini" id="register" @click="handleNavClick('register')">注册</el-button>
            </div>
            <div class="n-m-nav">
                <ul :class="'list'+whichActive">
                    <li><router-link to="/">首页</router-link></li>
                    <li><router-link to="/blog/0">博客</router-link></li>
                    <li><router-link to="/message">留言</router-link></li>
                    <li><router-link to="/diary">日记</router-link></li>
                    <li><router-link to="/links">友链</router-link></li>
                    <li><router-link to="/about">关于</router-link></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Nav",
        data() {
            return{
                routerList: ['Home','Blog','Message','Diary','Links','About']
            }
        },
        computed: {
            whichActive() {
                let index = this.routerList.indexOf(this.$route.name);
                return index + 1;
            }
        },
        methods: {
            handleNavClick(type) {
                if (type === 'login'){
                    this.$router.push('/login');
                }else{
                    this.$router.push('/register');
                }
            }
        }
    }
</script>

<style lang="less" scoped>
#nav{
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
    height: 60px;
    background-color: #fff;
    > .nav-main{
        box-sizing: border-box;
        width: 100%;
        max-width: 1360px;
        height: 60px;
        margin: 0 auto;
        padding: 0 50px;
        .n-m-logo{
            float: left;
            width: 100px;
            height: 60px;
            line-height: 60px;
            text-align: left;
            color: #777;
            font-size: 40px;
            font-family: BarbaraHand;
        }
        .n-m-login{
            float: right;
            height: 60px;
            line-height: 60px;
            #login {
                background-color: #2177b8;
            }
            #register {
                background-color: #2c9678;
            }
        }
        .n-m-nav{
            float: right;
            width: 576px;
            height: 60px;
            margin-right: 7%;
            ul {
                display: flex;
                width: 100%;
                height: 100%;
                li {
                    flex: 1;
                    a{
                        position: relative;
                        display: block;
                        width: 100%;
                        height: 100%;;
                        line-height: 60px;
                        text-align: center;
                        color: #7a7374;
                        font-weight: 400;
                        font-size: 15px;
                        transition: color .5s;
                        &::after{
                            content: '';
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            margin: 0 auto;
                            width: 0;
                            height: 2px;
                            background-color: #f07c82;
                            transition: width .5s;
                        }
                        &:hover{
                            color: #f07c82;
                            &::after{
                                width: 100%;
                            }
                        }
                    }
                }
                &.list1 li:nth-child(1),
                &.list2 li:nth-child(2),
                &.list3 li:nth-child(3),
                &.list4 li:nth-child(4),
                &.list5 li:nth-child(5),
                &.list6 li:nth-child(6){
                    a{
                        color: #f07c82;
                        &::after {
                            width: 100%;
                        }
                    }
                }
            }
        }
    }
}
</style>