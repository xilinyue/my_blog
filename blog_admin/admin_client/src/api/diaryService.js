import request from './index';

export default {
    //添加日记
    addDiary(data){
        return request.post("/diary/addDiary",data);
    },
    //获取日记总数
    getTotalDiary(){
        return request.get("/diary/getTotalDiary");
    },
    //懒加载获取日记列表
    getDiaryListLazyed(options){
        return request.get("/diary/getDiaryListLazyed",{params: options});
    },
    //删除日记
    deleteDiaryById(_id){
        return request.delete("/diary/deleteDiaryById",{data: {_id}})
    }
}