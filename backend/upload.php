<?php
// $name = time().'.png';
// file_put_contents('../uploads/'.$name, base64_decode($_POST['data']));
// file_put_contents('../uploads/'.$name, $_POST['data']);

// $uploaddir = '/var/www/html/uploads/';
// $uploadfile = $uploaddir . basename($_FILES['userfile']['name']);
// //echo "server-upload-request";
// if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)) {
//     echo "File is valid, and was successfully uploaded.\n";
// } else {
//     echo "Possible file upload attack!\n";
//     // $a = print_r($_FILES);
//     // echo $a;
// }

$filename = $_FILES['file']['name'];
$tags = $_POST['tags'];  // $tags = array('dark', 'moon');
$destination = '../uploads/' . $filename;
move_uploaded_file( $_FILES['file']['tmp_name'] , $destination );
?>