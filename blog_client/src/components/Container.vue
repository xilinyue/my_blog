<template>
    <div id="container">
        <el-container>
            <el-main></el-main>
            <el-aside>
                <div class="search">
                    <div class="search-main">
                        <input type="text" placeholder="请输入搜索内容" />
                        <i class="el-icon-search"></i>
                    </div>
                    <div class="search-article">
                        <ul @mouseleave="handleMouseLeave">
                            <li v-for="(item,index) in articleTypeList" :key="item + index"
                                @mouseenter="handleMouseenter">
                                {{item}}
                            </li>
                        </ul>
                        <div class="cover" :style="{top: coverTop + 'px'}"></div>
                    </div>
                </div>
                <div class="hot">
                    <h2>热门文章</h2>
                    <ul>
                        <li v-for="item in hotArticleList" :key="item.id">
                            <span :class="[{first: item.id === 1},{second: item.id === 2},{third: item.id === 3}]">{{item.id}}</span>
                            <span>{{item.title}}</span>
                        </li>
                    </ul>
                </div>
                <div class="recommend"></div>
                <div class="visitor"></div>
            </el-aside>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Container",
        data() {
            return{
                searchInput: '',
                //文章分类
                articleTypeList: ['全部文章','个人日记','HTML5&CSS3','JavaScript','Vue&Node','其他'],
                coverTop: 0,
                hotArticleList: [
                    {id: 1, title: '模板分享'},
                    {id: 2, title: '2018最新版QQ音乐api调用'},
                    {id: 3, title: '我的第一个C/S项目'},
                    {id: 4, title: '新增QQ音乐和网易云音乐搜索'},
                    {id: 5, title: 'MUI动态加载组件'},
                    {id: 6, title: '逆水寒'},
                    {id: 7, title: 'MUI框架快速开发APP'}
                ]
            }
        },
        methods: {
            handleMouseenter(e) {
                this.coverTop = e.target.offsetTop;
            },
            handleMouseLeave() {
                this.coverTop = 0;
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
            height: 2000px;
            max-width: 1360px;
            margin: 0 auto;
            padding: 0 50px;
            > .el-aside{
                width: 300px;
                height: 1000px;
                > .search{
                    width: 100%;
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
                }
                > .hot{
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
            }
        }
    }
</style>