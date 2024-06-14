import Button from '@/Components/Button'
import Input from '@/Components/Input'
import AppLayout from '@/Layouts/AppLayout'
import { Head, usePage } from '@inertiajs/react';
import { IconUsers, IconPlus, IconArrowBack } from '@tabler/icons-react'
import React, { useState, useEffect } from 'react'
import Table from '@/Components/Table'

const MarkCell = ({ status, ...props }) => (
    <Table.TdNumber className={`px-2 ${status ? 'bg-green-600' : ''}`} {...props}></Table.TdNumber>
);

const Activity = ({ id, numbers, item }) => {
    return (
        <tr>
            <Table.Td scope="row">
                {id + 1}
            </Table.Td>
            <Table.Td>
                {item.name}
            </Table.Td>
            {numbers.map((data, i) =>  <MarkCell key={i} status={item.days ? item.days[data] : false} /> )}
        </tr>
    );
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
    const { planification, activities } = usePage().props;

    const month = planification.period.split('-')[1];
    const {monthDays, colorDays, numbers, year} = parseInfo(month, planification.period.split('-')[0]);
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    return (
        <>
            <Head title='Crear Planificación'/>
            <div className='mb-5'>
                <div className='flex flex-row items-center md:justify-between gap-5'>
                    <div className='w-full'>
                        <h3 className="font-semibold text-l text-gray-800 leading-tight mb-2">Mes de {months[month - 1]} del {year}</h3>
                    </div>
                </div>
            </div>
            <Table.Card title={'VER PLANIFICACIÓN'} icon={<IconUsers strokeWidth={'1.5'} size={'20'}/>}>
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
                        {activities.map((item, i) => (
                            <Activity
                                key={i}
                                id={i}
                                item={item}
                                numbers={numbers}
                            />
                        ))}
                    </Table.Tbody>
                </Table>
                <div className='flex items-center gap-4 mt-4 p-2'>
                    <Button
                        label={'Regresar'}
                        icon={<IconArrowBack strokeWidth={'1.5'} size={'20'}/>}
                        className={'bg-gray-200 text-gray-500 border border-gray-300 hover:border-gray-500'}
                        type={'link'}
                        href={'/planification/list'}
                    />
                </div>
            </Table.Card>
        </>
    )
}

Create.layout = page => <AppLayout children={page}/>
