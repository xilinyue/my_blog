import request from './index';

export default {
    //添加友链
    addLinks(data) {
        return request.post("/links/addLinks",data);
    },
    //getLinksListLazyed
    getLinksListLazyed(options) {
        return request.get("/links/getLinksListLazyed",{params: options});
    },
    //getLinksListLazyed
    getTotalLinks() {
        return request.get("/links/getTotalLinks");
    },
    //deleteById
    deleteLinksById(_id){
        return request.delete("/links/deleteLinksById",{data: {_id}});
    }
}