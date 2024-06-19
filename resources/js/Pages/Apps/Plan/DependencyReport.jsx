import Button from '@/Components/Button'
import Card from '@/Components/Card'
import SelectInput from '@/Components/Select'
import AppLayout from '@/Layouts/AppLayout'
import { Head, usePage } from '@inertiajs/react'
import { IconAugmentedReality, IconFile, IconSearch, IconUser } from '@tabler/icons-react'
import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast'

export default function DependencyReport() {

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
    // destruct data from userPage props
    const { dependencies, years } = usePage().props;

    const [dependency, setDependency] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [url, setUrl] = useState('');

    const handleSearch = () => {
        if (!(dependency && year && month)) {
            toast.error('Complete todos los campos');
            return;
        }
        setUrl(`/planification/dependecy-report/${dependency}/${year}/${month}`);
    }

    return (
        <>
            <Head title='Reporte Individual'/>
            <div className='mb-5'>
                <div className='flex flex-row items-center md:justify-between gap-5'>
                    <div className='lg:w-2/6 xl:w-1/6'>
                        <Button
                            label='Reportes Individuales'
                            type={'link'}
                            icon={<IconUser size={'20'} strokeWidth={'1.5'}/>}
                            className={'bg-white text-gray-700 border hover:border-sky-500'}
                            href={'/planification/individual-reports'}
                            added={true}
                        />
                    </div>
                </div>
            </div>
            <Card
                title={'Reporte de Planificación por dependencia'}
                icon={<IconAugmentedReality size={'20'} strokeWidth={'1.5'}/>}
            >
                <div className='grid grid-cols-3 gap-3'>
                    <div className='mb-4'>
                        <SelectInput
                            label={'Año'}
                            options={years}
                            value={years.filter(e => e.value === year)[0]}
                            onChange={e => setYear(e.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <SelectInput
                            label={'Mes'}
                            options={months}
                            value={months.filter(e => e.value === month)[0]}
                            onChange={e => setMonth(e.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <SelectInput
                            label={'Dependencia'}
                            options={dependencies}
                            value={dependencies.filter(e => e.value === dependency)[0]}
                            onChange={e => setDependency(e.value)}
                        />
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <Button
                        onClick={() => handleSearch()}
                        label={'Buscar'}
                        icon={<IconSearch strokeWidth={'1.5'} size={'20'}/>}
                        className={'bg-teal-200 text-teal-500 border border-teal-300 hover:border-teal-500'}
                    />
                </div>
            </Card>

            <div className='mt-5'>
                <Card
                    title={'Ver PDF'}
                    icon={<IconFile size={'20'} strokeWidth={'1.5'}/>}
                >
                    {url && (
                        <iframe src={url} width="100%" height="530" allowFullScreen></iframe>
                    )}
                </Card>
            </div>
        </>
    )
}

DependencyReport.layout = page => <AppLayout children={page}/>
