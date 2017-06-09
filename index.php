<?php 
	require 'include/db.php';
	require_once 'include/Twig/Autoloader.php';
	Twig_Autoloader::register();

	session_start();
	$_SESSION['ref'] = $_GET['r'];
if (isset($_SESSION['logged_user'])) {
	$url1 = '/account.php';
	$item1 = 'В кабинет';
	$url2 = '/logout.php';
	$item2 = 'Выйти';
	$icon = '/design/icons/homepage.svg';
} else {
	$url1 = '/login.php';
	$item1 = 'Авторизация';
	$url2 = '/reg.php';
	$item2 = 'Регистрация';
	$icon = '/design/icons/reg.svg';
}

	try {
  
  	$loader = new Twig_Loader_Filesystem('templates');
  	$twig = new Twig_Environment($loader);
  	$template = $twig->loadTemplate('main_page.html');
  	echo $template->render(array(
    	'url1' => $url1,
    	'url2' => $url2,
    	'item1' => $item1,
    	'item2' => $item2,
    	'icon' => $icon));

	} catch (Exception $e) {
  	die ('ERROR: ' . $e->getMessage());
		}
	

?>
