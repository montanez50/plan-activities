import Button from '@/Components/Button'
import Card from '@/Components/Card'
import Input from '@/Components/Input'
import SelectInput from '@/Components/Select'
import AppLayout from '@/Layouts/AppLayout'
import { Head, useForm, usePage } from '@inertiajs/react'
import { IconPencilPlus, IconPencilX, IconAugmentedReality, IconPointFilled } from '@tabler/icons-react'
import toast from 'react-hot-toast'
import React from 'react'

export default function Create() {

    // destruct data from userPage props
    const { config, dependency } = usePage().props;

    // destruct data, setData, post and errors from useForm
    const { data, setData, post, errors } = useForm({
        reports_notification: config ? config.reports_notification : '0',
        create_notification:  config ? config.create_notification : 0,
        update_notification:  config ? config.update_notification : 0,
        parent_notification:  config ? config.parent_notification : 0,
        non_compliance_alert: config ? config.non_compliance_alert : 0,
        close_plan_day: config ? config.close_plan_day : -1,
    });

    // define method handle form
    const handleForm = async (e) => {
        e.preventDefault();

        post(route('apps.alert.post', dependency), {
            onSuccess: () => {
                toast.success('Configuración guardada correctamente!',{
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

    const reportOptions = [
        { label: 'Nunca', value: '0' },
        { label: 'Semanales', value: '1' },
        { label: 'Quincenales', value: '2' },
        { label: 'Mensuales', value: '3' },
    ];

    const nonCompleteOptions = [
        { label: 'No reportar', value: 0 },
        { label: '25%', value: 25 },
        { label: '50%', value: 50 },
        { label: '75%', value: 75 },
    ]

    const closeOptions = [
        { label: 'No cerrar', value: -1 },
        { label: 'Al terminar', value: 0 },
        { label: 'Despues de 1 día', value: 1 },
        { label: 'Despues de 2 días', value: 2 },
        { label: 'Despues de 3 días', value: 3 },
    ]


    return (
        <>
            <Head title='Configurar Alertas'/>
            <Card
                title={`Configurar Alertas (${dependency.name})`}
                icon={<IconAugmentedReality size={'20'} strokeWidth={'1.5'}/>}
            >
                <form onSubmit={handleForm}>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <div className='mb-4'>
                                <SelectInput
                                    label={'Recibir reportes de generales:'}
                                    options={reportOptions}
                                    value={reportOptions.filter(e => e.value === data.reports_notification)[0]}
                                    onChange={e => setData('reports_notification', e.value)}
                                    errors={errors.reports_notification}
                                />
                            </div>
                            <div className='mb-4'>
                                <SelectInput
                                    label={'Notificar cuando un empleado incumpla una actividad al menos del:'}
                                    options={nonCompleteOptions}
                                    value={nonCompleteOptions.filter(e => e.value === data.non_compliance_alert)[0]}
                                    onChange={e => setData('non_compliance_alert', e.value)}
                                    errors={errors.reports_notification}
                                />
                            </div>
                            <div className='mb-4'>
                                <SelectInput
                                    label={'Cerrar planificaciones automaticamente:'}
                                    options={closeOptions}
                                    value={closeOptions.filter(e => e.value === data.close_plan_day)[0]}
                                    onChange={e => setData('close_plan_day', e.value)}
                                    errors={errors.reports_notification}
                                />
                            </div>
                        </div>
                        <div className='mb-4'>
                            <label className='text-gray-600 text-sm'>Opciones de notificación</label>
                            <div className='grid grid-cols-1 gap-x-3 gap-y-1.5 overflow-y-auto'>
                                <div className='border-b px-4 pb-2 pt-1 border-dashed'>
                                    <div className='flex items-center gap-2 mb-1.5'>
                                        <input
                                            type='checkbox'
                                            className='rounded-full'
                                            value={1}
                                            defaultChecked={data.create_notification}
                                            onChange={(e) => setData('create_notification', e.target.checked)}
                                            id={`check-1`}
                                        />
                                        <div className='font-semibold'>Notificar cuando una planificación es creada</div>
                                    </div>
                                </div>
                                <div className='border-b px-4 pb-2 pt-1 border-dashed'>
                                    <div className='flex items-center gap-2 mb-1.5'>
                                        <input
                                            type='checkbox'
                                            className='rounded-full'
                                            value={1}
                                            defaultChecked={data.update_notification}
                                            onChange={(e) => setData('update_notification', e.target.checked)}
                                            id={`check-1`}
                                        />
                                        <div className='font-semibold'>Notificar cuando una planificación es ejecutada</div>
                                    </div>
                                </div>
                                <div className='border-b px-4 pb-2 pt-1 border-dashed'>
                                    <div className='flex items-center gap-2 mb-1.5'>
                                        <input
                                            type='checkbox'
                                            className='rounded-full'
                                            value={1}
                                            defaultChecked={data.parent_notification}
                                            onChange={(e) => setData('parent_notification', e.target.checked)}
                                            id={`check-1`}
                                        />
                                        <div className='font-semibold'>Notificar a la dependencia padre</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-4'>
                        <Button
                            label={'Guardar'}
                            icon={<IconPencilPlus strokeWidth={'1.5'} size={'20'}/>}
                            className={'bg-teal-200 text-teal-500 border border-teal-300 hover:border-teal-500'}
                        />
                        <Button
                            label={'Cancelar'}
                            icon={<IconPencilX strokeWidth={'1.5'} size={'20'}/>}
                            className={'bg-rose-200 text-rose-500 border border-rose-300 hover:border-rose-500'}
                            type={'link'}
                            href={'/apps/dependencies'}
                        />
                    </div>
                </form>
            </Card>
        </>
    )
}

Create.layout = page => <AppLayout children={page}/>
