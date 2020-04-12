<template>
    <div>
        <MarkdownPreview  :initialValue="content" />
    </div>
</template>

<script>
    import {MarkdownPreview } from 'vue-meditor';
    export default {
        name: "DiaryManage",
        components: {
            MarkdownPreview
        },
        data() {
            return{
            }
        },
        computed: {
            content() {
                let content = '<h1 id="1231231">1231231</h1>↵<ul>↵<li class=" ">123</li>↵<li class=" ">12312</li>↵<li class=" ">12312</li>↵</ul>↵<h3 id="123123123">123123123</h3>↵';
                let reg = new RegExp("↵", "g");
                return content.replace(reg,"")
            }
        }
    }
</script>

<style scoped>

</style>