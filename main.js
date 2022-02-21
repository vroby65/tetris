var response;
function sendscore(user, score){
  var ScoreService="https://sdlbasic.altervista.org/sgl.js/services/score/index.php";
  var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET",ScoreService+"?op=add&user="+user+"&score="+score,false);
	xmlhttp.send();
	return xmlhttp.responseXML;
}
function listscore(){
   var ScoreService="https://sdlbasic.altervista.org/sgl.js/services/score/index.php";
   var xmlhttp=new XMLHttpRequest();
   xmlhttp.onreadystatechange=function(){
  		if (xmlhttp.readyState==4 && xmlhttp.status==200){
    		response=xmlhttp.responseText;
    	}
  	}    
	xmlhttp.open("GET",ScoreService+"?op=list",false);
	xmlhttp.send();
}


setdisplay(280,450);
setfps(40);
var surface_rotate=loadsurface('media/rotate.png');
var surface_left=loadsurface('media/left.png');
var surface_right=loadsurface('media/right.png');
var surface_down=loadsurface('media/down.png');

var surface_arrowup=loadsurface('https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-up-01-128.png');
var surface_arrowdown=loadsurface('https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-down-01-128.png');


var garbage=loadsound('media/GARBGEC2.WAV');
var fallen=loadsound('media/block_fallen.wav')
var countdown=loadsound('media/Countdown with Sound.mp3');
var mouseLock=0;
var classifica;
var score;
var user;
var time;
var speed;
var wait;
var state;

var blocco;
var nblocco;
var stblocco=0;
var xblocco;
var yblocco;
var ablocco;
    
var i=0;

var mappa= new Array();
for (i=0;i<10;i++)mappa[i]=new Array();

var palette=new Array();
palette[0]=rgb(255,0,0);
palette[1]=rgb(0,255,0);
palette[2]=rgb(0,0,255);
palette[3]=rgb(255,255,0);
palette[4]=rgb(0,255,255);
palette[5]=rgb(255,0,255);
palette[6]=rgb(255,128,128);


// - blocchi -------------------------------------------------------------------------
var bl=new Array();
for (i=0;i<7;i++){
  	bl[i]=new Array();
  	for(var a=0;a<4;a++){
		bl[i][a]=new Array();  
  		for(var y=0;y<4;y++){
			bl[i][a][y]=new Array();
        }
    }
}

//0 QUADRATO
bl[0][0][0]=[0,0,0,0];bl[0][1][0]=[0,0,0,0];bl[0][2][0]=[0,0,0,0];bl[0][3][0]=[0,0,0,0];
bl[0][0][1]=[0,1,1,0];bl[0][1][1]=[0,1,1,0];bl[0][2][1]=[0,1,1,0];bl[0][3][1]=[0,1,1,0];
bl[0][0][2]=[0,1,1,0];bl[0][1][2]=[0,1,1,0];bl[0][2][2]=[0,1,1,0];bl[0][3][2]=[0,1,1,0];
bl[0][0][3]=[0,0,0,0];bl[0][1][3]=[0,0,0,0];bl[0][2][3]=[0,0,0,0];bl[0][3][3]=[0,0,0,0];

//1 LINEA4
bl[1][0][0]=[0,1,0,0];bl[1][1][0]=[0,0,0,0];bl[1][2][0]=[0,0,1,0];bl[1][3][0]=[0,0,0,0];
bl[1][0][1]=[0,1,0,0];bl[1][1][1]=[1,1,1,1];bl[1][2][1]=[0,0,1,0];bl[1][3][1]=[0,0,0,0];
bl[1][0][2]=[0,1,0,0];bl[1][1][2]=[0,0,0,0];bl[1][2][2]=[0,0,1,0];bl[1][3][2]=[1,1,1,1];
bl[1][0][3]=[0,1,0,0];bl[1][1][3]=[0,0,0,0];bl[1][2][3]=[0,0,1,0];bl[1][3][3]=[0,0,0,0];
          
