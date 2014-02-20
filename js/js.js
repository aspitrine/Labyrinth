window.onload = function(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    canvas.width = 450;
    canvas.height = 530;

    /* global */
    var posX;
    var posY;
    var touch;
    var oldTouch;
    var pause=false;
    var level = 1;
    var levelMax = 3;
    var map = tabMap;
    var mapItem = tabMapILevel1;

    var hero = new Image();
    hero.src = '/img/hero/hero.png';
    var item = new Image();
    item.src = '/img/item/item.png';

    var interval = setInterval(animate, 60);

    window.addEventListener("keyup", function(e){
        if(e.keyCode == 39)//press right
        {
            touch=1;
        }
        else if(e.keyCode == 37)//press left
        {
            touch=2;
        }
        else if(e.keyCode == 40) //press bot
        {
            touch=3;
        }
        else if(e.keyCode == 38) //press top
        {
            touch=4;
        }
        /* pause */
        if(e.keyCode == 32 && pause==false)
        {
            clearInterval(interval);
            pause=true;
            context.beginPath();
            context.rect(0,0,canvas.width, canvas.height);
            context.fillStyle = "rgba(0, 0, 0, 0.27)";
            context.fill();
            context.strokeStyle = "rgba(0, 0, 0, 0.27)";
            context.stroke();
            context.font = "12pt helvetica";
            context.fillStyle = "red";
            context.strokeStyle = "red";
            context.fillText("Pause, to continue press enter", 50, 157);
        }
        if(e.keyCode == 13 && pause==true)
        {
            interval=setInterval(animate, 60);
            pause=false;
        }
    },false);
    //draw map
    function drawMap(){
        for(var i=0;i<map.length;i++)
        {
            for(var j=0;j<map[i].length;j++)
            {
                /* draw Wall */
                if(map[i][j]==0)
                {
                    if(map[i][j+1]==map[i][j])
                    {
                        context.beginPath();
                        context.moveTo(j*25,i*25);
                        context.lineTo((j+1)*25,i*25);
                        context.lineWidth = 2;
                        context.fillStyle = 'black';
                        context.fill();
                        context.strokeStyle = 'black';
                        context.stroke();
                    }
                    if(map[i+1][j]==map[i][j])
                    {
                        context.beginPath();
                        context.moveTo(j*25,i*25);
                        context.lineTo(j*25,(i+1)*25);
                        context.fillStyle = 'black';
                        context.fill();
                        context.strokeStyle = 'black';
                        context.stroke();
                    }
                }
                /* draw Heart */
                else if(map[i][j]==2)
                {
                    context.beginPath();
                    context.drawImage(hero, 25*j-12.5, 25*i-12.5);
                    context.stroke();

                    posX=j;
                    posY=i;
                }
                /* draw Item */
                if(mapItem[i][j]==1){
                    context.beginPath();
                    context.drawImage(item, 25*j-12.5, 25*i-12.5);
                    context.stroke();
                }
            }
        }
    }

    function moveHeart(){
        /* right */
        if(touch==1){
            if(posX>map[0].length){
                map[posY][posX]=1;
                map[posY][0]=2;
                oldTouch = touch;
            }else if(map[posY][posX+1]!=0){
                map[posY][posX]=1;
                map[posY][posX+1]=2;
                oldTouch = touch;
            }else{
                if(oldTouch==2 && map[posY][posX-1]!=0){
                    map[posY][posX-1]=2;
                    map[posY][posX]=1;
                }
                if(oldTouch==3 && map[posY+1][posX]!=0){
                    map[posY+1][posX]=2;
                    map[posY][posX]=1;
                }
                if(oldTouch==4 && map[posY-1][posX]!=0){
                    map[posY-1][posX]=2;
                    map[posY][posX]=1;
                }
            }
        }
        /* left */
        if(touch==2){
            if(posX<=0){
                map[posY][posX]=1;
                map[posY][map[0].length]=2;
                oldTouch = touch;
            }else if(map[posY][posX-1]!=0){
                map[posY][posX]=1;
                map[posY][posX-1]=2;
                oldTouch = touch;
            }else{
                if(oldTouch==1 && map[posY][posX+1]!=0){
                    map[posY][posX+1]=2;
                    map[posY][posX]=1;
                }
                if(oldTouch==3 && map[posY+1][posX]!=0){
                    map[posY+1][posX]=2;
                    map[posY][posX]=1;
                }
                if(oldTouch==4 && map[posY-1][posX]!=0){
                    map[posY-1][posX]=2;
                    map[posY][posX]=1;
                }
            }
        }
        /* bot */
        if(touch==3){
            if(posY>=map.length-2){
                map[posY][posX]=1;
                map[0][posX]=2;
                oldTouch = touch;
            }else if(map[posY+1][posX]!=0){
                map[posY][posX]=1;
                map[posY+1][posX]=2;
                oldTouch = touch;
            }else{
                if(oldTouch==1 && map[posY][posX+1]!=0){
                    map[posY][posX+1]=2;
                    map[posY][posX]=1;
                }
                if(oldTouch==2 && map[posY][posX-1]!=0){
                    map[posY][posX-1]=2;
                    map[posY][posX]=1;
                }
                if(oldTouch==4 && map[posY-1][posX]!=0){
                    map[posY-1][posX]=2;
                    map[posY][posX]=1;
                }
            }
        }
        /* up */
        if(touch==4){
            if(posY==0){
                map[posY][posX]=1;
                map[map.length-1][posX]=2;
                oldTouch = touch;
            }else if(map[posY-1][posX]!=0){
                map[posY][posX]=1;
                map[posY-1][posX]=2;
                oldTouch = touch;
            }else{
                if(oldTouch==1 && map[posY][posX+1]!=0){
                    map[posY][posX+1]=2;
                    map[posY][posX]=1;
                }
                if(oldTouch==2 && map[posY][posX-1]!=0){
                    map[posY][posX-1]=2;
                    map[posY][posX]=1;
                }
                if(oldTouch==3 && map[posY+1][posX]!=0){
                    map[posY+1][posX]=2;
                    map[posY][posX]=1;
                }
            }
        }
    }

    function pickItem(){
        if(mapItem[posY][posX]==1){
            mapItem[posY][posX]=0;
        }
    }

    function allLevel(){
        if(level==1){
            map = tabMap;
            mapItem = tabMapILevel1;
        }else if(level==2){
            map = tabMap2;
            mapItem = tabMapILevel2;
        }
    }

    function noItem(){
        var bool=false;
        for(var i=0;i<mapItem.length;i++)
        {
            for(var j=0;j<mapItem[i].length;j++)
            {
                if(mapItem[i][j]==1)
                {
                    bool=true;
                }
            }
        }
        if(bool==false){
            level++;
        }
    }

    function win(){
        if(level==levelMax){
            clearInterval(interval);
            context.beginPath();
            context.rect(0,0,canvas.width, canvas.height);
            context.fillStyle = "rgba(0, 0, 0, 0.27)";
            context.fill();
            context.strokeStyle = "rgba(0, 0, 0, 0.27)";
            context.stroke();
            context.font = "12pt helvetica";
            context.fillStyle = "red";
            context.strokeStyle = "red";
            context.fillText("Vous avez gagner", 50, 157);
        }
    }

    function animate(){
        /* delete all draw */
        context.clearRect(0, 0, canvas.width, canvas.height);
        allLevel();
        moveHeart();
        drawMap();
        pickItem();
        noItem();
        win();
        console.log(level);
    }
}
