import React from "react";

export default class TimeTable extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            data: []
        }
    }

    getTimeTableData = () => {
        // Obtenha a data e hora atuais
        const currentDate = new Date();
    
        // Ajuste a data com base no deslocamento do fuso horário
        const offset = currentDate.getTimezoneOffset();
        currentDate.setMinutes(currentDate.getMinutes() - offset);
    
        // Formate a data ajustada no formato AAAA-MM-DD
        const formattedDate = currentDate.toISOString().slice(0, 10);    
    
        // Obtenha a hora atual e adicione 2 horas para a hora final
        const startHour = String(currentDate.getHours()).padStart(2, '0');
        const startMinute = String(currentDate.getMinutes()).padStart(2, '0');
        const endHour = String((currentDate.getHours() + 2) % 24).padStart(2, '0'); // % 24 para lidar com a transição do dia
        const endMinute = startMinute;
    
        const horaInicial = `${startHour}:${startMinute}`;
        const horaFinal = `${endHour}:${endMinute}`;
    
        fetch(
            `https://127.0.0.1/getTimeTable.php?stationID=${this.props.currentStationID}&horaInicial=${horaInicial}&horaFinal=${horaFinal}&servico=INTERNACIONAL,ALFA,IC,IR,REGIONAL,URB|SUBUR,ESPECIAL&data=${formattedDate}`,
            {
                method: "GET",
                headers: {
                    Accept: "*/*",
                },
            }
        )
        .then((response) => response.json())
        .then((data) => this.setState({ data: data.response[0].NodesComboioTabelsPartidasChegadas }))
        .catch((error) => console.error(error));
    }
    

    componentDidMount(){
        console.log('OK');
        this.getTimeTableData();
    }

    render(){
        return <div>OLÀ</div>
    }
}