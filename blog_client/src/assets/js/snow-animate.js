function Obj(){}  //创建一个对象
/*为这个对象添加一个具有一个参数的原型方法*/
Obj.prototype.draw=function(about,o){
    let speed=0;   //雪花每次下落的数值（10px）
    let startPosLeft=Math.ceil(Math.random()*document.documentElement.clientWidth);//设置雪花随机的开始x值的大小
    o.style.opacity=(Math.ceil(Math.random()*3)+7)/10;  //设置透明度
    o.style.left=startPosLeft+'px';
    o.style.color="#fff";
    o.style.fontSize=12+Math.ceil(Math.random()*14)+'px';
    requestAnimationFrame(function b(){
        //雪花下落的top值小于屏幕的可视区域高时执行下列
        if(speed<document.documentElement.clientHeight){
            o.style.top=speed+'px';
            // o.style.left=startPosLeft+Math.ceil(Math.random()*8)+'px';
            speed+=2;
            requestAnimationFrame(b);
        }
        else{
            about.removeChild(o);
        }
    });
};
export default Obj;
