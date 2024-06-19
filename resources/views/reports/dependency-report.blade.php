<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        @page { margin: 0px; }
        body {
            font-family: Arial, sans-serif;
            /*background-color: #f9f9f9;*/
        }

        .container {
            /*max-width: 800px;*/
            /*margin: 40px auto;*/
            padding: 10px;
            background-color: #fff;
            /*border: 1px solid #ddd;*/
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: left;
        }

        .day {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: center;
        }

        th {
            background-color: #f0f0f0;
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        tr:hover {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    <div class="container">
        @php
            $monthName = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"][$month - 1]
        @endphp
        <h1>Planificaciones {{$dependency->name}}</h1>
        <h2>Periodo: {{$monthName}} {{$year}}</h2>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>Act. Plan.</th>
                    <th>Act. No Plan.</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Fin</th>
                    <th>Fecha Inicio Real</th>
                    <th>Fecha Fin Real</th>
                    <th>%</th>
                </tr>
            </thead>
            <tbody>
                @foreach($formatPlanifications as $key => $data)
                @php
                    $porcent = ($data['real_days']/$data['days'])*100;
                @endphp
                <tr>
                    <td>{{$key + 1}}</td>
                    <td>{{$data['name']}}</td>
                    <td>{{$data['status']}}</td>
                    <td>{{$data['activities']}}</td>
                    <td>{{$data['noPlanActivities']}}</td>
                    <td>{{$data['date_start']}}</td>
                    <td>{{$data['date_end']}}</td>
                    <td>{{$data['real_date_start']}}</td>
                    <td>{{$data['real_date_end']}}</td>
                    <td>
                        <span
                            @if($data['status'] == 'Cerrado' && ($porcent < 100 || $porcent > 100))style="color: red"@endif
                        >
                            {{number_format($porcent, 1, ',', ' ')}}%
                        </span> 
                        ({{$data['real_days']}}/{{$data['days']}})
                    </td>
                </tr>
                @endforeach
                @if(empty($formatPlanifications))
                <tr>
                    <td colspan="10">No hay planificaciones</td>
                </tr>
                @endif
            </tbody>
        </table>
    </div>
</body>
</html>