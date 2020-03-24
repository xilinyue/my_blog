<template>
    <div id="container">
        <el-container>
            <el-main></el-main>
            <el-aside>
                <div class="search">
                    <div class="search-main">
                        <input type="text" placeholder="请输入搜索内容" />
                        <i class="el-icon-search"></i>
                    </div>
                    <div class="search-article">
                        <ul @mouseleave="handleMouseLeave">
                            <li v-for="(item,index) in articleTypeList" :key="item + index"
                                @mouseenter="handleMouseenter">
                                {{item}}
                            </li>
                        </ul>
                        <div class="cover" :style="{top: coverTop + 'px'}"></div>
                    </div>
                </div>
                <div class="hot"></div>
                <div class="recommend"></div>
                <div class="visitor"></div>
            </el-aside>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Container",
        data() {
            return{
                searchInput: '',
                //文章分类
                articleTypeList: ['全部文章','个人日记','HTML5&CSS3','JavaScript','Vue&Node','其他'],
                coverTop: 0
            }
        },
        methods: {
            handleMouseenter(e) {
                this.coverTop = e.target.offsetTop;
            },
            handleMouseLeave() {
                this.coverTop = 0;
            }
        }
    }
</script>

<style lang="less" scoped>
    #container{
        width: 100%;
        padding-top: 80px;
        user-select: none;
        > .el-container{
            box-sizing: border-box;
            width: 100%;
            height: 2000px;
            max-width: 1360px;
            margin: 0 auto;
            padding: 0 50px;
            background-color: #f07c82;
            > .el-aside{
                width: 300px;
                height: 1000px;
                > .search{
                    width: 100%;
                    background: #fff;
                    > .search-main{
                        position: relative;
                        width: 100%;
                        height: 80px;
                        box-sizing: border-box;
                        padding: 20px;
                        background-color: #36282b;
                        input{
                            width: 100%;
                            height: 40px;
                            border-radius: 20px;
                            border: 0;
                            outline: 0;
                            text-indent: 2em;
                        }
                        i{
                            position: absolute;
                            top: 29px;
                            right: 35px;
                            width: 22px;
                            height: 22px;
                            color: #7a7374;
                            font-weight: 900;
                            font-size: 18px;
                            line-height: 22px;
                            text-align: center;
                            cursor: pointer;
                            &:hover{
                                color: #f07c82;
                            }
                        }
                    }
                    > .search-article {
                        position: relative;
                        width: 100%;
                        margin-top: 20px;
                        padding-bottom: 10px;
                        ul {
                            width: 100%;
                            li{
                                position: relative;
                                z-index: 1;
                                box-sizing: border-box;
                                width: 100%;
                                height: 40px;
                                line-height: 40px;
                                padding: 0 30px;
                                border-bottom: 1px dotted #eee;
                                cursor: pointer;
                            }
                        }
                        .cover{
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 40px;
                            box-sizing: border-box;
                            border-right: 5px solid #36282b;
                            background-color: rgba(0,0,0,0.05);
                            transition: top .3s;
                        }
                    }
                }
            }
        }
    }
</style>