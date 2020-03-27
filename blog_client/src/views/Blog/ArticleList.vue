<template>
    <div class="article-list">
        <div class="list-item" v-for="(item,index) in articleList" :key="item._id" :class="{'top-one': index === 0}">
            <h5>
                <span>【{{item.type}}】</span>
                <a href="">{{item.title}}</a>
            </h5>
            <div class="time">
                <span class="date">{{item.date | date}}</span>
                <span class="month">
                    {{item.date | month}}
                    <span>月</span>
                </span>
                <span class="year">{{item.date | year}}</span>
            </div>
            <div class="content">
                <a href="javascript:;" class="cover">
                    <img :src="'http://localhost:3000/'+item.surface">
                </a>
                {{item.content.substring(0,50)}}
            </div>
            <div class="read-more">
                <a href="javascript:;">继续阅读</a>
            </div>
            <aside>
                <div>
                    <i class="el-icon-price-tag"></i>
                    <span>{{item.tag}}</span>
                </div>
                <div>
                    <span>
                        <i class="el-icon-view"></i>
                        {{item.pv}}
                    </span>
                    <span>
                        <i class="el-icon-chat-dot-round"></i>
                        {{item.comment.length}}
                    </span>
                </div>
            </aside>
        </div>
    </div>
</template>

<script>
    import articleService from "../../api/articleService";
    export default {
        name: "ArticleList",
        data() {
            return{
                query: {
                    index: 0,
                    skip: 0,
                    limit: 5
                },
                articleList: []
            }
        },
        filters: {
            date(value) {
                let date = new Date(value);
                return date.getDate();
            },
            month(value) {
                let date = new Date(value);
                return date.getMonth() + 1;
            },
            year(value) {
                let date = new Date(value);
                return date.getFullYear();
            }
        },
        computed: {
            id() {
                return this.$route.params.id;
            }
        },
        watch: {
            id() {
                this.query.index = this.id;
                this.getArticleList();
            }
        },
        mounted() {
            this.getArticleList();
        },
        methods: {
            getArticleList() {
                articleService.getArticleList(this.query).then(res => {
                    let data = res.data.data;
                    this.articleList = data;
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    .article-list{
        width: 100%;
        .list-item{
            position: relative;
            box-sizing: border-box;
            width: 100%;
            background-color: #fff;
            /*height: 327px;*/
            padding: 20px 30px 25px;
            margin-bottom: 20px;
            overflow: hidden;
            &.top-one::before{
                content: '置顶';
                position: absolute;
                height: 20px;
                line-height: 20px;
                text-align: center;
                width: 74px;
                background-color: #ff5722;
                color: #fff;
                transform: rotate(-45deg);
                left: -18px;
                top: 9px;
            }
            h5{
                line-height: 30px;
                padding: 5px 130px 5px 0;
                border-bottom: 1px solid #e8e9e7;
                font-size: 18px;
                font-weight: 400;
                span{
                    font-size: 16px;
                    font-weight: 400;
                    display: inline-block;
                    vertical-align: bottom;
                    color: #f07c82;
                }
                a{
                    color: #7a7374;
                    &:hover{
                        color: #ee3f4d;
                    }
                }
            }
            > .time{
                font-family: SourceCodeProRegular,Menlo,Monaco,Consolas,"Courier New",monospace,'Helvetica Neue',Arial,sans-serif;
                position: absolute;
                right: 10px;
                top: 10px;
                background-color: #fff;
                padding: 0 20px 5px 20px;
                line-height: 32px;
                .date{
                    display: block;
                    text-align: center;
                    font-weight: 700;
                    font-size: 40px;
                    color: #6bc30d;
                    position: relative;
                }
                .month{
                    color: #989997;
                    span{
                        font-size: 18px;
                    }
                }
                .year{
                    color: #989997;
                    margin-left: 20px;
                }
            }
            > .content {
                margin: 20px 0 0 0;
                line-height: 28px;
                position: relative;
                min-height: 200px;
                a{
                    color: #3e8bc7;
                    margin: 0 2px;
                    img{
                        display: block;
                        width: 100%!important;
                        height: 100%!important;
                    }
                    &:hover{
                        color: #6bc30d;
                        text-decoration: underline;
                    }
                }
                .cover{
                    display: block;
                    width: 300px;
                    height: 180px;
                    border: 1px solid #e8e9e7;
                    overflow: hidden;
                    float: left;
                    margin-right: 20px;
                }
            }
            .read-more {
                height: 40px;
                line-height: 40px;
                position: relative;
                &::before{
                    content: " ";
                    display: inline-block;
                    height: 1px;
                    top: 20px;
                    left: 100px;
                    right: 0;
                    position: absolute;
                    background-color: #d0d0d0;
                }
                a{
                    color: #383937;
                    font-weight: bold;
                    &:hover{
                        color: #f07c82;
                        text-decoration: underline;
                    }
                }
            }
            aside{
                color: #787977;
                overflow: hidden;
                zoom: 1;
                clear: both;
                div:nth-child(1){
                    float: left;
                    span{
                        margin-left: 10px;
                        background-color: #eee;
                        &:hover{
                            background-color: #f07c82;
                            color: #fff;
                        }
                    }
                }
                div:nth-child(2){
                    float: right;
                    span{
                        margin-left: 10px;
                    }
                }
            }
        }
    }
</style>