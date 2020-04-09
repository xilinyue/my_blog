<template>
    <div>
        <h1>MarkDown编辑器测试</h1>
        <div class="markdown">
            <MarkdownPro v-model="content"/>
        </div>
    </div>
</template>

<script>
    import { MarkdownPro } from 'vue-meditor'
    export default {
        name: "BlogManage",
        components: {
            MarkdownPro
        },
        data() {
            return{
                content: ''
            }
        }
    }
</script>

<style scoped>

</style>