<?php 
	session_start();
	if (isset($_SESSION['logged_user'])) {
	echo '<br>ывапаваыв';
	echo'<a href=/logout.php>выйти</a>';
	echo $_SESSION['logged_user'];
	unset($_SESSION['ref']);

		} else {
	header("Location:/login.php");
	}


 ?>