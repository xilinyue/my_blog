<template>
    <div id="container">
        <el-container>
            <el-main>
                <article-list></article-list>
            </el-main>
            <el-aside>
                <div class="search" :class="{'fixed-active': isHasFixed}">
                    <div class="search-main">
                        <input type="text" placeholder="请输入搜索内容" />
                        <i class="el-icon-search"></i>
                    </div>
                    <div class="search-article">
                        <ul @mouseleave="handleMouseLeave">
                            <li v-for="(item,index) in articleTypeList" :key="item + index"
                                @mouseenter="handleMouseenter(index)" @click="changeIndex(index)">
                                {{item}}
                            </li>
                        </ul>
                        <div class="cover" :style="{top: coverTop * 40 + 'px'}"></div>
                    </div>
                </div >
                <div class="hot">
                    <h2>热门文章</h2>
                    <ul>
                        <li v-for="(item,index) in hotArticleList" :key="index">
                            <span :class="[{first: index === 0},{second: index === 1},{third: index === 2}]">{{index+1}}</span>
                            <span>{{item.title}}</span>
                        </li>
                    </ul>
                </div>
                <div class="recommend">
                    <h2>置顶推荐</h2>
                    <ul>
                        <li v-for="(item,index) in getArticleRecommend" :key="index">
                            <span :class="{first: index === 0}">{{index+1}}</span>
                            <span>{{item.title}}</span>
                        </li>
                    </ul>
                </div>
                <div class="visitor">
                    <h2>最近访客</h2>
                    <ul>
                        <li v-for="(item,index) in visitorList" :style="{backgroundImage: `url(http://localhost:3000${item.photo})`}">
                            <span>{{item.username}}</span>
                        </li>
                    </ul>
                </div>
            </el-aside>
        </el-container>
    </div>
</template>

<script>
    import articleService from "../../api/articleService";
    import ArticleList from "./ArticleList";
    export default {
        name: "Container",
        components: {
            ArticleList
        },
        data() {
            return{
                searchInput: '',
                isHasFixed: false,
                //文章分类
                articleTypeList: ['全部文章','个人日记','HTML5&CSS3','JavaScript','Vue&Node','其他'],
                coverTop: this.$route.params.id,
                hotArticleList: [{title: ''}],
                visitorList: [
                    {photo: '/images/defaultSurface.png',username: '小钰'},
                    {photo: '/images/defaultSurface.png',username: '西林月'},
                    {photo: '/images/defaultSurface.png',username: '流苏'},
                    {photo: '/images/defaultSurface.png',username: '青蛇'},
                    {photo: '/images/defaultSurface.png',username: '醉拳'},
                    {photo: '/images/defaultSurface.png',username: '梦游小子'},
                    {photo: '/images/defaultSurface.png',username: '梦里生'},
                    {photo: '/images/defaultSurface.png',username: '轮回'},
                    {photo: '/images/defaultSurface.png',username: '青釉'},
                    {photo: '/images/defaultSurface.png',username: '迷彩'},
                    {photo: '/images/defaultSurface.png',username: '心幽'},
                    {photo: '/images/defaultSurface.png',username: '胖迪'},
                ]
            }
        },
        created() {
            this.getArticleInfo();
            this.getArticleHot();
        },
        mounted() {
            //监听window的滚动事件
            window.addEventListener('scroll',this.handleScroll)
        },
        methods: {
            handleMouseenter(index) {
                this.coverTop = index;
            },
            handleMouseLeave() {
                this.coverTop = this.$route.params.id;
            },
            handleScroll() {
                let top = document.documentElement.scrollTop;
                if (top >= 1222){
                    this.isHasFixed = true;
                }else{
                    this.isHasFixed = false;
                }
            },
            changeIndex(index){
                this.$router.push("/blog/"+index);
            },

            //获取文章信息
            async getArticleInfo() {
                let res = await articleService.getArticleInfo();
                let data = res.data;
                if (data.code === 0){
                    this.articleTypeList = data.data.tags;
                    this.articleTypeList.unshift('全部文章');
                }
            },
            //获取热门文章
            async getArticleHot() {
                let res = await articleService.getArticleHot();
                let data = res.data;
                if (data.code === 0){
                    this.hotArticleList = data.data;
                }
            },
        },
        computed: {
            //计算置顶推荐文章
            getArticleRecommend() {
                return [this.hotArticleList[0]] || [];
            },

            id() {
                return this.$route.params.id;
            }
        },
        watch: {
            id() {
                this.coverTop = this.$route.params.id;
            }
        }
    }
