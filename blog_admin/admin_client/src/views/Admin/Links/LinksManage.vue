<template>
    <div class="links-manage">
        <h1>友链管理</h1>
        <el-button type="primary" @click="dialogVisible = true">添加友链</el-button>
        <el-table
                :data="linksList"
                style="width: 100%"
                stripe>
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    label="名称"
                    width="150"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="描述"
                    prop="desc">
            </el-table-column>
            <el-table-column
                    label="图标"
                    width="150">
                <template v-slot="scope">
                    <img :src="scope.row.icon" :alt="scope.row.name" width="50">
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center"
                    width="150"
            >
                <template v-slot="scope">
                    <el-button type="danger" size="mini" @click="deleteLinks(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 15]"
                :page-size="5"
                layout="total, sizes, prev, pager, next"
                :total="totalLinks">
        </el-pagination>


        <el-dialog
                title="添加友链"
                :visible.sync="dialogVisible"
                :show-close="false"
                :close-on-click-modal="false"
                width="50%">
            <el-form :model="linksForm" :rules="linksRules" ref="linksForm" label-width="100px">
                <el-form-item label="图标地址" prop="icon">
                    <el-input v-model="linksForm.icon"
                              placeholder="请输入友链图标"></el-input>
                </el-form-item>
                <el-form-item label="友链名称" prop="name">
                    <el-input v-model="linksForm.name"
                              placeholder="请输入友链名称"></el-input>
                </el-form-item>
                <el-form-item label="友链描述" prop="desc">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入友链描述"
                            v-model="linksForm.desc">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAddLinks">取 消</el-button>
                <el-button type="primary" @click="submitAddLinks">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import linksService from "../../../api/linksService";
    export default {
        name: "LinksManage",
        data() {
            return{
                linksList: [],
                totalLinks: 0,
                currentPage: 1,
                query: {
                    skip: 0,
                    limit: 5
                },

                dialogVisible: false,
                linksForm: {
                    icon: '',
                    name: '',
                    desc: ''
                },
                linksRules: {
                    icon: [
                        {required: true, message: '图标地址必须', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '友链名称必须', trigger: 'blur'}
                    ],
                    desc: [
                        {required: true, message: '友链描述必须', trigger: 'blur'},
                        {max: 100, message: '友链描述不超过100字', trigger: 'blur'},
                    ]
                },
            }
        },
        mounted() {
            this.getLinksListLazyed();
            this.getTotalLinks();
        },
        methods: {
            cancelAddLinks() {
                this.$confirm('此操作将不会保存所输入内容, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.dialogVisible = false;
                    this.$refs.linksForm.resetFields();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消关闭'
                    });
                });
            },
            //添加友链
            submitAddLinks() {
                this.$refs.linksForm.validate(valid => {
                    if (valid){
                        linksService.addLinks(this.linksForm).then(res => {
                            if (res.code === 0){
                                this.$message({
                                    type: 'success',
                                    message: res.msg
                                });
                                this.dialogVisible  = false;
                                this.$refs.linksForm.resetFields();
                                // TODO 重新获取数据列表
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: res.msg
                                });
                            }
                        });
                    }
                });
            },
            //删除友链
            deleteLinks(row) {
                this.$confirm('确定删除该条友链?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    linksService.deleteLinksById(row._id).then(res => {
                        if (res.code === 0){
                            this.$message({
                                type: 'success',
                                message: res.msg
                            });
                            this.getTotalLinks();
                            this.getLinksListLazyed();
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.msg
                            });
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //获取总数
            getTotalLinks() {
                linksService.getTotalLinks().then(res=>{
                    if (res.code === 0){
                        this.totalLinks = res.total;
                    }
                });
            },
            getLinksListLazyed() {
                linksService.getLinksListLazyed(this.query).then(res=>{
                   if (res.code === 0){
                       this.linksList = res.data;
                   }
                });
            },
            handleSizeChange(size) {
                this.query.limit = size;
                this.getLinksListLazyed();
            },
            handleCurrentChange(currentPage) {
                this.query.skip = (currentPage-1) * this.query.limit;
                this.getLinksListLazyed();
            },
        }
    }
</script>

<style lang="less" scoped>
    .links-manage{
        width: 100%;
        box-sizing: border-box;
        h1{
            font-family: Kaiti;
            font-size: 25px;
            margin-bottom: 10px;
        }
    }
</style>