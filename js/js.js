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
    var tabMap = [
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
        [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
        [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
        [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1],
        [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
        [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1],
        [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
        [0, 1, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 0],
        [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
        [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        []
    ];
    var hero = new Image();
    hero.src = '/img/hero.png';

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
        for(var i=0;i<tabMap.length;i++)
        {
            for(var j=0;j<tabMap[i].length;j++)
            {
                /* draw Wall */
                if(tabMap[i][j]==0)
                {
                    if(tabMap[i][j+1]==tabMap[i][j])
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
                    if(tabMap[i+1][j]==tabMap[i][j])
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
                else if(tabMap[i][j]==2)
                {
                    context.beginPath();
                    context.drawImage(hero, 25*j-12.5, 25*i-12.5);
                    context.stroke();

                    posX=j;
                    posY=i;

                }

            }
        }
    }

    function moveHeart(){
        /* right */
        if(touch==1){
            if(posX>tabMap[0].length){
                tabMap[posY][posX]=1;
                tabMap[posY][0]=2;
                oldTouch = touch;
            }else if(tabMap[posY][posX+1]!=0){
                tabMap[posY][posX]=1;
                tabMap[posY][posX+1]=2;
                oldTouch = touch;
            }else{
                if(oldTouch==2 && tabMap[posY][posX-1]!=0){
                    tabMap[posY][posX-1]=2;
                    tabMap[posY][posX]=1;
                }
                if(oldTouch==3 && tabMap[posY+1][posX]!=0){
                    tabMap[posY+1][posX]=2;
                    tabMap[posY][posX]=1;
                }
                if(oldTouch==4 && tabMap[posY-1][posX]!=0){
                    tabMap[posY-1][posX]=2;
                    tabMap[posY][posX]=1;
                }
            }
        }
        /* left */
        if(touch==2){
            if(posX<=0){
                tabMap[posY][posX]=1;
                tabMap[posY][tabMap[0].length]=2;
                oldTouch = touch;
            }else if(tabMap[posY][posX-1]!=0){
                tabMap[posY][posX]=1;
                tabMap[posY][posX-1]=2;
                oldTouch = touch;
            }else{
                if(oldTouch==1 && tabMap[posY][posX+1]!=0){
                    tabMap[posY][posX+1]=2;
                    tabMap[posY][posX]=1;
                }
                if(oldTouch==3 && tabMap[posY+1][posX]!=0){
                    tabMap[posY+1][posX]=2;
                    tabMap[posY][posX]=1;
                }
                if(oldTouch==4 && tabMap[posY-1][posX]!=0){
                    tabMap[posY-1][posX]=2;
                    tabMap[posY][posX]=1;
                }
            }
        }
        /* bot */
        if(touch==3){
            if(posY>=tabMap.length-2){
                tabMap[posY][posX]=1;
                tabMap[0][posX]=2;
                oldTouch = touch;
            }else if(tabMap[posY+1][posX]!=0){
                tabMap[posY][posX]=1;
                tabMap[posY+1][posX]=2;
                oldTouch = touch;
            }else{
                if(oldTouch==1 && tabMap[posY][posX+1]!=0){
                    tabMap[posY][posX+1]=2;
                    tabMap[posY][posX]=1;
                }
                if(oldTouch==2 && tabMap[posY][posX-1]!=0){
                    tabMap[posY][posX-1]=2;
                    tabMap[posY][posX]=1;
                }
                if(oldTouch==4 && tabMap[posY-1][posX]!=0){
                    tabMap[posY-1][posX]=2;
                    tabMap[posY][posX]=1;
                }
            }
        }
        /* up */
        if(touch==4){
            if(posY==0){
                tabMap[posY][posX]=1;
                tabMap[tabMap.length-1][posX]=2;
                oldTouch = touch;
            }else if(tabMap[posY-1][posX]!=0){
                tabMap[posY][posX]=1;
                tabMap[posY-1][posX]=2;
                oldTouch = touch;
            }else{
                if(oldTouch==1 && tabMap[posY][posX+1]!=0){
                    tabMap[posY][posX+1]=2;
                    tabMap[posY][posX]=1;
                }
                if(oldTouch==2 && tabMap[posY][posX-1]!=0){
                    tabMap[posY][posX-1]=2;
                    tabMap[posY][posX]=1;
                }
                if(oldTouch==3 && tabMap[posY+1][posX]!=0){
                    tabMap[posY+1][posX]=2;
                    tabMap[posY][posX]=1;
                }
            }
        }
    }

    function animate(){
        /* delete all draw */
        context.clearRect(0, 0, canvas.width, canvas.height);
        moveHeart();
        drawMap();
        console.log(tabMap.length-1);
    }
}