//2 ELLE1
bl[2][0][0]=[0,1,0,0];bl[2][1][0]=[0,0,0,0];bl[2][2][0]=[0,0,0,0];bl[2][3][0]=[0,0,0,0];
bl[2][0][1]=[0,1,0,0];bl[2][1][1]=[0,1,1,1];bl[2][2][1]=[0,1,1,0];bl[2][3][1]=[0,0,1,0];
bl[2][0][2]=[0,1,1,0];bl[2][1][2]=[0,1,0,0];bl[2][2][2]=[0,0,1,0];bl[2][3][2]=[1,1,1,0];
bl[2][0][3]=[0,0,0,0];bl[2][1][3]=[0,0,0,0];bl[2][2][3]=[0,0,1,0];bl[2][3][3]=[0,0,0,0];
          
//3 ELLE2
bl[3][0][0]=[0,0,1,0];bl[3][1][0]=[0,0,0,0];bl[3][2][0]=[0,0,0,0];bl[3][3][0]=[0,0,0,0];
bl[3][0][1]=[0,0,1,0];bl[3][1][1]=[0,1,0,0];bl[3][2][1]=[0,1,1,0];bl[3][3][1]=[1,1,1,0];
bl[3][0][2]=[0,1,1,0];bl[3][1][2]=[0,1,1,1];bl[3][2][2]=[0,1,0,0];bl[3][3][2]=[0,0,1,0];
bl[3][0][3]=[0,0,0,0];bl[3][1][3]=[0,0,0,0];bl[3][2][3]=[0,1,0,0];bl[3][3][3]=[0,0,0,0];
          
//4 ESSE1
bl[4][0][0]=[0,0,1,0];bl[4][1][0]=[0,0,0,0];bl[4][2][0]=[0,0,0,0];bl[4][3][0]=[0,0,0,0];
bl[4][0][1]=[0,1,1,0];bl[4][1][1]=[0,1,1,0];bl[4][2][1]=[0,0,1,0];bl[4][3][1]=[1,1,0,0];
bl[4][0][2]=[0,1,0,0];bl[4][1][2]=[0,0,1,1];bl[4][2][2]=[0,1,1,0];bl[4][3][2]=[0,1,1,0];
bl[4][0][3]=[0,0,0,0];bl[4][1][3]=[0,0,0,0];bl[4][2][3]=[0,1,0,0];bl[4][3][3]=[0,0,0,0];
          
//5 ESSE2
bl[5][0][0]=[0,1,0,0];bl[5][1][0]=[0,0,0,0];bl[5][2][0]=[0,0,0,0];bl[5][3][0]=[0,0,0,0];
bl[5][0][1]=[0,1,1,0];bl[5][1][1]=[0,0,1,1];bl[5][2][1]=[0,1,0,0];bl[5][3][1]=[0,1,1,0];
bl[5][0][2]=[0,0,1,0];bl[5][1][2]=[0,1,1,0];bl[5][2][2]=[0,1,1,0];bl[5][3][2]=[1,1,0,0];
bl[5][0][3]=[0,0,0,0];bl[5][1][3]=[0,0,0,0];bl[5][2][3]=[0,0,1,0];bl[5][3][3]=[0,0,0,0];
                       
//6 TI
bl[6][0][0]=[0,0,1,0];bl[6][1][0]=[0,0,0,0];bl[6][2][0]=[0,0,0,0];bl[6][3][0]=[0,0,0,0];
bl[6][0][1]=[0,1,1,0];bl[6][1][1]=[0,0,1,0];bl[6][2][1]=[0,1,0,0];bl[6][3][1]=[1,1,1,0];
bl[6][0][2]=[0,0,1,0];bl[6][1][2]=[0,1,1,1];bl[6][2][2]=[0,1,1,0];bl[6][3][2]=[0,1,0,0];
bl[6][0][3]=[0,0,0,0];bl[6][1][3]=[0,0,0,0];bl[6][2][3]=[0,1,0,0];bl[6][3][3]=[0,0,0,0];
         
// - tile -------------------------------------------------------------------------
function tile(x,y,c){
	bar(display,32+(x*16), 40+(y*16), 16, 16, c);
	box(display,32+(x*16), 40+(y*16), 16, 16, rgb(0,0,0));
}

// - drawblocco -------------------------------------------------------------------------
function drawblocco(p,x,y,a){
    for(var ya=0;ya<4;ya++)         
    	for(var xa=0;xa<4;xa++)         
             if (bl[p][a][ya][xa]==1)tile(xa+x,ya+y,palette[p]);
}

