import request from './index';

export default {
    getArticleInfo() {
        return request.get('/api/article/getArticleInfo');
    },
    getArticleHot() {
        return request.get('/api/article/getArticleHot');
    },
    getArticleList({index,skip,limit}) {  //通过tag查询文章列表
        let tags = ['','个人日记','HTML5&CSS3','JavaScript', 'Vue&Node', '其他'];
        let data = {tag: tags[index],skip,limit};

        return request.get('/api/article/getArticleList',{params: data});
    }
}