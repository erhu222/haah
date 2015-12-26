

var board = new Array();
var score = 0;
var hasConflicted = new Array();

var boardHistory = new Array();
var scoreHistory = 0;
var boardHistoryTemplate = new Array();
var scoreHistoryTemplate = 0;
var bestScore = 0;

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function(){

    prepareForMobile();
    newgame();
    supportTouch();


});

//页面大小判断并初始化游戏主体大小
function prepareForMobile(){

    if( documentWidth > 500 ){
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }


    $('#grid-container').css('width',gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('height',gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('padding',cellSpace);
    $('#grid-container').css('border-radius',0.02*gridContainerWidth);

    $('.grid-cell').css('width',cellSideLength);
    $('.grid-cell').css('height',cellSideLength);
    $('.grid-cell').css('border-radius',0.02*cellSideLength);
}

function newgame(){
    //初始化棋盘格
    init();
    //在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
    //初始化历史模板
    getBoardHistoryTemplate();
    //初始化当前历史board
    getBoardHistory();
    //初始化分数模板
    scoreHistoryTemplate = score;
    //初始化历史分数
    scoreHistory = scoreHistoryTemplate;

    //读取最高分
    if(navigator.cookieEnabled){
        bestScore = readBestScore();
        if(bestScore){
            updateBestScore();
        }
        else{
            bestScore = 0;
            updateBestScore();
        }
    }
}

function updateBestScore(){
    $('#bestscore').text(bestScore);
}

function init(){
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ ){

            var gridCell = $('#grid-cell-'+i+"-"+j);
            gridCell.css('top', getPosTop( i , j ) );
            gridCell.css('left', getPosLeft( i , j ) );
        }

    for( var i = 0 ; i < 4 ; i ++ ){

        board[i] = new Array();
        hasConflicted[i] = new Array;
        boardHistory[i] = new Array;
        boardHistoryTemplate[i] = new Array;

        for( var j = 0 ; j < 4 ; j ++ ){
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView();
    score = 0;
    updateScore( score );
}

function revocation(){
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++){
            boardHistoryTemplate[i][j] = boardHistory[i][j];
            board[i][j] = boardHistory[i][j];
        }

    updateBoardView();
    //还原template
    scoreHistoryTemplate = scoreHistory;
    //还原score
    score = scoreHistory;
    updateScore( score );
}

function updateBoardView(){

    $(".number-cell").remove();
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ ){
            $("#grid-container").append( '<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>' );
            var theNumberCell = $('#number-cell-'+i+'-'+j);

            if( board[i][j] == 0 ){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j) + cellSideLength/2 );
                theNumberCell.css('left',getPosLeft(i,j) + cellSideLength/2 );
            }
            else{
                theNumberCell.css('width',cellSideLength);
                theNumberCell.css('height',cellSideLength);
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor( board[i][j] ) );
                theNumberCell.css('color',getNumberColor( board[i][j] ) );
                theNumberCell.text( board[i][j] );
            }
            hasConflicted[i][j] = false;
        }
    $('.number-cell').css('line-height',cellSideLength +'px');
    $('.number-cell').css('font-size',0.5*cellSideLength +'px');
}

function generateOneNumber(){

    if( nospace( board ) )
        return false;

    //随机一个位置
    var randx = parseInt( Math.floor( Math.random()  * 4 ) );
    var randy = parseInt( Math.floor( Math.random()  * 4 ) );

    var randTimes = 0;

    while( randTimes < 50 ){
        if( board[randx][randy] == 0 )
            break;

        randx = parseInt( Math.floor( Math.random()  * 4 ) );
        randy = parseInt( Math.floor( Math.random()  * 4 ) );

        randTimes++;
    }

    if( randTimes == 50 ){
        for( var i = 0 ; i < 4 ; i ++ )
            for( var j = 0 ; j < 4 ; j ++){
                if( board[i][j] == 0 ){
                    randx = i;
                    randy = j;
                }
            }
    }

    //随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation( randx , randy , randNumber );

    return true;
}


function getBoardHistory(){
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ )
            boardHistory[i][j] = boardHistoryTemplate[i][j];
}

function getBoardHistoryTemplate(){
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ )
            boardHistoryTemplate[i][j] = board[i][j];
}


function isgameover(){
    if( nospace( board ) && nomove( board ) ){
        gameover();
    }
}

function gameover(){
    alert('Game Over!');
}