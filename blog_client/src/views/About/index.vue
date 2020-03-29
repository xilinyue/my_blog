<template>
    <div id="about">
        <Nav></Nav>
        <el-container>
            <el-main>
                个人简历
            </el-main>
            <el-aside>
                <div class="about-this">关于本站</div>
                <div class="about-future">未来规划</div>
            </el-aside>
        </el-container>
    </div>
</template>

<script>
    import Nav from "../../components/Nav";
    import Obj from '../../assets/js/snow-animate';
    export default {
        name: "index",
        components: {
            Nav
        },
        mounted() {
            let about= document.getElementById('about');
            /*使用setInterval定时器每800毫秒创建一个雪花*/
            function a(){
                let odiv=document.createElement('div');  //创建div
                odiv.innerHTML="❅";   //div的内容
                odiv.style.position='absolute';  //div的绝对定位
                about.appendChild(odiv);   //把创建好的div放进about中
                let obj=new Obj();   //创建函数
                obj.draw(about,odiv);  //执行obj的draw方法
                // console.log(a);
            }
            setInterval(a,800);
        }
    }
</script>

<style lang="less" scoped>
    #about{
        position:relative;
        width: 100%;
        height: 900px;
        background: url("../../assets/img/bg.png");
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
                background-color: #2177b8;
                height: 900px;
                padding-top: 0;
            }
            > .el-aside{
                width: 300px;
                height: 900px;
                .about-this{
                    height: 50%;
                    background-color: #f07c82;
                }
                .about-future{
                    height: 50%;
                    background-color: #2c9678;
                }
            }
        }
    }
</style>