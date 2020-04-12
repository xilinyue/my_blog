import request from './index';

export default {
    //添加标签
    addTag(tag) {
        return request.post("/articleInfo/addTag", {tag});
    },
    //获取所有标签
    getAlltag(){
        return request.get("/articleInfo/getAlltag");
    },
    //删除标签
    deleteTag(tag) {
        return request.delete("/articleInfo/deleteTag",{data: {tag}});
    },
    getArticleTotal() {
        return request.get("/articleInfo/getArticleTotal");
    }
}