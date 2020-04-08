<template>
    <div class="container">
        <Nav></Nav>
        <div class="main">
            <div class="article">
                <div v-if="hasData">
                    <div class="article-head">
                        <div class="info">
                            <h3 class="title">{{articleInfo.title}}</h3>
                            <div class="o-info">
                                <span>作者：<a href="javascript:;">Mr.Gan</a></span>
                                <span>围观群众：{{articleInfo.pv}}</span>
                                <span>更新于 {{articleInfo.updateDate | getTime}}</span>
                            </div>
                        </div>
                        <div class="date">
                            <div>{{articleInfo.date | year}}</div>
                            <div>{{articleInfo.date | month}}月</div>
                            <div>{{articleInfo.date | date}}</div>
                        </div>
                    </div>
                    <div class="content">
                    {{articleInfo.content}}
                </div>
                </div>
                <div class="no-data" v-else>暂无数据</div>
                <div class="description">
                    <p>非特殊说明，本文版权归 Mr.Gan 所有，转载请注明出处.</p>
                    <p>本文标题： <a href="javascript:;">{{articleInfo.title}}</a></p>
                    <p>本文网址： <router-link :to="'/articleDetail/' + articleInfo._id">http://localhost:8080/#/articleDetail/{{articleInfo._id}}</router-link></p>
                </div>
                <div class="music"></div>
                <div class="extend" v-if="hasExtendData">
                    <div class="extend-head">延伸阅读</div>
                    <ul class="extend-list">
                        <li v-for="(item,index) in articleExtendList" :key="index">
                            <span>◈</span><router-link :to="'/articleDetail/' + item._id">{{item.title}}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="operation">
                <ul>
                    <li></li>
                </ul>
            </div>
            <div class="comment">
                <h3>发表评论</h3>
                <RichText @Sub="submitComment"></RichText>
            </div>
            <ul class="comment-list">
                <li class="comment-item" v-for="(item,index) in commentList" :key="item._id">
                    <div class="p-avatar" :style="{'backgroundImage': 'url('+item.user.avatar+')'}"></div>
                    <div class="main-info">
                        <div class="p-username">{{item.user.username}}</div>
                        <div class="p-content" v-html="item.content">
                        </div>
                        <div class="time">
                            <span>{{item.date}}</span>
                            <span @click="replyClick(index)">
                                {{(item.reply.lastIndexArr[0]===index && item.reply.lastIndexArr[1]===undefined)?"收起":"回复"}}
                            </span>
                        </div>
                        <ul class="sub-list">
                            <li class="sub-item" v-for="(subItem,childIndex) in item.children">
                                <div class="sub-avatar" :style="{'backgroundImage': 'url('+subItem.user.avatar+')'}"></div>
                                <div>
                                    <div class="sub-info">
                                        <span>{{subItem.user.username}}</span>
                                        <span>回复</span>
                                        <span>{{subItem.atUserName}}</span>
                                    </div>
                                    <div class="sub-content">
                                        {{subItem.content}}
                                    </div>
                                    <div class="time">
                                        <span>{{subItem.date}}</span>
                                        <span @click="replyClick(index,childIndex)">
                                            {{(item.reply.lastIndexArr[0]===index && item.reply.lastIndexArr[1]===childIndex)?"收起":"回复"}}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div :class="['reply',{'show': item.reply.ifShow}]">
                            <textarea :placeholder="'回复【'+ item.reply.atUserName+'】'" v-model="item.reply.content"></textarea>
                            <el-button type="success" size="mini" @click="submitSubComment(index)">提交</el-button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Nav from "../../components/Nav";
    import RichText from "../../components/RichText";
    import articleService from "../../api/articleService";
    import userService from "../../api/userService";
    export default {
        name: "ArticleDetail",
        components: {
            Nav,RichText
        },
        data(){
            return{
                articleInfo: {},
                hasData: false,
                id: '',
                articleExtendList: [],
                hasExtendData: false,
                commentList: []
            }
        },
        filters: {
            getTime(value) {
                let date = new Date(value);
                return date.toDateString() + ' ' + date.toLocaleTimeString();
            },
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
        mounted() {
            this.id = this.$route.params.id;
            this.getArticleDetailById();
            this.getArticleCommentByArticleId();
        },
        methods: {
            getArticleDetailById() {
                articleService.getArticleDetailById(this.id).then(res => {
                   let data = res.data;
                   if (data.code === 0){
                       this.articleInfo = data.data;
                       this.getArticleListExtend(this.articleInfo.tag);
                       this.hasData = true
                   }else{
                       this.$router.push('/notfound');
                   }
                }).catch(err => {
                    this.$router.push('/notfound');
                });
            },
            getArticleListExtend(tag) {
                articleService.getArticleListExtend(tag).then(res => {
                    let data = res.data;
                    if (data.code === 0){
                        this.articleExtendList = data.data;
                        this.hasExtendData = true;
                    }else if (data.code === 1){
                        this.articleExtendList = data.data;
                        this.hasExtendData = false
                    }
                })
            },
            getArticleCommentByArticleId() {
                articleService.getArticleCommentByArticleId(this.id).then(res => {
                    let data = res.data.comment;
                    data.map(item => {
                        item.reply = {
                            userId : "",//id
                            content : "",//回复内容
                            atUserName : "",//字符串
                            date : "",//日期
                            ifShow : false,
                            lastIndexArr : []
                        };
                        return item;
                    });
                    this.commentList = data;
                });
            },
            submitComment(value) {
                if (!value){
                    layer.msg('请输入内容', {icon: 2});
                    return false;
                }
                userService.getIfUserLogin().then(res => {
                    let data = res.data;
                    if (!data.ifLogin) {
                        layer.msg('清先登录', {icon: 2});
                    }else{
                        articleService.addArticleCommentById(this.id,data.data._id,value).then(res => {
                            if (res.data.code === 0){
                                layer.msg('评论成功', {icon: 1});
                                //后续操作
                                // TODO 需要清除内容并且重新获取留言列表，不想刷新整个页面
                                setTimeout(function () {
                                    window.location.reload()
                                },1000)
                            }else{
                                layer.msg(res.data.msg, {icon: 2});
                            }
                        }).catch(err => {
                            layer.msg('服务器错误~请稍后重试', {icon: 2});
                        })
                    }
                });
            },
            replyClick(pIndex,cIndex){
                if (pIndex === undefined)return;
                let parentData = this.commentList[pIndex];
                //两次点的同一个
                if ((pIndex === parentData.reply.lastIndexArr[0] && cIndex === parentData.reply.lastIndexArr[1])) {
                    parentData.reply.ifShow = false;
                    parentData.reply.lastIndexArr=[];
                }else{
                    //不是同一个
                    parentData.reply.ifShow = true;
                    parentData.reply.lastIndexArr=[pIndex,cIndex];
                }
                if (cIndex === undefined){
                    //不是点的子回复
                    parentData.reply.atUserName = parentData.user.username;
                }else{
                    //点的子回复
                    parentData.reply.atUserName = parentData.children[cIndex].user.username
                }
            },
            submitSubComment(index) {
                //判断是否登录
                userService.getIfUserLogin().then(res => {
                    let data = res.data;
                    if (!data.ifLogin) {
                        layer.msg('清先登录', {icon: 2});
                    }else{
                        articleService.addArticleSubCommentById({
                            commentId: this.commentList[index]._id,
                            userId: data.data._id,
                            content: this.commentList[index].reply.content,
                            atUserName: this.commentList[index].reply.atUserName}
                        ).then(res => {
                            if (res.data.code === 0){
                                layer.msg('评论成功', {icon: 1});
                                //后续操作
                                // TODO 需要清除内容并且重新获取留言列表，不想刷新整个页面
                                setTimeout(function () {
                                    window.location.reload()
                                },1000)
                            }else{
                                layer.msg(res.data.msg, {icon: 2});
                            }
                        }).catch(err => {
                            layer.msg('服务器错误~请稍后重试', {icon: 2});
                        })
                    }
                })
            }
        },
        watch: {
            $route (to, from) {
                this.$router.go(0)
            }
        }
    }
</script>

<style lang="less" scoped>
.container{
    width: 100%;
    box-sizing: border-box;
    padding: 70px 50px;
    .main{
        max-width: 1360px;
        width: 100%;
        margin: 0 auto;
        background-color: #fff;
        padding: 30px 25px 30px;
        > .article{
            width: 100%;
            .article-head{
                width: 100%;
                height: 60px;
                box-sizing: border-box;
                border-bottom: 1px solid #eee;
                margin-bottom: 10px;
                div.info{
                    float: left;
                    h3.title{
                        font-size: 20px;
                        margin-bottom: 7px;
                    }
                    div.o-info{
                        color: #787977;
                        span{
                            margin: 0 7px;
                        }
                        >span:nth-child(1){
                            a{
                                color: #3e8bc7;
                            }
                            a:hover{
                                text-decoration: underline;
                            }
                        }
                    }
                }
                div.date{
                    height: 60px;
                    float: right;
                    position: relative;
                    div{
                        position: absolute;
                        font-size: 15px;
                    }
                    div:nth-child(1){
                        color: #787977;
                        bottom: 16px;
                        left: -30px;
                    }
                    div:nth-child(2){
                        color: #787977;
                        bottom: 15px;
                        left: -60px;
                    }
                    div:nth-child(3){
                        font-size: 40px;
                        color: #f07c82;
                        top: -16px;
                        left: -45px;
                    }
                }
            }
            .content{
                margin: 10px 0 20px;
                line-height: 28px;
            }
            .no-data{
                width: 100%;
                height: 200px;
                line-height: 200px;
                text-align: center;
            }
            .description{
                background-color: #f8f9f7;
                padding: 15px 20px;
                line-height: 22px;
                text-shadow: 0 1px 0 rgba(255,255,255,.8);
                font-size: 12px;
                color: #787977;
                p:nth-child(2),p:nth-child(3){
                    a{
                        color: #3e8bc7;
                        font-size: 15px;
                    }
                }
            }
            .extend{
                width: 100%;
                margin: 20px 0 0;
                .extend-head{
                    background-color: #f8f9f7;
                    font-size: 18px;
                    padding: 7px 0 7px 20px;
                    border-left: 3px solid #f07c82;
                }
                .extend-list{
                    padding: 20px 0;
                    li{
                        line-height: 28px;
                        span{
                            margin-right: 8px;
                        }
                        a{
                            color: #3e8bc7
                        }
                    }
                }
            }
        }
        > .operation{
            box-sizing: border-box;
            width: 100%;
            padding: 25px;
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
            height: 110px;
            ul{
                width: 350px;
                margin: 0 auto;
            }
        }
        > .comment{
            position: relative;
            width: 100%;
            box-sizing: border-box;
            border-top: 1px solid #eee;
            margin-top: 20px;
            h3{
                position: absolute;
                background-color: #fff;
                height: 30px;
                line-height: 30px;
                width: 100px;
                text-align:  center;
                top: -38px;
                left: 20px;
                font-size: 20px;
                font-weight: 300;
            }
        }
        > .comment-list{
            width: 100%;
            box-sizing: border-box;
            padding: 20px 0 0;
            > li.comment-item{
                width: 100%;
                box-sizing: border-box;
                display: flex;
                border-bottom: 1px dashed #eee;
                margin-bottom: 7px;
                padding-bottom: 10px;
                > div.p-avatar{
                    box-sizing: border-box;
                    width: 50px;
                    height: 50px;
                    background-size: cover;
                    border-radius: 50%;
                }
                > div.main-info{
                    width: 100%;
                    box-sizing: border-box;
                    margin-left: 10px;
                    overflow: hidden;
                    > .p-username{
                        height: 50px;
                        line-height: 50px;
                    }
                    > .p-content{
                        margin: 7px 0;
                    }
                    > .time{
                        color: #7a7374;
                        margin-bottom: 7px;
                        padding-bottom: 7px;
                        span:nth-child(1){
                            margin-right: 7px;
                        }
                        span:nth-child(2){
                            color: #2177b8;
                            cursor: pointer;
                            &:hover{
                                text-decoration: underline;
                            }
                        }
                    }
                    > ul.sub-list{
                        width: 100%;
                        box-sizing: border-box;
                        li.sub-item{
                            position: relative;
                            width: 100%;
                            display: flex;
                            .sub-avatar{
                                width: 50px;
                                height: 50px;
                                box-sizing: border-box;
                                background-size: cover;
                                border-radius: 50%;
                                margin-right: 10px;
                            }
                            .sub-info{
                                top: 0;
                                left: 60px;
                                span{
                                    margin-right: 10px;
                                }
                                span:nth-child(1),span:nth-child(3){
                                    color: #2177b8;
                                }
                            }
                            .sub-content{
                                margin: 10px 0;
                            }
                            .time{
                                color: #7a7374;
                                margin-bottom: 7px;
                                padding-bottom: 7px;
                                span:nth-child(1){
                                    margin-right: 7px;
                                }
                                span:nth-child(2){
                                    color: #2177b8;
                                    cursor: pointer;
                                    &:hover{
                                        text-decoration: underline;
                                    }
                                }
                            }
                        }
                    }
                    >div.reply{
                        width: 100%;
                        height: 0;
                        transition: height .3s;
                        &.show{
                            height: 110px;
                        }
                        textarea{
                            box-sizing: border-box;
                            padding: 10px;
                            width: 100%;
                            height: 60px;
                            display: block;
                            margin-bottom: 10px;
                        }
                    }
                }
            }
        }
    }
}
</style>