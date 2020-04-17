import axios from 'axios';

axios.defaults.baseURL = 'http:///47.104.155.124:3000'; //默认访问地址
axios.defaults.withCredentials = true;  //跨域允许携带cookies
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; //设置post请求格式

export default axios;