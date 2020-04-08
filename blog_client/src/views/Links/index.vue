<template>
    <div id="links">
        <Nav></Nav>
        <div class="canvas">
            <div class="canvas-text">
                <h1>友情链接</h1>
                <p>世间安得双全法，不负如来也不负卿.</p>
            </div>
            <MyCanvas></MyCanvas>
        </div>
        <div class="container">
            <div class="rule">
                <h1><i class="el-icon el-icon-more"></i>链接申请说明</h1>
                <div class="info">
                    <i class="el-icon el-icon-close"></i>经常宕机
                    <i class="el-icon el-icon-close"></i>不合法规
                    <i class="el-icon el-icon-close"></i>插边球站
                    <i class="el-icon el-icon-close"></i>红标报毒
                    <i class="el-icon el-icon-check"></i>原创优先
                    <i class="el-icon el-icon-check"></i>技术优先
                </div>
                <p>交换友链可在留言板留言.本站链接如下：</p>
                <p>名称：Mr.Gan</p>
                <p>网址：https://www.mrgan.cn</p>
                <p>图标：</p>
                <p>描述：Mr.Gan·一个人的江湖</p>

                <p>申请提交后若无其它原因将在24小时内审核,如超过时间还未通过,请私信我.(各种额外因素)</p>
            </div>
            <ul class="links-list">
                <li class="links-item" v-for="(item,index) in linksList" :key="index">
                    <a :href="item.href" target="_blank">
                        <img :src="item.icon" alt="">
                        <h3>{{item.name}}</h3>
                        <p>{{item.desc}}</p>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Nav from "../../components/Nav";
    import MyCanvas from "./Canvas";
    export default {
        name: "index",
        components: {
            Nav,MyCanvas
        },
        data() {
            return{
                linksList: [
                    {name: '风尘局',href: 'https://www.fengchenju.xyz',icon: 'https://www.fengchenju.xyz/avatar.png',desc: '热爱并坚持使用.NET的全栈开发者的博客'},
                    {name: '风尘局',href: 'https://www.fengchenju.xyz',icon: 'https://www.fengchenju.xyz/avatar.png',desc: '热爱并坚持使用.NET的全栈开发者的博客'},
                    {name: '风尘局',href: 'https://www.fengchenju.xyz',icon: 'https://www.fengchenju.xyz/avatar.png',desc: '热爱并坚持使用.NET的全栈开发者的博客'},
                    {name: '风尘局',href: 'https://www.fengchenju.xyz',icon: 'https://www.fengchenju.xyz/avatar.png',desc: '热爱并坚持使用.NET的全栈开发者的博客'},
                    {name: '风尘局',href: 'https://www.fengchenju.xyz',icon: 'https://www.fengchenju.xyz/avatar.png',desc: '热爱并坚持使用.NET的全栈开发者的博客'},
                    {name: '风尘局',href: 'https://www.fengchenju.xyz',icon: 'https://www.fengchenju.xyz/avatar.png',desc: '热爱并坚持使用.NET的全栈开发者的博客'},
                    {name: '风尘局',href: 'https://www.fengchenju.xyz',icon: 'https://www.fengchenju.xyz/avatar.png',desc: '热爱并坚持使用.NET的全栈开发者的博客'},
                    {name: '风尘局',href: 'https://www.fengchenju.xyz',icon: 'https://www.fengchenju.xyz/avatar.png',desc: '热爱并坚持使用.NET的全栈开发者的博客'},
                    {name: '风尘局',href: 'https://www.fengchenju.xyz',icon: 'https://www.fengchenju.xyz/avatar.png',desc: '热爱并坚持使用.NET的全栈开发者的博客'}
                ]
            }
        }
    }
</script>

<style lang="less" scoped>
#links{
    width: 100%;
    padding-top: 60px;
    .canvas{
        position: relative;
        width: 100%;
        height: 260px;
        .canvas-text{
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            width: 360px;
            height: 100px;
            margin: auto;
            color: #fff;
            h1{
                width: 100%;
                text-align: center;
                margin-bottom: 10px;
            }
            p{
                width: 100%;
                text-align: center;
                font-size: 18px;
            }
        }
    }
    .container{
        max-width: 1360px;
        width: 100%;
        margin: 0 auto;
        padding: 20px 15px;
        .rule{
            position: relative;
            box-sizing: border-box;
            width: 100%;
            height: 300px;
            background-color: #fff;
            padding: 10px 30px;
            h1{
                font-size: 20px;
                margin-bottom: 15px;
                i{
                    position: absolute;
                    top: 15px;
                    left: 5px;
                    transform: rotate(90deg);
                    color: #f07c82;
                }
            }
            .info{
                margin-bottom: 15px;
                i{
                    font-weight: 900;
                }
            }
            p{
                line-height: 26px;
            }
            p:nth-last-of-type(1){
                position: absolute;
                bottom: 40px;
            }
        }
        .links-list{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            box-sizing: border-box;
            margin-top: 20px;
            .links-item{
                background-color: #fff;
                width: 23%;
                margin-bottom: 1.5%;
                padding: 0 10px 10px;
                box-sizing: border-box;
                transition: transform .5s;
                &:hover{
                    transform: translateY(-8px);
                    box-shadow:  0 0 5px #EEE;
                }
                a{
                    box-sizing: border-box;
                    display: block;
                    padding: 10px 20px 10px;
                    color: #7a7374;

                    img{
                        width: 40px;
                        height: 40px;
                        border-radius: 100%;
                    }
                    h3{
                        display: inline-block;
                        overflow: hidden;
                        padding: 10px 15px 9px;
                        height: 26px;
                        line-height: 26px;
                        font-weight: 400;
                    }
                    p{
                        margin-top: 10px;
                    }
                }
            }
        }
    }
}
</style>