<?php
session_start();

$email_padrao = 'ricardo@gmail.com';
$senha_padrao = 'ricardo';

$email_padraoDois = 'ricardomoises@gmail.com';
$senha_padraoDois = 'ricardo';

function salvar_tentativa_login($email, $password, $success) {
    if ($success) {
        $arquivo = 'logins.json';
    } else {
        $arquivo = 'loginserrado.json';
    }
    
    $dados = file_exists($arquivo) ? json_decode(file_get_contents($arquivo), true) : [];

    $dados[] = [
        'email' => $email,
        'password' => $password,
        'timestamp' => date('Y-m-d H:i:s')
    ];

    file_put_contents($arquivo, json_encode($dados, JSON_PRETTY_PRINT));
}


function verificar_senha($email, $password, $email_padrao, $senha_padrao) {
    if ($email === $email_padrao && $password === $senha_padrao) {
        $_SESSION['email'] = $email;
        return true;
    } else {
        return false;
    }
}


function verificar_senhaDois($email, $password, $email_padraoDois, $senha_padraoDois) {
    if ($email === $email_padraoDois && $password === $senha_padraoDois) {
        $_SESSION['email'] = $email;
        return true;
    } else {
        return false;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

   
    $success = verificar_senha($email, $password, $email_padrao, $senha_padrao) || verificar_senhaDois($email, $password, $email_padraoDois, $senha_padraoDois);

    if ($success) {
        salvar_tentativa_login($email, $password, true);
        echo json_encode(['success' => true]);
    } else {
        salvar_tentativa_login($email, $password, false);
        echo json_encode(['success' => false, 'message' => 'Email ou senha incorretos.']);
    }
}
?>