// - checkbordi -------------------------------------------------------------------------
function checkbordi(p,x,y,a){
  for(var ya=0;ya<4;ya++){         
    for(var xa=0;xa<4;xa++){         
      if (bl[p][a][ya][xa]==1){
               if (x+xa >9 )return true;
               if (x+xa <0 )return true;
        	   if (mappa[x+xa][y+ya]!=-1)return true;
      }
    }
  }
  return false
}

// - checklinea -------------------------------------------------------------------------
function checklinea(){
  var r;
  for (var y=19;y>0;y--){
      r=0;
      for(var x=0;x<10;x++){
		if (mappa[x][y]!=-1) r++;        
      }
      if (r==10){
      	score=score+1;        
  		for (var yr=y;yr>1;yr--)
      		for(var xr=0;xr<10;xr++)
    			mappa[xr][yr]=mappa[xr][yr-1];
        garbage.play();
     }
    
  }
}


// - checkmappa -------------------------------------------------------------------------
function checkmappa(p,x,y,a){
  for(var ya=0;ya<4;ya++){         
    for(var xa=0;xa<4;xa++){         
      if (bl[p][a][ya][xa]==1){
        if (mappa[xa+x][ya+y+1]!=-1 ||(ya+y)>19){
          	addmappa(p,x,y,a);
          	stblocco=0;
          if (y+ya<1){
            	state=2; 
            	time=0;
          }
          	return true;
        }
        }
    }
  }
  return false
}

// - addmappa -------------------------------------------------------------------------
function addmappa(p,x,y,a){
   for(var ya=0;ya<4;ya++)         
    	for(var xa=0;xa<4;xa++)         
             if (bl[p][a][ya][xa]==1)mappa[x+xa][y+ya]=p;
  fallen.play();
}

// - drawmappa -------------------------------------------------------------------------
function drawmappa(){
 for (var x=0;x<10;x++) 
	for  (var y=0;y<20; y++)
      	if( mappa[x][y]!=-1)
			tile(x,y,palette[mappa[x][y]]);
}

// - drawsfondo -------------------------------------------------------------------------
function drawsfondo(){
  var i;
  cls(display,rgb(255,255,255));  
  for(i=0;i<20; i++)tile(-1,i,rgb(160,160,160));
  for(i=0;i<20; i++)tile(10,i,rgb(160,160,160));
  for(i=-1;i<11; i++)tile(i, 20, rgb(160,160,160));
  for (var x=0;x<10;x++)for (var y=0;y<20;y++)tile(x,y,rgb(120,120,120));

  box(display,08,380,64,64,rgb(0,0,255));blt(display,08,380,64,64,surface_left);
  box(display,72,380,64,64,rgb(0,0,255));blt(display,72,380,64,64,surface_right);
  box(display,136,380,64,64,rgb(0,0,255));blt(display,136,380,64,64,surface_rotate);
  box(display,200,380,64,64,rgb(0,0,255));blt(display,206,386,48,48,surface_down);

}


