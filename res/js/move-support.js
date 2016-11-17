
//全部方块移动以后更新的内容
function updateAfterMove(){

    //更新页面显示的分数
    updateScore( score );
    
    //判断当前分数是否大于最高分数
    if( score > bestScore){

        //更新最高分数
        bestScore = score;
        
        //更新页面显示的最高分数
        updateBestScore();

        //缓存最高分数
        cacheBestScore(bestScore);
    }


    //更新历史盘的信息，让历史盘的信息指向历史盘模板
    getBoardHistory();

    //更新历史分数信息，让历史分数指向历史分数模板
    scoreHistory = scoreHistoryTemplate;

    //更新分数魔板
    scoreHistoryTemplate = score;

    //在盘里生成新的数字，并把新生成的盘记录到历史盘模板
    setTimeout('generateOneNumber();getBoardHistoryTemplate()',210);

    //判断新生成盘以后游戏是否结束了
    setTimeout('isgameover()',300);
}


//检查是否还有剩余空间
function nospace( board ){

    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ )
            if( board[i][j] == 0 )
                return false;

    return true;
}

/*检查是否还能移动*/
function nomove( board ){
    if ( canMoveLeft( board ) ||
         canMoveRight( board ) ||
         canMoveUp( board ) ||
         canMoveDown( board ) )
        return false;
    return true;
}

/*检查能否向左移动*/
function canMoveLeft( board ){

    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 1; j < 4 ; j ++ )
            if( board[i][j] != 0 )
                if( board[i][j-1] == 0 || board[i][j-1] == board[i][j] )
                    return true;

    return false;
}

/*检查能否向右移动*/
function canMoveRight( board ){

    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 2; j >= 0 ; j -- )
            if( board[i][j] != 0 )
                if( board[i][j+1] == 0 || board[i][j+1] == board[i][j] )
                    return true;

    return false;
}

/*检查能否向上移动*/
function canMoveUp( board ){

    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 1 ; i < 4 ; i ++ )
            if( board[i][j] != 0 )
                if( board[i-1][j] == 0 || board[i-1][j] == board[i][j] )
                    return true;

    return false;
}

/*检查能否向下移动*/
function canMoveDown( board ){

    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- )
            if( board[i][j] != 0 )
                if( board[i+1][j] == 0 || board[i+1][j] == board[i][j] )
                    return true;

    return false;
}


/*同一行的两个方块在水平方向之间没有其他方块*/
function noBlockHorizontal( row , col1 , col2 , board ){
    for( var i = col1 + 1 ; i < col2 ; i ++ )
        if( board[row][i] != 0 )
            return false;
    return true;
}


/*同一列的两个方块在竖直方向之间没有其他方块*/
function noBlockVertical( col , row1 , row2 , board ){
    for( var i = row1 + 1 ; i < row2 ; i ++ )
        if( board[i][col] != 0 )
            return false;
    return true;
}