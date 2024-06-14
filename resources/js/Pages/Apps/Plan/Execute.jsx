import Button from '@/Components/Button'
import Input from '@/Components/Input'
import SelectInput from '@/Components/Select'
import AppLayout from '@/Layouts/AppLayout'
import { Head, router, usePage } from '@inertiajs/react';
import { IconPencilPlus, IconUsers, IconPlus, IconTrash } from '@tabler/icons-react'
import toast from 'react-hot-toast'
import React, { useState, useEffect } from 'react'
import Table from '@/Components/Table'

const MarkCell = ({ id, item, changeActivity, status, ...props }) => {
    const [active, setActive] = useState(status);
    const handleChange = () => {
        setActive(active ? false : true);
    }

    useEffect(() => {
        changeActivity(id, item, active);
    }, [id, item, active, changeActivity]);

    return (
        <Table.TdNumber className={` ${active ? 'bg-cyan-400' : ''}`} onClick={() => handleChange()} {...props}>x</Table.TdNumber>
    );
}

const ActivityInput = ({ id, item, changeActivity }) => {
    const [text, setText] = useState(item.name ?? '');
    const handleChange = (event) => {
        setText(event.target.value);
    }

    useEffect(() => {
        changeActivity(id, 'text', text);
    }, [id, text, changeActivity]);

    return (
        <>
            <Input
                id={`${id}-text`}
                name={`${id}-text`}
                value={text}
                onChange={handleChange}
                className="mt-1 block w-full"
                required
            />
        </>
    )
}

const Activity = ({ id, numbers, item, handleRemove, changeActivity }) => {
    return (
        <>
            <tr>
                <Table.Td scope="row" rowSpan={2}>
                    {id + 1}
                </Table.Td>
                <Table.Td rowSpan={2}>
                    {item.name}
                </Table.Td>
                {numbers.map((data, i) =>  <Table.TdNumber key={i} className={` ${ (item.days ? item.days[data] : false) ? 'bg-green-600' : ''}`}>x</Table.TdNumber> )}
            </tr>
            <tr>
                {numbers.map((data, i) =>  <MarkCell key={i} id={id} item={data} changeActivity={changeActivity} status={item.days_execute ? item.days_execute[data] : false} /> )}
            </tr>
        </>
    );
}

const MonthSelector = ({ month, handleChange }) => {
    const months = [
        {value: 1, label: 'Enero'},
        {value: 2, label: 'Febrero'},
        {value: 3, label: 'Marzo'},
        {value: 4, label: 'Abril'},
        {value: 5, label: 'Mayo'},
        {value: 6, label: 'Junio'},
        {value: 7, label: 'Julio'},
        {value: 8, label: 'Agosto'},
        {value: 9, label: 'Septiembre'},
        {value: 10, label: 'Octubre'},
        {value: 11, label: 'Noviembre'},
        {value: 12, label: 'Diciembre'},
    ];

    return (
        <div className='my-2'>
            <SelectInput
                label={'Mes'}
                options={months}
                value={months.filter(data => data.value == month)[0]}
                onChange={handleChange}
            />
        </div>
    )
}

const parseInfo = (month, year = null) => { 
    const monthDays = [];
    const colorDays = [];
    const days = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    const date = new Date();
    const use_year = year ?? date.getFullYear();
    const daysInMonth = new Date(use_year, month, 0).getDate();
    const numbers = Array(daysInMonth).fill().map((_, i) => i + 1);
    
    date.setDate(1);
    date.setFullYear(use_year);
    date.setMonth(month - 1);
    const dayOfWeek = date.getDay();
    for (let i = 0; i < daysInMonth; i++) {
        let day = new Date(date);
        let calc = (dayOfWeek + i) % 7;
        day.setDate(i + 1);
        monthDays.push(days[calc]);
        if (calc === 0 || calc === 6) {
            colorDays.push(i+1);
        }
    }

    return {
        monthDays,
        colorDays,
        numbers,
        year: use_year,
    }
}

