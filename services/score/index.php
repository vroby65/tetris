<?php
/* sintassi 
		index.php?op=add&file=file&user=user&score=score
		index.php?op=list&file=file
		ovviamente niente cancellare e un meccanismo di origine controllata
*/		
$op=$_GET['op'];
if ($op=="add"){
	$file=md5($_SERVER["HTTP_REFERER"]);
	//$file=$_SERVER["HTTP_REFERER"];
	echo "./$file<br>";
	$user=$_GET['user'];
	$score=substr("0000".$_GET['score'],-4);
	$list=file("./$file");
	$list[]=$score."  ".$user."\n";
	rsort($list);
	$fp=fopen("./$file","wb");
	$i=1;
	foreach($list as $el){
		fwrite($fp,$el);
		echo $i++." $el<br>\n";
		if ($i>100)break;
	}  
	fclose($fp);
	echo "added $score        $user";
}

if ($op=="list"){
	$file=md5($_SERVER["HTTP_REFERER"]);
	//$file=md5($_GET['file']);
	$list=file("./$file");
	rsort($list);
		$i=1;
		foreach($list as $el){
			if ($i<10)
				echo "0".$i++." $el";
			else
				echo $i++." $el";
		}  
	}

?>
