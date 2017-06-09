<?php 
	require 'include/db.php';
	session_start();

	if (isset($_SESSION['logged_user'])) {
	header("Location:/");
}
	$data = $_POST;
	if (isset($data['sign'])) {
		// Sing in code



		$err = array();

		if (trim($data['login']) == '') {
			$err[] = 'Введите логин';
		}

		if (trim($data['mail']) == '') {
			$err[] = 'Введите mail';
		}

		if ($data['password'] == '') {
			$err[] = 'Введите password';
		}

		if ($data['password2'] != $data['password']) {
			$err[] = 'password2 wrong';
		}

		if (R::count('users', 'login = ?', array($data['login'])) > 0 ) {
			$err[] = 'Пользователь с таким логином уже существует!';
		}

		if (R::count('users','email = ?', array($data['mail'])) > 0) {
			$err[] = 'Пользователь с таким email уже существует!';
		}

		if (empty($err)) {
			// go sign
				if(R::count('users', 'login = ?', array($data['refer'])) > 0){
					$referer = $data['refer'];
				} else { 
					$referer = 'dpetya2001';
				}
				$user = R::dispense('users');
				$user->login = $data['login'];
				$user->email = $data['mail'];
				$user->password = $data['password2'];
				$user->balance = 0;
				$user->balancetow = 0;
				$user->deposits = 0;
				$user->refer = $referer;
				$user->referals = 0;
				R::store($user);
				$_SESSION['logged_user'] = $data['login'];
				echo '<script language="javascript">top.location.href="/account.php";</script>';



			// do sign
		} else {
			echo '<div style="color: red;">'.array_shift($err).'</div>';
		}


	}
 ?>

 <!DOCTYPE html>
 <html lang="ru">
 <head>
 	<meta charset="UTF-8">
 	<title>Регистрация</title>
 </head>
 <body>
 <form action="reg.php" method="POST">
 	<p><input type="hidden" name="refer" value="<?php echo $_SESSION['ref']; ?>"></p>
 	<p>
 		<p><strong>Ваш логин</strong></p>
 		<input type="text" name="login" value="<?php echo @$data['login']; ?>">
 	</p>

 	<p>
 		<p><strong>Ваша Почта</strong></p>
 		<input type="email" name="mail" value="<?php echo @$data['mail']; ?>">
 	</p>

 	<p>
 		<p><strong>Ваш password</strong></p>
 		<input type="password" name="password">
 	</p>

 	<p>
 		<p><strong>Ваш password too</strong></p>
 		<input type="password" name="password2">
 	</p>

 	<p>
 		<button type="sumbit" name="sign">Sign in</button>
 	</p>

 </form>

 </body>
 </html>