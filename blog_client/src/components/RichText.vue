<template>
    <div>
        <textarea id="richText" style="display: none;"></textarea>
        <el-button type="primary" style="margin-top: 10px" @click="handleSubmit">提交留言</el-button>
    </div>
</template>

<script>
    export default {
        name: "RichText",
        data() {
            return {
                layedit: null,
                index: 0
            }
        },
        methods: {
            handleSubmit() {
                this.$emit('Sub',this.layedit.getContent(this.index));
            }
        },
        mounted() {
            layui.use('layedit', () => {
                this.layedit = layui.layedit;
                this.index = this.layedit.build('richText',{
                    tool: ['face'],
                    height: 150
                }); //建立编辑器
            });
        }
    }
</script>

<style scoped>

</style>