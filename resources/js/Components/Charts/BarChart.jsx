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

const  meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
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
        },
    }
};

export default function Bars({ activities, noPlanActivities }) {
    var miData = {
        labels: meses,
        datasets: [
            {
                label: 'Actividades Planificadas',
                data: activities,
                backgroundColor: 'rgba(220, 252, 231, 0.5)'
            },
            {
                label: 'Actividades no Planificadas',
                data: noPlanActivities,
                backgroundColor: 'rgba(254, 249, 195, 0.5)'
            }
        ]
    }
    console.log(miData);

    return <Bar data={miData} options={miOptions}></Bar>
}
