import AppLayout from '@/Layouts/AppLayout'
import { Head, usePage } from '@inertiajs/react'
import moment from 'moment';
import { IconDatabaseOff, IconPlus, IconUsers } from '@tabler/icons-react'
import Table from '@/Components/Table'
import Pagination from '@/Components/Pagination'
import React from 'react'
import Search from '@/Components/Search'
import Button from '@/Components/Button'
import ActionButton from '@/Components/ActionButton'

export default function Index() {

    // destruct data from props
    const { planifications, process } = usePage().props;

    // Estatus
    const status = {
        "PR": {"color": "blue", "label": "Preparado"},
        "RV": {"color": "yellow", "label": "Revisado"},
        "AP": {"color": "green", "label": "Aprobado"},
        "CR": {"color": "gray", "label": "Cerrado"},
        "AN": {"color": "red", "label": "Anulado"},
    };

    return (
        <>
            <Head title='Planificaciones'/>
            <div className='mb-5'>
                <div className='flex flex-row items-center md:justify-between gap-5'>
                    <div className='lg:w-2/6 xl:w-1/6'>
                        <Button
                            label='Agregar Nueva Planificación'
                            type={'link'}
                            icon={<IconPlus size={'20'} strokeWidth={'1.5'}/>}
                            className={'bg-white text-gray-700 border hover:border-sky-500'}
                            href={'/planification/create'}
                            added={true}
                        />
                    </div>
                    <div className='w-full'>
                        <Search
                            url={'/planification'}
                            placeholder={'Buscar planificación...'}
                        />
                    </div>
                </div>
            </div>
            <Table.Card title={'LISTADO DE PLANIFICACIONES'} icon={<IconUsers strokeWidth={'1.5'} size={'20'}/>}>
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className={'w-10'}>#</Table.Th>
                            <Table.Th>Periodo</Table.Th>
                            <Table.Th>Actividades</Table.Th>
                            <Table.Th>Estado</Table.Th>
                            <Table.Th>Usuario</Table.Th>
                            <Table.Th>Creación</Table.Th>
                            <Table.Th>Acción</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {planifications.data.length ?
                            planifications.data.map((planification, i) => (
                            <tr key={i}>
                                <Table.Td>{++i + (planifications.current_page-1) * planifications.per_page}</Table.Td>
                                <Table.Td>{planification.period}</Table.Td>
                                <Table.Td>{planification.details.length}</Table.Td>
                                <Table.Td>
                                    <div className="flex items-center">
                                        <div className={`h-2.5 w-2.5 rounded-full bg-${status[planification.status].color}-500 me-2`}></div>{status[planification.status].label}
                                    </div>
                                </Table.Td>
                                <Table.Td>{planification.user.name}</Table.Td>
                                <Table.Td>{moment(planification.created_at).format('MMMM Do YYYY')}</Table.Td>
                                <Table.Td>
                                    <div className='flex items-center gap-2'>
                                        <ActionButton
                                            type={'view'}
                                            url={`/planification/${planification.id}`}
                                        />
                                        <ActionButton
                                            url={`/planification/${planification.id}/edit`}
                                        />
                                        <ActionButton
                                            type={'delete'}
                                            url={`/planification`}
                                            id={planification.id}
                                        />
                                    </div>
                                </Table.Td>
                            </tr>
                        )) :
                            <Table.Empty colSpan={8} message={
                                <>
                                    <div className='flex justify-center items-center text-center mb-2'>
                                        <IconDatabaseOff className='w-10 h-10 text-gray-400' strokeWidth={'1.2'}/>
                                    </div>
                                    <span className='text-gray-500'>datos de usuarios</span> <span className='text-rose-500 underline underline-offset-2'>no encontrados.</span>
                                </>
                            }/>
                        }
                    </Table.Tbody>
                </Table>
            </Table.Card>
            {planifications.last_page !== 1 && (<Pagination links={planifications.links}/>)}
        </>
    )
}

Index.layout = page => <AppLayout children={page}/>
