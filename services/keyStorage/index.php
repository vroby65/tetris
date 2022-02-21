<?php
/* sintassi 
		index.php?op=add&file=file&user=user&score=score
		index.php?op=list&file=file
		ovviamente niente cancellare e un meccanismo di origine controllata
*/		
$op=$_GET['op'];
if ($op=="push"){
	$file=md5($_SERVER["HTTP_REFERER"]);
	//$file=$_SERVER["HTTP_REFERER"];
	echo "./$file<br>";
	$user=md5($_GET['user']);
	$value=$_GET['value'];
	$list=file("./$file");
    for($i=0;$i<count($list);$i++){
    	if( substr($list[$i],0,strlen($user))==$user){
				$list[$i]=$user."  ".$value."\n";
        		$user="none";
        }
    }
    if ($user !="none")	$list[]=$user."  ".$value."\n";
	$fp=fopen("./$file","wb");
	$i=1;
	foreach($list as $el){
		fwrite($fp,$el);
		echo $i++." $el<br>\n";
		if ($i>100)break;
	}  
	fclose($fp);
}

if ($op=="pop"){
	$file=md5($_SERVER["HTTP_REFERER"]);
	//$file=md5($_GET['file']);
	$user=md5($_GET['user']);
	$list=file("./$file");
	foreach($list as $el){
		if( substr($el,0,strlen($user))==$user){	
        	echo substr($el, strlen($user)+2);
            //echo $el[$i];
        }  
	}
}
?>
