<?php 
	session_start();
	if (isset($_SESSION['logged_user'])) {
	session_destroy();
	header("Location:/");
	} else {
		header("Location:/");}

 ?>