// - game -------------------------------------------------------------------------
function game(){
  
  if (stblocco ==0){
    	stblocco=1;
   		blocco=nblocco.toFixed();
    	nblocco=Math.random()*6;
    	xblocco =3;
    	yblocco=-1;
    	ablocco=0;
    	wait=speed;
  }
  
  if (mouseB==0)mouseLock=0;
  
  if (mouseB!=0 && mouseLock==0){
    	mouseLock=1;
	  if(mousezone(08,380,64,64))key[KEY_LEFT]=1; else key[KEY_LEFT]=0;
	  if(mousezone(72,380,64,64))key[KEY_RIGHT]=1; else key[KEY_RIGHT]=0;
	  if(mousezone(136,380,64,64))key[KEY_UP]=1; else key[KEY_UP]=0;
	  if(mousezone(200,380,64,64))key[KEY_SPACE]=1; else key[KEY_SPACE]=0;
  }

  
  	if ( key[KEY_LEFT]){
    	xblocco-- ;
    	if (checkbordi(blocco,xblocco,yblocco,ablocco))xblocco++;
    	key[KEY_LEFT]=0;
  	}
  	if ( key[KEY_RIGHT]){
    	xblocco++;
    	if (checkbordi(blocco,xblocco,yblocco,ablocco))xblocco--;
    	key[KEY_RIGHT]=0;
  	}
  	if ( key[KEY_UP]){
    	ablocco++;
  		if(ablocco>3)ablocco=0;
        if (checkbordi(blocco,xblocco,yblocco,ablocco))ablocco--;
  		if(ablocco<0)ablocco=3;
    	key[KEY_UP]=0;
  	}
  	if ( key[KEY_DOWN]){
    	yblocco++;
    	key[KEY_DOWN]=0;
  	}
  
  	if ( key[KEY_SPACE]){
	 	while( checkmappa(blocco,xblocco,yblocco,ablocco)==false)
       		yblocco++;
   		key[KEY_SPACE]=0;
  	}
    
  if ( (ticks / speed).toFixed() !=wait){
    	wait=(ticks / speed).toFixed(); 
    		yblocco++;
			time--;
  			if (time==7)countdown.play();
  }
  if (time==0) state=2;
    
  checkmappa(blocco,xblocco,yblocco,ablocco);
  drawsfondo();
  drawmappa();
  
  drawblocco(blocco,xblocco,yblocco,ablocco);
  text ( display, 95, 30, 30, rgb(0,0,255), 'score ' + score);
  text ( display, 15, 30, 30, rgb(255,0,0),  time);

  drawblocco(nblocco.toFixed(),11,1,0);

  checklinea();
}
// - init game -------------------------------------------------------------------------
function initgame(){
  	 for (var x=0;x<10;x++) 
		for  (var y=0;y<20; y++)
			mappa[x][y]=-1;
	drawsfondo();
	speed=1000;
  	state=1;
    score=0;
    time=120;
	nblocco=Math.random()*6;
  	stblocco=0;		
}


// - title -------------------------------------------------------------------------
function title(){
	cls( display, rgb(255,255,255) );
  	text ( display, 50, 50, 20, rgb(0,0,0), 'score ' + score);
  
	text ( display, 50, 240, 50, rgb(0,0,0), 'Tetris');
  	text ( display, 50, 260, 20, rgb(0,0,0), 'press CTRL to start ');
  
  	if (key[KEY_CTRL] ||mouseB!=0){
      	initgame();
	}
}

// - scoreplayer -------------------------------------------------------------------------
function scoreplayer(){
  	user=prompt("your score is "+score+ " please insert your name");
    key=[];
  	sendscore(user,score);
    listscore();
	classifica=response.split('\n');  
	state=3;
	i=0;  
} 

// - gameover -------------------------------------------------------------------------
function gameover(){
	cls( display, rgb(255,255,255) );  
  	text ( display, 20, 70, 30, rgb(0,0,0), 'Game OVER' );
  	text ( display, 10, 100, 15, rgb(0,0,255), 'press ctrl or click me to retry' );
  	if(mousezone(10,90,180,40))
	  	text ( display, 10, 100, 15, rgb(255,0,0), 'press ctrl or click me to retry' );
  
  for (var a=0; a<10;a++){
    if (classifica[a+i]!=null){
      		var tmp=("0000"+score).substr(-4)+"  "+user;
        if (classifica[a+i].substr(-tmp.length)== tmp)
    		text ( display, 20, a*20+190, 20, rgb(255,0,0), classifica[a+i]);
    	else
    		text ( display, 20, a*20+190, 20, rgb(0,0,255), classifica[a+i]);
    }
  }
  box(display,20,130,180,40,rgb(0,0,255));
  blt(display, 40,131,140,38,surface_arrowup);
  box(display,20,390,180,40,rgb(0,0,255));
  blt(display, 40,391,140,38,surface_arrowdown);
  if (key[KEY_UP]||(mousezone(20,130,180,40) && mouseB)){i--; if (i<0)i=0;  }
  if (key[KEY_DOWN]||(mousezone(20,390,180,40) && mouseB)){i++; if (i>90)i=90;  }
  	if (key[KEY_CTRL]||(mouseB!=0 && mousezone(10,90,180,40))){
    	state=0;
        score=0;
	}
}

// - main loop -------------------------------------------------------------------------
state=0;
score=0;
function update() {
  if (state==0)title();
  if(state==1)game();
  if(state==2)scoreplayer();
  if(state==3)gameover();
 
}
