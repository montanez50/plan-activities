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

export default function Bars({ names, porcents }) {
    var miData = {
        labels: names,
        datasets: [
            {
                label: 'Actividades',
                data: porcents,
                backgroundColor: 'rgba(75, 192, 192, 0.5)'
            },
        ]
    }

    return <Bar data={miData} options={miOptions}></Bar>
}
