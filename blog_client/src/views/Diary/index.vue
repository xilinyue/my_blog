<template>
    <div id="diary">
        <Nav></Nav>
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