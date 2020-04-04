import request from './index';

export default {
    //添加留言 {userId: ,content}
    addMessage(data){
        return request.post("/api/message/addMessage",data);
    },
    //添加回复留言
    addSubMessage(data) {
        return request.post("/api/message/addSubMessage",data);
    },
    //获取留言数据
    getMessageList(skip=0,limit=5){
        return request.get("/api/message/getMessageList",{params: {skip,limit}});
    }
}