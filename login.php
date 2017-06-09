<?php 
	require 'include/db.php';
	session_start();
	if (isset($_SESSION['logged_user'])) {
	header("Location:/");
	}

	$data = $_POST;
	if (isset($data['log_in'])) {
		$err = array();
		$user = R::findone('users','login = ?', array($data['login']));
		if ($user) {
			if ($data['password'] == $user->password) {
				// auth ok
				// log in
				$_SESSION['logged_user'] = $user->login;
				echo "Logged, go to <a href=/>main page</a>";
				echo '<script language="javascript">top.location.href="/account.php";</script>';
			} else{
				$err[] = 'Неверный пароль';
			}
		} else {
			$err[] = 'Пользователь с таким логином не найден! "'.$data['login'].'"';

		}

		if (!empty($err)) {
			echo '<div style="color: red;">'.array_shift($err).'</div>';
		}
	}
?>


<form action="login.php" method="POST">

	<p>
 		<p><strong>Ваш логин</strong></p>
 		<input type="text" name="login" value="<?php echo @$data['login']; ?>">
 	</p>

 	<p>
 		<p><strong>Ваш password</strong></p>
 		<input type="password" name="password">
 	</p>
	
	<p>
 		<button type="sumbit" name="log_in">войти</button>
 	</p>


</form>