<?php
    header("Access-Control-Allow-Origin: http://localhost:3000");
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $estacao = $_GET['estacao']; // obtém o valor da variável "estacao" do GET
        $endpoint = 'https://www.infraestruturasdeportugal.pt/negocios-e-servicos/estacao-nome/';
        $url = $endpoint . $estacao;

        $options = array(
            'http' => array(
                'method'  => 'GET',
            ),
        );

        $context  = stream_context_create($options);
        $response = file_get_contents($url, false, $context);

        // Define o cabeçalho como JSON
        header('Content-Type: application/json');

        echo $response;
    }
?>
