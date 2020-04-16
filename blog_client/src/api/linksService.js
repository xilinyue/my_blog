import request from './index';

export default {
    getLinksList() {
        return request.get('/api/links/getLinksList');
    },
}