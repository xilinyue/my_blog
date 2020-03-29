<template>
    <div id="diary">
        <Nav></Nav>
        <el-container>
            <el-main>
                <h3>众里寻他千百度，那人却在灯火阑珊处</h3>
                <el-timeline>
                    <el-timeline-item timestamp="2018/4/12" placement="top">
                        <el-card>
                            <h4>更新 Github 模板</h4>
                            <p>王小虎 提交于 2018/4/12 20:46</p>
                            <img src="../../assets/img/bg.jpg">
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2018/4/3" placement="top">
                        <el-card>
                            <h4>更新 Github 模板</h4>
                            <p>王小虎 提交于 2018/4/3 20:46</p>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2018/4/2" placement="top">
                        <el-card>
                            <h4>更新 Github 模板</h4>
                            <p>王小虎 提交于 2018/4/2 20:46</p>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2018/4/1" placement="top">
                        <el-card>
                            <h4>更新 Github 模板</h4>
                            <p>王小虎 提交于 2018/4/12 20:46</p>
                            <img src="../../assets/img/bg.jpg">
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
                <p><i class="el-icon-time"></i>The End</p>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import Nav from "../../components/Nav";
    export default {
        name: "index",
        components: {
            Nav
        }
    }
</script>

<style lang="less" scoped>
#diary{
    width: 100%;
    background: url("../../assets/img/bg.png") no-repeat center top/cover fixed;
    overflow:hidden;
    padding-top: 80px;
    user-select: none;
    > .el-container {
        box-sizing: border-box;
        width: 100%;
        max-width: 1360px;
        margin: 0 auto;
        padding: 0 50px;
        > .el-main{
            /*background-color: #2177b8;*/
            padding-top: 0;
            h3{
                font-family: Kaiti;
                height: 40px;
                line-height: 40px;
                font-size: 30px;
                font-weight: bold;
                color: #7a7374;
                margin-bottom: 20px;
            }
            /deep/ .el-timeline-item__timestamp.is-top{
                color: #dad4cb;
                font-size: 18px;
            }
            .el-card{
                background-color: #eeeeee10;
                border: 1px solid transparent;
                h4{
                    color: #fff;
                    font-family: Kaiti;
                    font-size: 18px;
                    margin-bottom: 10px;
                }
                p{
                    color: #000;
                    font-size: 16px;
                    margin-bottom: 10px;
                }
                img{
                    width: 50%;
                    height: 300px;
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