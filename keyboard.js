$(document).keydown( function( event ){
    switch( event.keyCode ){
        case 37: //left
            event.preventDefault();
            if( moveLeft() ){
                updateAfterMove();
            }
            break;
        case 65: //left
            if ( moveLeft() ){
                updateAfterMove();
            }
            break;
        case 38: //up
            event.preventDefault();
            if( moveUp() ){
                updateAfterMove();
            }
            break;
        case 87: //up
            if( moveUp() ){
                updateAfterMove();
            }
            break;
        case 39: //right
            event.preventDefault();
            if( moveRight() ){
                updateAfterMove();
            }
            break;
        case 68: //right
            if( moveRight() ){
                updateAfterMove();
            }
            break;
        case 40: //down
            event.preventDefault();
            if( moveDown() ){
                updateAfterMove();
            }
            break;
        case 83 : //down
            if( moveDown() ){
                updateAfterMove();
            }
            break;
        default: //default
            break;
    }
});