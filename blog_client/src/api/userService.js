import request from './index';

export default {
    //获取图形验证码数据
    getCheckSvgCode() {
        return request.get('/register/getCheckSvgCode');
    },
    //验证码验证
    checkVCode(vcode){
        return request.post('/register/checkVCode',{vcode});
    },
    //用户注册接口
    registerUser(params) {
        return request.post('/api/user/addUser',params);
    },
    //用户登录接口
    loginUser(params) {
        return request.post('/api/user/login',params);
    },
    //判断用户是否登录接口
    getIfUserLogin(){
        return request.get('/api/user/ifLogin');
    },
    //用户退出登录
    postUserLogout(){
        return request.post('/api/user/logout');
    }
}