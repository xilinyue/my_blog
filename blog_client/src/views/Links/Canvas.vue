<template>
    <div id="canvas">
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script>
    function pentagramPoint(x,y,rot,R,r){    //x ,y 是中心点  rot是初始时第一个点的角度
        let penList = [];
        //封装
        //这里为rot封装成角度传值
        rot = rot * (Math.PI / 180);
        for(let i = 0; i < 10; i++){
            penList.push({
                x: i % 2 == 0 ? x + R * Math.cos(rot + Math.PI / 5 * i) : x + r * Math.cos(rot + Math.PI / 5 * i),
                y: i % 2 == 0 ? y - R * Math.sin(rot + Math.PI / 5 * i) : y - r * Math.sin(rot + Math.PI / 5 * i)
            })
        }
        return penList;
    }
    class Ball{
        constructor(x,y){
            this.x = x;
            this.y = y;

            this.R = 20
            this.r = 10;
            this.vx = Math.random() * 2 -1;
            this.vy = Math.random() * 2 -1;
            this.vr = 0.98;
            this.color = "#" + Math.random().toString(16).slice(2,8);
            //角度
            this.rot = 0;
            this.vrot = Math.random() * 20 - 10

            //是否清除小球的绘制
            this.dead = false;
        }
        draw(ctx){
            ctx.beginPath();
            // ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
            //生成五角星
            let penList = [];
            penList = pentagramPoint(this.x,this.y,this.rot,this.R,this.r);
            ctx.moveTo(penList[0].x,penList[0].y);
            for(let i = 1; i < penList.length; i++){
                ctx.lineTo(penList[i].x,penList[i].y);
            }
            ctx.lineTo(penList[0].x,penList[0].y);

            ctx.fillStyle = this.color;
            ctx.fill();
        }
        update(){
            this.x += this.vx;
            this.y += this.vy;
            this.r *= this.vr;
            this.R = this.r * 2;
            this.rot += this.vrot;
            //让小球死亡
            if(this.r < 1){
                this.dead = true;
            }
        }
    }
    export default {
        name: "Canvas",
        data() {
            return{
                canvas: null,
                ctx: null,
                ballList: [],
                timer : null,
                animateState : true
            }
        },
        beforeDestroy() {
            clearInterval(this.timer);
            window.removeEventListener("resize",this.handleResize);
            this.canvas.removeEventListener('mousemove',this.handleMousemove)
            this.animateState = false;
        },
        mounted() {
            this.init()
            this.register()
            this.render()
        },
        methods: {
            init () {
                this.canvas = this.$refs.canvas;
                this.ctx = this.canvas.getContext('2d');
                this.ctx.globalCompositeOperation = "lighter";
                this.canvas.width = document.documentElement.offsetWidth;
                this.canvas.height = 260;
                this.auto()
            },
            auto(){
                clearInterval(this.timer);
                this.timer = setInterval(()=>{
                    this.ballList.push(new Ball(this.canvas.width * Math.random(), this.canvas.height * Math.random()))
                },100)
            },
            register () {
                window.addEventListener("resize",this.handleResize);
                this.canvas.addEventListener('mousemove',this.handleMousemove)
            },
            render () {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                this.ballList.forEach(bubble => {
                    bubble.draw(this.ctx);
                    bubble.update();
                });
                this.ballList = this.ballList.filter(bubble => {
                    return !bubble.dead;
                });
                this.animateState && requestAnimationFrame(() => this.render())
            },
            handleResize(){
                this.canvas.width = document.documentElement.offsetWidth;
                this.ctx.globalCompositeOperation = "lighter";
            },
            handleMousemove(e){
                this.ballList.push(new Ball(e.offsetX, e.offsetY))
            }
        }
    }
</script>

<style scoped>
    #canvas{
        background: linear-gradient(#3A83A0,#202D34);
    }
</style>