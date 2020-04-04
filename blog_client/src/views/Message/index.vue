<template>
    <div id="message">
        <Nav></Nav>
        <div class="message-main">
            <div class="message-edit">
                <div class="desc">
                    <h1>留言板</h1>
                    <p>您的建议让网站得到优化！！！</p>
                </div>
                <RichText @Sub="submitMessage"></RichText>
            </div>
            <ul class="message-list">
                <li class="message-item" v-for="(item,index) in commentList" :key="item._id">
                    <div class="p-u-info">
                        <span class="img" :style="{'backgroundImage': 'url(http://localhost:3000'+item.user.avatar+'.jpg)'}"></span>
                        <span class="user">{{item.user.username}}</span>
                    </div>
                    <div class="content">
                        <div class="text" v-html="item.content"></div>
                        <div class="time">
                            <span>{{item.date | getTime}}</span>
                            <a href="javascript:;" @click="replyClick(index)">
                                {{(item.reply.lastIndexArr[0]===index && item.reply.lastIndexArr[1]===undefined)?"收起":"回复"}}
                            </a>
                        </div>
                    </div>
                    <ul class="sub-list">
                        <li class="sub-item" v-for="(childItem,childIndex) in item.children" :key="childIndex+Math.random()*100">
                            <div class="img" :style="{'backgroundImage': 'url(http://localhost:3000'+childItem.user.avatar+'.jpg)'}"></div>
                            <div class="content">
                                <div>
                                    <span class="name">{{childItem.user.username}}</span>
                                    <span>回复</span>
                                    <span class="name">{{childItem.atUserName}}</span>
                                    <span class="content">{{childItem.content}}</span>
                                </div>
                                <div>
                                    <span class="time">{{childItem.date | getTime}}</span>
                                    <a href="javascript:;" @click="replyClick(index,childIndex)">
                                        {{(item.reply.lastIndexArr[0]===index && item.reply.lastIndexArr[1]===childIndex)?"收起":"回复"}}
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div :class="['reply',{'show': item.reply.ifShow}]">
                        <textarea :placeholder="'回复【'+ item.reply.atUserName+'】'" v-model="item.reply.content"></textarea>
                        <el-button type="success" size="mini" @click="submitSubMessage(index)">提交</el-button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Nav from "../../components/Nav";
    import RichText from "../../components/RichText";
    import userService from "../../api/userService";
    import messageService from "../../api/messageService";
    export default {
        name: "index",
        components: {
            Nav,RichText
        },
        data() {
            return{
                commentList : []
            }
        },
        filters: {
            getTime(value) {
                //2020/4/2 16:31:28
                let date = new Date(value);
                let y = date.getFullYear();
                let m = date.getMinutes() + 1;
                let d = date.getDay();
                let h = date.getHours();
                let M = date.getMinutes();
                let s = date.getSeconds();
                return y + '/' + m + '/' + d + ' ' + h + ":" + M + ":" + s;
            }
        },
        methods: {
            submitMessage(value) {
                if (!value){
                    layer.msg('请输入内容', {icon: 2});
                    return false;
                }
                userService.getIfUserLogin().then(res => {
                    let data = res.data;
                    if (!data.ifLogin) {
                        layer.msg('清先登录', {icon: 2});
                    }else{
                        messageService.addMessage({userId: data.data._id, content: value}).then(res => {
                            if (res.data.code === 0){
                                layer.msg('回复留言成功', {icon: 1});
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
            submitSubMessage(pIndex){
                //判断是否登录
                userService.getIfUserLogin().then(res => {
                    let data = res.data;
                    if (!data.ifLogin) {
                        layer.msg('清先登录', {icon: 2});
                    }else{
                        messageService.addSubMessage({
                                parentId: this.commentList[pIndex]._id,
                                userId: data.data._id,
                                content: this.commentList[pIndex].reply.content,
                                atUserName: this.commentList[pIndex].reply.atUserName}
                            ).then(res => {
                            if (res.data.code === 0){
                                layer.msg('留言成功', {icon: 1});
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
            //获取列表数据
            getMessageList() {
                messageService.getMessageList().then(res => {
                    let data = res.data;
                    if (data.code ===0 ){
                        //添加reply
                        this.commentList = data.data.map(item => {
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
                    }
                })
            }
        },
        mounted() {
            this.getMessageList();
        }
    }
</script>

<style lang="less" scoped>
#message{
    width: 100%;
    padding-top: 75px;
    .message-main{
        max-width: 1360px;
        box-sizing: border-box;
        width: 100%;
        padding: 0 20px;
        margin: 0 auto;
        > .message-edit{
            box-sizing: border-box;
            width: 100%;
            padding: 20px 10px 30px;
            background-color: #fff;
            border-radius: 2px;
            margin-bottom: 20px;
            > .desc{
                width: 100%;
                height: 100px;
                h1{
                    font-weight: 500;
                    text-align: center;
                    margin-bottom: 10px;
                }
                p{
                    text-align: center;
                    font-size: 15px;
                }
            }
        }
        > ul.message-list{
            width: 100%;
            padding: 20px 15px;
            box-sizing: border-box;
            background-color: #fff;
            > li.message-item{
                box-sizing: border-box;
                width: 100%;
                padding: 10px 0 0 50px;
                border-bottom: 1px dashed #eee;
                overflow: hidden;
                >div.p-u-info{
                    position: relative;
                    left: -50px;
                    height: 40px;
                    line-height: 40px;
                    width: 100%;
                    span.img{
                        display: inline-block;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        background-size: cover;
                        vertical-align: middle;
                    }
                    span.user{
                        display: inline-block;
                        height: 40px;
                        line-height: 40px;
                        vertical-align: middle;
                        margin-left: 10px;
                    }
                }
                >div.content{
                    width: 100%;
                    box-sizing: border-box;
                    padding: 8px 0;
                    .time{
                        padding: 2px 10px;
                        color: #7a7374;
                        a{
                            color: #00FFFF;
                            margin-left: 10px;
                        }
                    }
                }
                >ul.sub-list{
                    border-top: 1px solid #eee;
                    box-sizing: border-box;
                    width: 100%;
                    > li.sub-item{
                        width: 100%;
                        padding: 10px 0;
                        display: flex;
                        div.img{
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            background-size: cover;
                            margin-right: 10px;
                        }
                        div.content{
                            div:nth-child(1){
                                span.name{
                                    color: #31BAF0;
                                }
                                span:nth-child(2){
                                    margin: 0 10px;
                                }
                                span:nth-child(4){
                                    margin-left: 15px;
                                }
                            }
                            div:nth-child(2){
                                span.time{
                                    color: #7a7374;
                                    font-size: 12px;
                                    margin: 0 10px 0 7px;
                                }
                                a{
                                    color: #00FFFF;
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
</style>