</script>

<style lang="less" scoped>
    #container{
        width: 100%;
        padding-top: 80px;
        user-select: none;
        > .el-container{
            box-sizing: border-box;
            width: 100%;
            max-width: 1360px;
            margin: 0 auto;
            padding: 0 50px;
            > .el-main{
                padding-top: 0;
            }
            > .el-aside{
                width: 300px;
                > .search{
                    width: 300px;
                    z-index: 3;
                    background: #fff;
                    > .search-main{
                        position: relative;
                        width: 100%;
                        height: 80px;
                        box-sizing: border-box;
                        padding: 20px;
                        background-color: #36282b;
                        input{
                            width: 100%;
                            height: 40px;
                            border-radius: 20px;
                            border: 0;
                            outline: 0;
                            text-indent: 2em;
                        }
                        i{
                            position: absolute;
                            top: 29px;
                            right: 35px;
                            width: 22px;
                            height: 22px;
                            color: #7a7374;
                            font-weight: 900;
                            font-size: 18px;
                            line-height: 22px;
                            text-align: center;
                            cursor: pointer;
                            &:hover{
                                color: #f07c82;
                            }
                        }
                    }
                    > .search-article {
                        position: relative;
                        width: 100%;
                        margin-top: 20px;
                        padding-bottom: 10px;
                        ul {
                            width: 100%;
                            li{
                                position: relative;
                                z-index: 1;
                                box-sizing: border-box;
                                width: 100%;
                                height: 40px;
                                line-height: 40px;
                                padding: 0 30px;
                                border-bottom: 1px dotted #eee;
                                cursor: pointer;
                            }
                        }
                        .cover{
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 40px;
                            box-sizing: border-box;
                            border-right: 5px solid #36282b;
                            background-color: rgba(0,0,0,0.05);
                            transition: top .3s;
                        }
                    }
                    &.fixed-active{
                        position: fixed;
                        top: 80px;
                        animation: searchMove 1s ease-in-out;
                    }
                    @keyframes searchMove {
                        0% {
                            top: -500px;
                        }
                        40%{
                            top: 80px;
                        }
                        70%{
                            top: 60px;
                        }
                        100% {
                            top: 80px;
                        }
                    }
                }
                > .hot, .recommend{
                    width: 100%;
                    background-color: #fff;
                    margin-top: 20px;
                    padding: 20px;
                    box-sizing: border-box;
                    h2 {
                        width: 100%;
                        font-weight: lighter;
                        font-size: 20px;
                        color: #7a7374;
                        border-bottom: 1px solid #dad4cb;
                        padding-bottom: 7px;
                        margin-bottom: 10px;
                    }
                    ul {
                        width: 100%;
                        color: #7a7374;
                        li {
                            height: 40px;
                            line-height: 40px;
                            span:nth-child(1){
                                display: inline-block;
                                width: 20px;
                                height: 20px;
                                text-align: center;
                                line-height: 20px;
                                background-color: #dad4cb;
                                border-radius: 50%;
                                margin-right: 7px;
                                &.first{
                                    background-color: #ed5a65;
                                    color: #fff;
                                    font-weight: bold;
                                }
                                &.second{
                                    background-color: #2177b8;
                                    color: #fff;
                                    font-weight: bold;
                                }
                                &.third{
                                    background-color: #2c9678;
                                    color: #fff;
                                    font-weight: bold;
                                }
                            }
                            span:nth-child(2){
                                cursor: pointer;
                                &:hover{
                                    color: #f07c82;
                                    text-decoration: underline;
                                }
                            }
                        }
                    }
                }
                > .visitor {
                    width: 100%;
                    background-color: #fff;
                    margin-top: 20px;
                    padding: 20px;
                    box-sizing: border-box;
                    h2 {
                        width: 100%;
                        font-weight: lighter;
                        font-size: 20px;
                        color: #7a7374;
                        border-bottom: 1px solid #dad4cb;
                        padding-bottom: 7px;
                        margin-bottom: 10px;
                    }
                    ul{
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        li{
                            position: relative;
                            width: 60px;
                            height: 60px;
                            background-repeat: no-repeat;
                            background-size: cover;
                            text-align: center;
                            cursor: pointer;
                            span{
                                position: absolute;
                                left: 0;
                                right: 0;
                                bottom: 0;
                                background-color: #CCCCCC30;
                                font-size: 12px;
                                color: #fff;
                            }
                        }
                    }
                }
            }
        }
    }
</style>