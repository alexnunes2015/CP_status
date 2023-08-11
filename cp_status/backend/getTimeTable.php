<?php
    function codificarTiposServico($tipos_servico) {
        $tipos = explode(',', $tipos_servico); // Divide a string em partes separadas por vírgula
        
        // Itera sobre os tipos e aplica urlencode
        for ($i = 0; $i < count($tipos); $i++) {
            $tipos[$i] = urlencode(trim($tipos[$i])); // trim() remove espaços em branco no início e no final
        }
        
        // Junta os tipos codificados com vírgulas e espaços
        $codificados = implode(',%20', $tipos);
        
        return $codificados;
    }

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Obtém o valor dos parâmetros GET
        $station_id = $_GET['stationID'];
        $hora_inicial = $_GET['horaInicial'];
        $hora_final = $_GET['horaFinal'];
        $data = $_GET['data'];
        // TIPOS DE SERVIÇO:
        // INTERNACIONAL,ALFA,IC,IR,REGIONAL,URB|SUBUR,ESPECIAL
        $tipos_servico = codificarTiposServico($_GET['servico']);

        // Constrói a URL da API
        $endpoint = 'https://servicos.infraestruturasdeportugal.pt/negocios-e-servicos/partidas-chegadas/';
        $url = "{$endpoint}{$station_id}/{$data}%20{$hora_inicial}/{$data}%20{$hora_final}/{$tipos_servico}";

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
