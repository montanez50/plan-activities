import Button from '@/Components/Button'
import AppLayout from '@/Layouts/AppLayout'
import { Head, usePage, router } from '@inertiajs/react';
import { IconArrowBadgeUp, IconPencilPlus, IconPencilX } from '@tabler/icons-react'
import Table from '@/Components/Table'
import toast from 'react-hot-toast'

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

const NoPlanActivity = ({ id, numbers, item }) => {
    return (
        <tr>
            <Table.Td scope="row">
                {id + 1}
            </Table.Td>
            <Table.Td>
                {item.name}
            </Table.Td>
            {numbers.map((data, i) =>  <MarkCell key={i} status={item.days_execute ? item.days_execute[data] : false} /> )}
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

export default function Process() {
    // get data
    const { planification, activities, process, noPlanActivities } = usePage().props;

    const month = planification.month;
    const {monthDays, colorDays, numbers, year} = parseInfo(month, planification.year);
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const submit = (e) => {
        e.preventDefault();
        
        router.post(route('planification.update-status', planification), { status: process.status }, {
            onSuccess: () => {
                toast.success('Planificación procesada correctamente!',{
                    icon: '👏',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                })
            }
        });
    };

    const cancel = () => {
        router.post(route('planification.update-status', planification), { status: 'AN' }, {
            onSuccess: () => {
                toast.success('Planificación anulada correctamente!',{
                    icon: '👏',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                })
            }
        });
    }

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
            <Table.Card title={`${process.label} PLANIFICACIÓN`} icon={<IconArrowBadgeUp strokeWidth={'1.5'} size={'20'}/>}>
                <form onSubmit={submit}>
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th rowSpan={2} scope="col">#</Table.Th>
                                <Table.Th rowSpan={2} scope="col">Actividades</Table.Th>
                                {monthDays.map((data, i) => (
                                    <Table.ThNumber key={i} scope="col" className={` py-3 ${data === 'S' || data === 'D' ? 'bg-blue-500 dark:text-white' : 'bg-gray-100'}`}>
                                        {data}
                                    </Table.ThNumber>
                                ))}
                            </tr>
                            <tr>
                                {numbers.map((data, i) => (
                                    <Table.ThNumber key={i} scope="col" className={` py-3 ${colorDays.includes(data) ? 'bg-blue-500 dark:text-white' : 'bg-gray-100'}`}>
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
                            {noPlanActivities.length ? 
                                <tr>
                                    <Table.Td className='bg-gray-100' colSpan={35}>ACTIVIDADES NO PLANIFICADAS</Table.Td>
                                </tr>
                                :
                                ''
                            }
                            {noPlanActivities.length ? 
                                noPlanActivities.map((item, i) => (
                                    <NoPlanActivity
                                        key={item.id ?? item}
                                        id={i}
                                        item={item}
                                        numbers={numbers}
                                    />
                            ))
                            :
                                ''
                            }
                        </Table.Tbody>
                    </Table>
                    <div className='flex items-center gap-4 mt-4 p-2'>
                        <Button
                            label={process.label}
                            icon={<IconPencilPlus strokeWidth={'1.5'} size={'20'}/>}
                            className={'bg-teal-200 text-teal-500 border border-teal-300 hover:border-teal-500'}
                        />
                        {process.status !== 'CR' && (
                            <Button
                                label={'Anular'}
                                icon={<IconPencilX strokeWidth={'1.5'} size={'20'}/>}
                                className={'bg-rose-200 text-rose-500 border border-rose-300 hover:border-rose-500'}
                                onClick={cancel}
                                noSubmit={1}
                            />
                        )}
                    </div>
                </form>
            </Table.Card>
        </>
    )
}

Process.layout = page => <AppLayout children={page}/>