export default function Create() {
    // get data
    const { planification, activities, errors } = usePage().props;

    const [data, setData] = useState([]);
    const [month, setMonth] = useState(planification.period.split('-')[1]);
    const [activity, setActivity] = useState(activities);
    const {monthDays, colorDays, numbers, year} = parseInfo(month, planification.period.split('-')[0]);
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    // Cambia valor del mes
    const handleChangeSelector = (e) => {
        setMonth(e.value);
        setData([]);
    };

    // Remueve actividad
    const handleRemove = (id) => {
        const newList = activity.filter((item, i) => i !== id);
        const newData = data.filter((item, i) => i !== id);
        setData(newData);
        setActivity(newList);
    }

    // Agrega actividad
    const addActivity = () => {
        const num = activity.length;
        setActivity([...activity, num]);
    }

    // Cambia el estado y lo almacena
    const handleChangeActivity = (activityId, itemId, value) => {
        setData((old) => {
            let n = old;
            if (!n[activityId]) {
                n[activityId] = {};
            }
            if (!n[activityId][itemId]) {
                n[activityId][itemId] = '';
            }
            n[activityId][itemId] = value;
            return n;
        });
    }

    const submit = (e) => {
        e.preventDefault();

        if (data.length !== 0) {
            router.post(route('planification.update'), { period: `${year}-${month}`, activities: data}, {
                onSuccess: () => {
                    toast.success('Planificación ejecutada correctamente!',{
                        icon: '👏',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    })
                }
            });
        } else {
            console.log('No hay planificaciones');
        }
    };

    useEffect(() => {
        Object.entries(errors).forEach(([key, value]) => {
            toast.error(`${value}`);
        });
    }, [errors]);

    return (
        <>
            <Head title='Editar Planificación'/>
            <div className='mb-5'>
                <div className='flex flex-row items-center md:justify-between gap-5'>
                    <div className='w-full'>
                        <h3 className="font-semibold text-l text-gray-800 leading-tight mb-2">Mes de {months[month - 1]} del {year}</h3>
                    </div>
                </div>
            </div>
            <Table.Card title={'EJECUTAR PLANIFICACIÓN'} icon={<IconUsers strokeWidth={'1.5'} size={'20'}/>}>
                <form onSubmit={submit}>
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th rowSpan={2} scope="col">#</Table.Th>
                                <Table.Th rowSpan={2} scope="col">Actividades</Table.Th>
                                {monthDays.map((data, i) => (
                                    <Table.ThNumber key={i} scope="col" className={` py-3 ${data === 'S' || data === 'D' ? 'bg-blue-600 dark:text-white' : 'bg-gray-100'}`}>
                                        {data}
                                    </Table.ThNumber>
                                ))}
                            </tr>
                            <tr>
                                {numbers.map((data, i) => (
                                    <Table.ThNumber key={i} scope="col" className={` py-3 ${colorDays.includes(data) ? 'bg-blue-600 dark:text-white' : 'bg-gray-100'}`}>
                                        {data}
                                    </Table.ThNumber>
                                ))}
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {activity.map((item, i) => (
                                <Activity
                                    key={item.id ?? item}
                                    id={i}
                                    item={item}
                                    numbers={numbers}
                                    handleRemove={handleRemove}
                                    changeActivity={handleChangeActivity}
                                />
                            ))}
                            <tr>
                                <Table.Td className='bg-gray-100' colSpan={35}>ACTVIDIDADES NO PLANIFICADAS</Table.Td>
                            </tr>
                            <tr>
                                <Table.Td className='text-center' colSpan={35}>No hay actividades no planificadas</Table.Td>
                            </tr>
                        </Table.Tbody>
                    </Table>
                    <div className='flex items-center gap-4 mt-4 p-2'>
                        <Button
                            label={'Agregar'}
                            icon={<IconPlus strokeWidth={'1.5'} size={'20'}/>}
                            className={'bg-gray-200 text-gray-500 border border-gray-300 hover:border-gray-500'}
                            onClick={addActivity}
                            noSubmit={1}
                        />
                        <Button
                            label={'Guardar'}
                            icon={<IconPencilPlus strokeWidth={'1.5'} size={'20'}/>}
                            className={'bg-teal-200 text-teal-500 border border-teal-300 hover:border-teal-500'}
                        />
                    </div>
                </form>
            </Table.Card>
        </>
    )
}

Create.layout = page => <AppLayout children={page}/>
