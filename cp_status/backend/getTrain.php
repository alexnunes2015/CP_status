<?php
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Obtém o valor dos parâmetros GET
        $train_number = $_GET['trainNumber'];
        $date = $_GET['data'];

        // Constrói a URL da API
        $endpoint = 'https://www.infraestruturasdeportugal.pt/negocios-e-servicos/horarios-ncombio/';
        $url = "{$endpoint}{$train_number}/{$date}";

        // Configura as opções da requisição
        $options = array(
            'http' => array(
                'method'  => 'GET',
            ),
        );

        // Faz a requisição
        $context  = stream_context_create($options);
        $response = file_get_contents($url, false, $context);

        // Define o cabeçalho como JSON
        header('Content-Type: application/json');

        // Exibe a resposta
        echo $response;
    }
?>
