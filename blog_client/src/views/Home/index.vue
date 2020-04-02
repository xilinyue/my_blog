<template>
    <div id="home">
        <div class="bg loading" :style="{height: bgHeight + 'px'}">
            <div class="bg-content">
                <h1>流苏</h1>
                <h2>娟娟唯有西林月，不惜清光照竹扉</h2>
                <router-link to="/blog/0">进入博客</router-link>
            </div>
            <i class="icon el-icon-arrow-down"></i>
        </div>
        <div :class="['menu',{'click': ifClick}]">
            <div class="btn" @click="handleClick">
                <span></span><span></span><span></span>
            </div>
            <div class="cover">
                <div class="cover">
                    <div class="point">
                        <router-link to="/">首页</router-link>
                        <router-link to="/blog/0">博客</router-link>
                        <router-link to="/message">留言</router-link>
                    </div>
                    <div class="cover-logo">Mr.Gan</div>
                </div>
            </div>
        </div>
        <div class="hot">
            <div class="hot-main">
                <div class="text loading" ref="text">
                    <h1>热门文章</h1>
                    <div class="line"></div>
                    <div class="desc">很想给你写封信,告诉你这里的天气.
                        昨夜的那场电影,还有我的心情.
                    </div>
                </div>
                <div class="hot-list loading" ref="hotList">
                    <div class="hot-item" v-for="item in hotList">
                        <div class="img">
                            <div class="bgImg" :style="{backgroundImage:'url(http://localhost:3000'+item.surface+')'}"></div>
                            <div class="link">
                                <a href=""><i class="el-icon-link"></i></a>
                            </div>
                        </div>
                        <div class="info">
                            <div class="title">{{item.title}}</div>
                            <div class="time">{{item.date}}</div>
                            <div class="abstract">{{item.content}}</div>
                            <a href="" class="link">阅读更多</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--关于&友链-->
        <div class="about loading">
            <div class="wrap">
                <ul>
                    <li><router-link to="/about">关于</router-link></li>
                    <li><router-link to="/links">+友情链接</router-link></li>
                </ul>
            </div>
        </div>
        <div class="my-info loading">
                <h1>次元使者</h1>
                <p>爱好游戏，动漫。闲来无事喜欢在一些不健康的场所虚度光阴，撸起代码就会废寝忘食。</p>
        </div>
    </div>
</template>

<script>
    import articleService from "../../api/articleService";

    export default {
        name: "index",
        data() {
            return{
                bgHeight: 0,
                ifClick: false,
                hotList: [],
                loadingDom: null
            }
        },
        mounted() {
            this.getBgHeight();
            window.addEventListener('resize', this.getBgHeight);
            // scroll
            this.loadingDom = document.querySelectorAll(".loading");
            this.handleScroll();
            window.addEventListener("scroll",this.handleScroll);
            //获取热门文章
            this.getHostList();

            // console.dir(this.$refs.text.offsetParent);
        },
        methods: {
            getBgHeight() {
                this.bgHeight = window.innerHeight;
            },
            handleClick() {
                this.ifClick = !this.ifClick;
            },
            getTop(dom){
                let top = 0;
                while(dom !== document.body){
                    top += dom.offsetTop;
                    dom = dom.offsetParent;
                }
                return top;
            },
            //滚轮滚动事件
            handleScroll(){
                //六个高度，暂时五个，最后一个还没做完【1/2x,x,x+150,x+800,x+800+280,x+800+280+270】x=bgHeight
                let scrollTop = document.documentElement.scrollTop;
                if (scrollTop > 1200){
                    this.loadingDom[4].classList.remove('loading');
                }else if (scrollTop > 900){
                    this.loadingDom[3].classList.remove('loading');
                }else if (scrollTop > 300){
                    this.loadingDom[2].classList.remove('loading');
                }else if (scrollTop > 150){
                    this.loadingDom[1].classList.remove('loading');
                }else if (scrollTop >= 0){
                    this.loadingDom[0].classList.remove('loading');
                }
            },
            getHostList() {
                articleService.getArticleHot().then(res => {
                    let data = res.data;
                    if (data.code === 0){
                        let list = data.data.slice(0,3);
                        this.hotList = list.map(item => {
                            item.content = item.content.substring(0,50);
                            return item;
                        })
                    }
                })
            }
        },
        destroyed() {
            window.removeEventListener("resize",this.getWindowHeight);
        }
    }
</script>

