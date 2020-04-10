import request from './index';

export default {
    //添加标签
    addTag(tag) {
        return request.post("/articleInfo/addTag", {tag});
    }
}