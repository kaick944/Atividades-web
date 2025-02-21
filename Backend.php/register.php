<?php

function armazenar_dados_usuario($email, $password) {

    $hashed_password = password_hash($password, PASSWORD_BCRYPT);
    
   
    $dados_usuario = array(
        'email' => $email,
        'password' => $hashed_password
    );

    
    $json_dados = json_encode($dados_usuario);

    
    file_put_contents('usuario.json', $json_dados);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    
    armazenar_dados_usuario($email, $password);

    echo json_encode(['success' => true, 'message' => 'Registrado com sucesso']);
}
?>
