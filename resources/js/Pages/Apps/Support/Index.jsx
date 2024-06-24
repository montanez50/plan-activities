import Button from '@/Components/Button'
import Card from '@/Components/Card'
import SelectInput from '@/Components/Select'
import AppLayout from '@/Layouts/AppLayout'
import Swal from 'sweetalert2'
import { Head, router, usePage } from '@inertiajs/react'
import { IconCheck, IconDatabase, IconDatabaseExport, IconDatabaseImport, IconDatabaseOff, IconFileDatabase, IconMail, IconX } from '@tabler/icons-react'
import toast from 'react-hot-toast'
import React, { useState } from 'react'

export default function Create() {

    const { info, files } = usePage().props;
    const [backup, setBackup] = useState(null);

    const createCopy = () => {
        router.get(route('backups.generate'));
        toast.success('Respaldo creado correctamente!',{
            icon: '👏',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        })
    }

    const monitor = () => {
        router.get(route('backups.monitor'));
        toast.success('Reporte enviado correctamente!',{
            icon: '👏',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        })
    }

    const restore = () => {
        if (backup !== null) {
            router.post(route('backups.restore'), { backup: backup}, {
                onSuccess: () => {
                    toast.success('Restaurado!',{
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
            toast.error('Seleccione una copia de seguridad');
        }
    };

    return (
        <>
            <Head title='Respaldo'/>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8'>
                <Card
                    title={'GENERAR COPIA DE SEGURIDAD'}
                    icon={<IconDatabaseExport size={'20'} strokeWidth={'1.5'}/>}
                >
                    {info.map((data, i) => (
                        <div key={i}>
                            <div className='text-2xl font-bold text-gray-700 text-center leading-loose tracking-wider mb-1'>
                                {data.name}
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 mb-1'>
                                <div className="flex justify-between my-0">
                                    <div>Almacenamiento:</div>
                                    <div>{data.disk}</div>
                                </div>
                                <div className="flex justify-between my-0">
                                    <div>Saludable:</div>
                                    <div>{data.healthy ? <IconCheck className='text-green-500' strokeWidth={'1.5'} size={'20'}/> : <IconX className='text-red-500' strokeWidth={'1.5'} size={'20'}/>}</div>
                                </div>
                                <div className="flex justify-between my-0">
                                    <div>Ultimo respaldo:</div>
                                    <div>{data.newest_backup}</div>
                                </div>
                                <div className="flex justify-between my-0">
                                    <div>Accesible:</div>
                                    <div>{data.reachable ? <IconCheck className='text-green-500' strokeWidth={'1.5'} size={'20'}/> : <IconX className='text-red-500' strokeWidth={'1.5'} size={'20'}/>}</div>
                                </div>
                                <div className="flex justify-between my-0">
                                    <div>Cantidad de respaldos:</div>
                                    <div>{data.num_backups}</div>
                                </div>
                                <div className="flex justify-between my-0">
                                    <div>Espacio utilizado:</div>
                                    <div>{data.used_storage}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='flex items-center gap-4 mt-3'>
                        <Button
                            onClick={() => createCopy()}
                            label={'Crear Copia'}
                            icon={<IconFileDatabase strokeWidth={'1.5'} size={'20'}/>}
                            className={'bg-blue-200 text-blue-500 border border-blue-300 hover:border-blue-500'}
                        />
                        <Button
                            onClick={() => monitor()}
                            label={'Enviar Reporte'}
                            icon={<IconMail strokeWidth={'1.5'} size={'20'}/>}
                            className={'bg-gray-200 text-gray-500 border border-gray-300 hover:border-gray-500'}
                        />
                    </div>
                </Card>
                <Card
                    title={'RESTAURAR COPIA DE SEGURIDAD'}
                    icon={<IconDatabaseImport size={'20'} strokeWidth={'1.5'}/>}
                >
                    <div className='mb-4'>
                        <SelectInput
                            label={'Seleccione la copia de seguridad'}
                            options={files}
                            value={files.filter(e => e.value === backup)[0]}
                            onChange={e => setBackup(e.value)}
                        />
                    </div>
                    <div className='flex items-center gap-4'>
                        <Button
                            onClick={() => restore()}
                            label={'Restaurar'}
                            icon={<IconDatabase strokeWidth={'1.5'} size={'20'}/>}
                            className={'bg-blue-200 text-blue-500 border border-blue-300 hover:border-blue-500'}
                        />
                    </div>
                </Card>
            </div>
        </>
    )
}

Create.layout = page => <AppLayout children={page}/>
