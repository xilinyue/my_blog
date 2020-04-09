<template>
    <div>
        <h1>MarkDown编辑器预览</h1>
        <MarkdownPreview :initialValue="content" />
    </div>
</template>

<script>
    import { MarkdownPreview } from 'vue-meditor'
    export default {
        name: "TagManage",
        components: {
            MarkdownPreview
        },
        data() {
            return{
                content: `测试
**1231231**

###  12312312312

\`\`\`vue

\`\`\``
            }
        }
    }
</script>

<style scoped>

</style>