<style lang="less" scoped>
#home{
    user-select: none;
    /*width: 100%;*/
    overflow: hidden;
    .bg{
        position: relative;
        z-index: 9;
        width: 100%;
        background: url("../../assets/img/home-bg.jpg") center center / cover;
        &::before{
            position: absolute;
            content: "";
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,.2);
        }
        &.loading{
            .bg-content {
                transform: scale(0);
                opacity: 0;
            }
            i{
                bottom: 0;
            }
        }
        .bg-content{
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto;
            width: 100%;
            height: 154px;
            text-align: center;
            font-size: 14px;
            line-height: 24px;
            color: white;
            transform: scale(1);
            opacity: 1;
            transition: all .5s;
            h1{
                font-weight: 400;
                font-size: 2em;
            }
            h2{
                font-weight: 400;
                letter-spacing: 10px;
                margin: 20px 0;
                font-size: 1em;
            }
            a{
                display: inline-block;
                height: 38px;
                line-height: 38px;
                padding: 0 18px;
                background-color: #2177b8;
                color: #fff;
                white-space: nowrap;
                text-align: center;
                font-size: 14px;
                border: none;
                border-radius: 2px;
                cursor: pointer;
                margin-top: 20px;
                transition: opacity .3s;
                &:hover{
                    opacity: .8;
                }
            }
        }
        i{
            position: absolute;
            left: 50%;
            width: 40px;
            height: 40px;
            line-height: 40px;
            margin-left: -20px;
            color: #fff;
            font-size: 26px;
            font-weight: bold;
            text-align: center;
            bottom: 30px;
            border-radius: 50%;
            cursor: pointer;
            transition: bottom .5s;
            &:hover{
                background-color: #ee3f4d;
            }
        }
    }
    .menu {
        &.click{
            .btn{
                background-color: rgba(0, 0, 0, 0.1);
                span:nth-child(1){
                    top: 8px;
                    transform: rotate(45deg);
                }
                span:nth-child(2){
                    top: 1px;
                    transform: rotate(-45deg);
                }
                span:nth-child(3){
                    display: none;
                }
            }
            .cover{
                opacity: 1;
                z-index: 10;
                &::before{
                    left: 65%;
                }
            }
        }
        .btn {
            box-sizing: border-box;
            position: fixed;
            z-index: 999;
            right: 55px;
            top: 40px;
            padding-top: 12px;
            width: 40px;
            height: 40px;
            cursor: pointer;
            border-radius: 50%;
            background-color: transparent;
            transition: background-color .3s;
            &:hover {
                background-color: #6bc30d;
            }
            span {
                position: relative;
                top: 0;
                display: block;
                width: 26px;
                height: 2px;
                margin: 0 auto 5px;
                background-color: #fff;
                transition: all .32s;
                transform: rotate(0deg);
            }
        }
        .cover {
            opacity: 0;
            z-index: 8;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,.3);
            transition: opacity .3s;
            &::before{
                position: absolute;
                left: 100%;
                top: 0;
                content: "";
                width: 4999px;
                height: 100%;
                background-color: #F9F9F8;
                transform: skew(-12deg);
                transition: left .3s;
            }
            .point{
                position: absolute;
                right: 0;
                top: 200px;
                z-index: 101;
                font-size: 20px;
                a{
                    position: relative;
                    display: block;
                    text-align: right;
                    color: #686967;
                    line-height: 46px;
                    padding: 10px 30px;
                    margin-right: 20px;
                    font-size: 20px;
                    text-decoration: none;
                    -webkit-transition: color .6s linear;
                    transition: color .6s linear;
                    &::before{
                        position: absolute;
                        top: 50%;
                        left: 0;
                        width: 0;
                        opacity: 0;
                        height: 1px;
                        background-color: #6bc30d;
                        content: "";
                        transition: all .3s;
                    }
                    &:hover{
                        color: #6bc30d;
                    }
                    &:hover::before{
                        width: 100%;
                        opacity: 1;
                    }
                }
            }
            .cover-logo{
                font-size: 50px;
                position: absolute;
                right: 0;
                bottom: 0;
                z-index: 101;
                padding: 10px 50px;
                font-family: BarbaraHand;
                color: #686967;
                cursor: pointer;
            }
        }
    }
    .hot{
        overflow: hidden;
        position: relative;
        z-index: 9;
        padding: 100px 0;
        width: 100%;
        background-color: #fff;
        .hot-main {
            max-width: 1170px;
            width: 100%;
            margin: 0 auto;
            text-align: center;
            .text{
                /*position: absolute;*/
                width: 100%;
                transition: transform .5s;
                &.loading{
                    transform: translateY(-100%);
                }
                h1 {
                    width: 100%;
                    text-align: center;
                    font-size: 32px;
                    padding-bottom: 20px;
                    font-weight: 500;
                }
                .line {
                    margin: 10px auto;
                    height: 2px;
                    background-color: #2177b8;
                    width: 50px;
                }
                .desc {
                    width: 230px;
                    height: 50px;
                    line-height: 25px;
                    font-size: 14px;
                    color: #7a7374;
                    margin: 0 auto;
                    text-align: center;
                }
            }
            .hot-list {
                display: flex;
                width: 100%;
                height: 503px;
                margin-top: 50px;
                div.hot-item{
                    position: relative;
                    top: 0;
                    height: 503px;
                    flex: 1;
                    padding: 0 10px;
                    opacity: 1;
                    &:hover .img .link{
                        top: 0;
                        opacity: 1;
                    }
                    .img{
                        overflow: hidden;
                        position: relative;
                        width: 100%;
                        height: 244px;
                        .bgImg{
                            width: 100%;
                            height: 100%;
                            background-position: center center;
                            background-size: cover;
                        }
                        .link{
                            position: absolute;
                            top: -100%;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background-color: rgba(255,255,255,.3);
                            opacity: 0;
                            transition: .3s;
                            a{
                                position: absolute;
                                left: 50%;
                                top: 50%;
                                margin-top: -20px;
                                margin-left: -20px;
                                width: 40px;
                                height: 40px;
                                background: #333;
                                color: #fff;
                                line-height: 40px;
                                text-align: center;
                                i{
                                    font-size: 16px;
                                }
                            }

                        }
                    }
                    .info{
                        box-sizing: border-box;
                        overflow: hidden;
                        width: 100%;
                        padding: 30px 15px 15px;
                        background: #FAF9F9;
                        text-align: left;
                        .title{
                            margin-bottom: 10px;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                            a{
                                color: #333;
                                &:hover{
                                    color: #777;
                                }
                            }
                        }
                        .time{
                            color: #bbb;
                            font-size: 12px;
                            margin-bottom: 15px;
                        }
                        .abstract{
                            overflow: hidden;
                            line-height: 20px;
                            height: 60px;
                            color: #999;
                        }
                        .link{
                            display: inline-block;
                            margin-top: 15px;
                            padding: 0;
                            background: 0 0;
                            border: none;
                            color: #29b6f6;
                            transition: all .4s ease;
                            &:hover{
                                color: #333;
                            }
                        }
                    }
                }
                div.hot-item:nth-child(1){
                    transition: 1s 0s;
                }
                div.hot-item:nth-child(2){
                    transition: 1s .1s;
                }
                div.hot-item:nth-child(3){
                    transition: 1s .2s;
                }
                &.loading > div{
                    top: 100px;
                    opacity: 0;
                }
            }
        }
    }
    .about{
        overflow: hidden;
        position: relative;
        z-index:9;
        width: 100%;
        height: 48px;
        padding: 111px 0;
        margin: 0 auto;
        background: url("../../assets/img/22.jpg") center center/cover fixed;
        &::after{
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            z-index: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,.5);
        }
        &.loading ul{
            width: 700px;
            opacity: 0;
        }
        ul {
            position: relative;
            z-index: 9;
            width: 425px;
            margin: 0 auto;
            opacity: 1;
            transition: all .5s;
            li {
                position: relative;
                width: 198px;
                height: 46px;
                border: 1px solid #fff;
                &:nth-child(1){
                    float: left;
                }
                &:nth-child(2){
                    float: right;
                }
                &::after{
                    position: absolute;
                    left: 0;
                    top: 0;
                    content: "";
                    width: 0;
                    height: 46px;
                    background-color: #6bc30d;
                    transition: width .5s;
                }
                &:hover::after{
                    width: 100%;
                }
                a{
                    position: relative;
                    z-index: 1;
                    display: block;
                    width: 100%;
                    height: 100%;
                    line-height: 46px;
                    text-align: center;
                    color: #fff;
                }
            }
        }
    }
    .my-info{
        position: relative;
        z-index:9;
        width: 100%;
        padding: 100px 0;
        text-align: center;
        background-color: #fff;
        h1{
            font-weight: 500;
            margin-bottom: 20px;
            transform: translateX(0);
            opacity: 1;
            transition: all .5s;
        }
        p{
            transform: translateX(0);
            opacity: 1;
            transition: all .5s;
        }
        &.loading{
            h1{
                transform: translateX(-300px);
                opacity: 0;
            }
            p{
                transform: translateX(300px);
                opacity: 0;
            }
        }
    }
}
</style>