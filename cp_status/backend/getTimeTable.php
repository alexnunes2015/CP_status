<?php
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Obtém o valor dos parâmetros GET
        $station_id = $_GET['stationID'];
        $hora_inicial = $_GET['horaInicial'];
        $hora_final = $_GET['horaFinal'];
        $tipos_servico = $_GET['servico'];

        // Constrói a URL da API
        $endpoint = 'https://www.infraestruturasdeportugal.pt/negocios-e-servicos/partidas-chegadas/';
        $url = "{$endpoint}{$station_id}/{$hora_inicial}/{$hora_final}/{$tipos_servico}";

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
