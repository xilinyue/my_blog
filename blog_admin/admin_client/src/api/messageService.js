import request from './index';

export default {
    //获取留言列表
    getMessageListLazyed(options){
        return request.get("/message/getMessageListLazyed",{params: options});
    },
    //获取用户总数
    getTotalMessage() {
        return request.get("/message/getTotalMessage");
    },
    //删除留言
    deleteMessage(_id){
        return request.delete("/message/deleteMessageById",{data: {_id}});
    }
}