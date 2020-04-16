import request from './index';

export default {
    getDiaryList() {
        return request.get('/api/diary/getDiaryList');
    },
}