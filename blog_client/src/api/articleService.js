import request from './index';

export default {
    getArticleInfo() {
        return request.get('/api/article/getArticleInfo');
    },
    getArticleHot() {
        return request.get('/api/article/getArticleHot');
    }
}