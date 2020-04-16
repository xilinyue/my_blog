<template>
    <div id="diary">
        <Nav></Nav>
            <h3>众里寻他千百度，那人却在灯火阑珊处</h3>
            <el-timeline>
                <el-timeline-item placement="top"
                    v-for="item in diaryList" :timestamp="item.date"  :key="item._id">
                    <el-card>
                        <h4>{{item.title}}</h4>
                        <div v-html="item.content" class="content"></div>
                        <ul v-if="item.imgArr.length > 0">
                            <li v-for="imgSrc in item.imgArr">
                                <img :src="imgSrc" alt="">
                            </li>
                        </ul>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
            <p><i class="el-icon-time"></i>The End</p>
    </div>
</template>

<script>
    import Nav from "../../components/Nav";
    import diaryService from "../../api/diaryService";
    export default {
        name: "index",
        components: {
            Nav
        },
        data() {
            return{
                diaryList: []
            }
        },
        mounted() {
            this.getDiaryList();
        },
        methods: {
            getDiaryList() {
                diaryService.getDiaryList().then(res => {
                   res = res.data;
                   if (res.code === 0){
                       this.diaryList = res.data.map(item => {
                           let date = new Date(item.date);
                           item.date = date.toLocaleDateString();
                           return item;
                       });
                   }
                });
            }
        }
    }
</script>

<style lang="less" scoped>
#diary{
    box-sizing: border-box;
    max-width: 1360px;
    padding: 80px 50px;
    margin: 0 auto;
    width: 100%;
    user-select: none;
        h3{
            font-family: Kaiti;
            height: 40px;
            line-height: 40px;
            font-size: 30px;
            font-weight: bold;
            color: #7a7374;
            margin-bottom: 20px;
        }
        /deep/ .el-timeline{
            /deep/ .el-timeline-item__timestamp{
                position: absolute;
                top: -8px;
                left: -134px;
                font-size: 20px;
                font-weight: bolder;
                color: #f07c82;
            }
            .el-timeline-item{
                .el-card{
                    background-color: #eeeeee10;
                    border: 1px solid transparent;
                    h4{
                        color: #fff;
                        font-family: Kaiti;
                        font-size: 18px;
                        margin-bottom: 10px;
                    }
                    .content{
                        color: #fff;
                        font-size: 16px;
                        margin-bottom: 10px;
                        p{
                            text-indent: 2em;
                        }
                    }
                    ul{
                        display: flex;
                        flex-wrap: wrap;
                        li{
                            margin-bottom: 5px;
                            margin-right: 10px;
                            img{
                                height: 300px;
                            }
                        }
                    }
                }
                > p{
                    font-family: BarbaraHand;
                    font-size: 40px;
                    height: 40px;
                    line-height: 40px;
                    color: #7a7374;
                }
            }
        }
}
</style>