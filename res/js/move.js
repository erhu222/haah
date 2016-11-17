/**
 * 移动判定及如何移动
 */



/*向左移动*/
function moveLeft(){

    //判断是否可以向左移动
    if( !canMoveLeft( board ) )
        return false;

    //开始循环遍历方块
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 1 ; j < 4 ; j ++ ){

            //当方块不为0时判断是否可以移动，并产生移动
            if( board[i][j] != 0 ){

                for( var k = 0 ; k < j ; k ++ ){

                    //两个方块不相等但中间没有额外的方块
                    if( board[i][k] == 0 && noBlockHorizontal( i , k , j , board ) ){

                        //移动动画
                        showMoveAnimation( i , j , i , k );

                        //跟新块记录的数值
                        board[i][k] = board[i][j];
                        board[i][j] = 0;

                        //跳出本次循环
                        continue;
                    }
                    //两个方块相等且中间没有额外的方块
                    else if( board[i][k] == board[i][j] && noBlockHorizontal( i , k , j , board ) && !hasConflicted[i][k] ){
                        
                        //移动动画
                        showMoveAnimation( i , j , i , k );

                        //跟新块记录的数值
                        board[i][k] *= 2;
                        board[i][j] = 0;

                        //标记移动后的方块（冲撞位置）
                        hasConflicted[i][k] = true;

                        //计算分数
                        score += board[i][k];

                        //跳出本次循环
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}


/*向右移动*/
function moveRight(){
    if( !canMoveRight( board ) )
        return false;

    //moveRight
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 2 ; j >= 0 ; j -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > j ; k -- ){

                    if( board[i][k] == 0 && noBlockHorizontal( i , j , k , board ) ){
                        showMoveAnimation( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontal( i , j , k , board ) && !hasConflicted[i][k] ){
                        showMoveAnimation( i , j , i , k);
                        board[i][k] *= 2;
                        board[i][j] = 0;
                        //addScore
                        score += board[i][k];

                        hasConflicted[i][k] = true;

                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}


/*向上移动*/
function moveUp(){

    if( !canMoveUp( board ) )
        return false;

    //moveUp
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 1 ; i < 4 ; i ++ ){
            if( board[i][j] != 0 ){
                for( var k = 0 ; k < i ; k ++ ){

                    if( board[k][j] == 0 && noBlockVertical( j , k , i , board ) ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , k , i , board ) && !hasConflicted[k][j] ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] *= 2;
                        board[i][j] = 0;
                        //addScore
                        score += board[k][j];

                        hasConflicted[k][j] = true;

                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}


/*向下移动*/
function moveDown(){
    if( !canMoveDown( board ) )
        return false;

    //moveDown
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > i ; k -- ){

                    if( board[k][j] == 0 && noBlockVertical( j , i , k , board ) ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , i , k , board ) && !hasConflicted[k][j] ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] *= 2;
                        board[i][j] = 0;
                        //addScore
                        score += board[k][j];

                        hasConflicted[k][j] = true;

                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}
