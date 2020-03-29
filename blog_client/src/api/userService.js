import request from './index';

export default {
    //获取图形验证码数据
    getCheckSvgCode() {
        return request.get('/register/getCheckSvgCode');
    },
    //验证码验证
    checkVCode(vcode){
        return request.post('/register/checkVCode',{vcode});
    }
}