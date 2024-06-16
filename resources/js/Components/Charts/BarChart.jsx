import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

var beneficios = [23, 12, 23, 5, 16, 34, 27, 15, 17, 19, 20, 13];
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

var miOptions = {
    responsive: true,
    animation: true,
    plugins: {
        legend: {
            display: true
        }
    },
    scales: {
        y: {
            min: 0,
            max: 50
        },
    }
};

var miData = {
    labels: meses,
    datasets: [
        {
            label: 'Actividades Planificadas',
            data: beneficios,
            backgroundColor: 'rgba(220, 252, 231, 0.5)'
        },
        {
            label: 'Actividades no Planificadas',
            data: beneficios,
            backgroundColor: 'rgba(254, 249, 195, 0.5)'
        }
    ]
}

export default function Bars() {
    return <Bar data={miData} options={miOptions}></Bar>
}
