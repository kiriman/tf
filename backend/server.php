<?php
// header('Content-Type: text/html; charset=utf-8');
$params = json_decode(trim(file_get_contents('php://input')), true);//split to array

if(isset($params['q'])){$q = $params['q'];}//query
if(isset($params['p1'])){$p1 = $params['p1'];}//in_inn
if(isset($params['p2'])){$p2 = $params['p2'];}//in_kpp
if(isset($params['p3'])){$p3 = $params['p3'];}//in_bik
if(isset($params['p4'])){$p4 = $params['p4'];}//in_kor
if(isset($params['p5'])){$p5 = $params['p5'];}//in_rh

if( isset($q) ){
	switch ($q){
		case "query":
			sleep(1);
			echo "server-echo-test-success";//json_encode($rows);
			// $p1 = $p1 * $p1;
			//$p1 = pow(2, $p1);
			//echo $p1.' '.$p2.' '.$p3.' '.$p4.' '.$p5;
			
			exit;
		    break;
	};//end switch
};//end if( isset($q) )
?>