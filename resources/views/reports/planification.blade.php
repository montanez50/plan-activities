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
            $month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"][$planification->month - 1]
        @endphp
        <h1>Planificación Periodo {{$month}} {{$planification->year}}</h1>
        <h2>{{$planification->user->name}} {{$planification->user->last_name}}</h2>
		<table>
			<thead>
				<tr>
					<th rowspan="2">#</th>
					<th rowspan="2">Actividad</th>
                    <th class="day" rowspan="2">Fecha Inicio</th>
                    <th class="day" rowspan="2">Fecha Fin</th>
                    <th class="day" rowspan="2">Días</th>
                    @foreach ($days as $day)
                        <th class="day">{{$day}}</th>
                    @endforeach
                    <th class="day" rowspan="2">%</th>
				</tr>
                <tr>
                    @foreach ($days as $key => $day)
                        <th class="day">{{$key+1}}</th>
                    @endforeach
                </tr>
			</thead>
			<tbody>
                @foreach($activities as $key => $activity)
                    @php
                        $plan = array_filter($activity->days);
                        $planIndex = array_keys($plan);
                        $first = reset($planIndex);
                        $end = end($planIndex);

                        $exePlan = array_filter($activity->days_execute);
                        $exePlanIndex = array_keys($exePlan);
                        $exeFirst = reset($exePlanIndex);
                        $exeEnd = end($exePlanIndex);

                        $porcent = (count($exePlan)/count($plan))*100;
                    @endphp
                    <tr>
                        <td rowspan="2">{{$key + 1}}</td>
                        <td rowspan="2">{{$activity->name}}</td>
                        <td class="day">{{$first}}/{{$planification->month}}/{{$planification->year}}</td>
                        <td class="day">{{$end}}/{{$planification->month}}/{{$planification->year}}</td>
                        <td class="day">{{count($plan)}}</td>
                        @foreach ($activity->days as $day)
                            <td class="day" @if($day)style="background-color: rgb(63, 211, 63)"@endif></td>
                        @endforeach
                        <td class="day" rowspan="2">{{number_format($porcent, 1, ',', ' ')}}%</td>
                    </tr>
                    <tr>
                        <td class="day">{{$exeFirst}}/{{$planification->month}}/{{$planification->year}}</td>
                        <td class="day">{{$exeEnd}}/{{$planification->month}}/{{$planification->year}}</td>
                        <td class="day">{{count($exePlan)}}</td>
                        @foreach ($activity->days_execute as $key => $day)
                            <td
                                class="day"
                                @if($day && $activity->days[$key] || $day && !$activity->days[$key])style="background-color: rgb(63, 206, 211)"@endif
                                @if(!$day && $activity->days[$key])style="background-color: rgb(211, 63, 63)"@endif
                            >
                            </td>
                        @endforeach
                    </tr>
                @endforeach
                <tr>
                    <th colspan="40">Actividades No Planificadas</th>
                </tr>
                @if(empty(count($noPlanActivities)))
                <tr>
                    <td colspan="40">No hay actividades</td>
                </tr>
                @endif
                @foreach($noPlanActivities as $key => $noPlanActivity)
                    @php
                        $noPlan = array_filter($noPlanActivity->days_execute);
                        $noPlanIndex = array_keys($noPlan);
                        $noFirst = reset($noPlanIndex);
                        $noEnd = end($noPlanIndex);
                    @endphp
                    <tr>
                        <td>{{$key + 1}}</td>
                        <td>{{$noPlanActivity->name}}</td>
                        <td class="day">{{$noFirst}}/{{$planification->month}}/{{$planification->year}}</td>
                        <td class="day">{{$noEnd}}/{{$planification->month}}/{{$planification->year}}</td>
                        <td class="day">{{count($noPlan)}}</td>
                        @foreach ($noPlanActivity->days_execute as $key => $day)
                            <td class="day" @if($day)style="background-color: rgb(63, 206, 211)"@endif></td>
                        @endforeach
                        <td class="day">100%</td>
                    </tr>
                @endforeach
			</tbody>
		</table>
	</div>
</body>
</html>
