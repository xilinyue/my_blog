import request from './index';

export default {
    getArticleInfo() {
        return request.get('/api/article/getArticleInfo');
    },
    getArticleHot() {
        return request.get('/api/article/getArticleHot');
    },
    getArticleList({tag,skip,limit}) {  //通过tag查询文章列表
        let data = {tag,skip,limit};

        return request.get('/api/article/getArticleList',{params: data});
    },
    getArticleDetailById(id){
        return request.get('/api/article/getArticleDetailById',{params: {id: id}})
    },
    getArticleListExtend(tag){
        return request.get('/api/article/getArticleListExtend',{params: {tag: tag}});
    },
    //通过博客id获取博客评论
    getArticleCommentByArticleId(articleId,skip,limit){
        return request.get("/api/article/getArticleCommentByArticleId",{params: {articleId}});
    },

    //博客评论
    addArticleCommentById(articleId,userId,content) {
        let data = {
            articleId,
            userId,
            content
        };
        return request.post('/api/article/addArticleCommentById',data);
    },
    //博客子评论
    addArticleSubCommentById({commentId,userId,content,atUserName}){
        return request.post('/api/article/addArticleSubCommentById',{commentId,userId,content,atUserName})
    },

    //通过title或者tag搜索
    getSearchListByTitleOrTag(keyWords){
        return request.get('/api/article/getSearchListByTitleOrTag',{params: {keyWords}});
    }
}