import request from './index';

export default {
    //获取用户列表
    getUserListLazyed(options){
        return request.get("/user/getUserListLazyed",{params: options});
    },
    //获取用户总数
    getTotalUser() {
        return request.get("/user/getTotalUser");
    },
    //updateUserDisabledById
    updateUserDisabledById(_id,disabled) {
        return request.post("/user/updateUserDisabledById",{_id,disabled});
    },
    //updateUserAdminById
    updateUserAdminById(_id,admin) {
        return request.post("/user/updateUserAdminById",{_id,admin});
    },
    //用户登录
    login(username,password){
        return request.post("/login/userLogin",{username,password});
    },
    //判断用户登录
    ifLogin(){
        return request.get("/login/ifUserLogin");
    },
    //用户退出登录
    userLogout() {
        return request.post("/login/userLogout");
    }
}