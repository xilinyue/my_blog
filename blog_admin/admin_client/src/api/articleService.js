import request from './index';

export default {
    //添加博客
    addBlog(data) {
        return request.post("/article/addBlog", data);
    },
    //获取博客列表
    getBlogLazyed(skip,limit) {
        return request.get("/article/getBlogLazyed",{params: {skip,limit}});
    },
    //删除博客
    deleteBlogById(_id){
        return request.delete("/article/deleteBlogById",{data: {_id}});
    },
    //通过id获取博客信息
    getBlogById(_id){
        return request.get("/article/getBlogById",{params: {_id}});
    },
    //通过id更新博客
    updateBlog(_id,data){
        data._id = _id;
        return request.post("/article/updateBlog", data);
    }
}