import Button from '@/Components/Button'
import Input from '@/Components/Input'
import SelectInput from '@/Components/Select'
import AppLayout from '@/Layouts/AppLayout'
import { Head, router, usePage } from '@inertiajs/react';
import { IconPencilPlus, IconPaperclip, IconPlus, IconTrash } from '@tabler/icons-react'
import toast from 'react-hot-toast'
import React, { useState, useEffect } from 'react'
import Table from '@/Components/Table'

const MarkCell = ({ id, item, changeActivity , ...props }) => {
    const [active, setActive] = useState(false);
    const handleChange = () => {
        setActive(active ? false : true);
    }

    useEffect(() => {
        changeActivity(id, item, active);
    }, [id, item, active, changeActivity]);

    return (
        <Table.TdNumber className={`px-2 ${active ? 'bg-green-600' : ''}`} onClick={() => handleChange()} {...props}></Table.TdNumber>
    );
}

const ActivityInput = ({ id, changeActivity }) => {
    const [text, setText] = useState('');
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
        <tr>
            <Table.Td scope="row">
                {id + 1}
            </Table.Td>
            <Table.Td>
                <ActivityInput id={id} changeActivity={changeActivity} />
            </Table.Td>
            {numbers.map((data, i) =>  <MarkCell key={i} id={id} item={data} changeActivity={changeActivity} /> )}
            <Table.TdNumber>
                <Button
                    icon={<IconTrash strokeWidth={'1.5'} size={'20'}/>}
                    className={'bg-rose-200 text-rose-500 border border-rose-300 hover:border-rose-500 m-auto'}
                    noSubmit={1}
                    onClick={() => handleRemove(id)}
                />
            </Table.TdNumber>
        </tr>
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
                value={months.filter(data => data.value === month)[0]}
                onChange={handleChange}
            />
        </div>
    )
}

const parseInfo = (month) => {
    const monthDays = [];
    const colorDays = [];
    const days = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    const date = new Date();
    const daysInMonth = new Date(date.getFullYear(), month, 0).getDate();
    const numbers = Array(daysInMonth).fill().map((_, i) => i + 1);
    
    date.setDate(1);
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
        year: date.getFullYear(),
    }
}

export default function Create() {
    const { errors } = usePage().props;
    const [data, setData] = useState([]);
    const [month, setMonth] = useState(1);
    const [activity, setActivity] = useState([]);
    const {monthDays, colorDays, numbers, year} = parseInfo(month);
    
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
        const num = activity[activity.length - 1] ?? -1;
        setActivity([...activity, num + 1]);
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
            router.post(route('planification.store'), { year: year, month: month, activities: data}, {
                onSuccess: () => {
                    toast.success('Planificación creada correctamente!',{
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
            <Head title='Crear Planificación'/>
            <div className='mb-5'>
                <div className='flex flex-row items-center md:justify-between gap-5'>
                    <div className='w-full'>
                        <MonthSelector month={month} handleChange={handleChangeSelector} />
                    </div>
                </div>
            </div>
            <Table.Card title={'CREAR PLANIFICACIÓN'} icon={<IconPaperclip strokeWidth={'1.5'} size={'20'}/>}>
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
                                <Table.ThNumber rowSpan={2} scope="col" className="py-3 bg-gray-100">
                                    <svg className="h-5 w-5 text-red-500 m-auto"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                    </svg>
                                </Table.ThNumber>
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
                                    key={item}
                                    id={i}
                                    item={item}
                                    numbers={numbers}
                                    handleRemove={handleRemove}
                                    changeActivity={handleChangeActivity}
                                />
                            ))}
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
