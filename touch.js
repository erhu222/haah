function supportTouch(){

    //手指开始触摸
    $('#grid-container')[0].addEventListener('touchstart',function(event){
        startx = event.touches[0].pageX;
        starty = event.touches[0].pageY;
    });

    //bug 滑动发生时禁止触发默认效果
    $('#grid-container')[0].addEventListener('touchmove',function(event){
        event.preventDefault();
    });
    
    //手指结束触摸
    $('#grid-container')[0].addEventListener('touchend',function(event){
        endx = event.changedTouches[0].pageX;
        endy = event.changedTouches[0].pageY;

        //计算滑动向量
        var deltax = endx - startx;
        var deltay = endy - starty;

        //对点击事件不识别为滑动（判定最小滑动距离）
        if( Math.abs(deltax) < 0.1 * documentWidth && Math.abs(deltay) < 0.1 * documentWidth ){
            return;
        }

        //x方向
        if( Math.abs( deltax ) >= Math.abs ( deltay ) ){
            if( deltax > 0 ){
                //move right
                if( moveRight() ){
                    updateAfterMove();
                }
            }
            else{
                //move left
                if( moveLeft() ){
                    updateAfterMove();
                }

            }
        }
        //y方向
        else{
            if (deltay > 0){
                //move down
                if( moveDown() ){
                    updateAfterMove();
                }
            }
            else{
                //move up
                if( moveUp() ){
                    updateAfterMove();
                }
            }
        }
    });
}