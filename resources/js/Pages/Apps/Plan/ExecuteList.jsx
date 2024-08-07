import AppLayout from '@/Layouts/AppLayout'
import { Head, usePage } from '@inertiajs/react'
import moment from 'moment';
import { IconDatabaseOff, IconPencilCheck } from '@tabler/icons-react'
import Table from '@/Components/Table'
import Pagination from '@/Components/Pagination'
import React from 'react'
import Search from '@/Components/Search'
import ActionButton from '@/Components/ActionButton'

export default function ExecuteList() {
    moment.updateLocale('es', {
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'Ene._Feb._Mar._Abr._May._Jun._Jul._Ago._Sep._Oct._Nov._Dic.'.split('_'),
        weekdays: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
        weekdaysShort: 'Dom._Lun._Mar._Mié._Jue._Vie._Sáb.'.split('_'),
        weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sá'.split('_')
    });

    // destruct data from props
    const { planifications } = usePage().props;

    // Estatus
    const status = {
        "PR": {"color": "blue-500", "label": "Preparado"},
        "RV": {"color": "yellow-500", "label": "Revisado"},
        "AP": {"color": "green-500", "label": "Aprobado"},
        "CR": {"color": "gray-200", "label": "Cerrado"},
        "AN": {"color": "red-500", "label": "Anulado"},
    };

    return (
        <>
            <Head title='Planificaciones'/>
            <div className='mb-5'>
                <div className='flex flex-row items-center md:justify-between gap-5'>
                    <div className='w-full'>
                        <Search
                            url={'/planification'}
                            placeholder={'Buscar planificación...'}
                        />
                    </div>
                </div>
            </div>
            <Table.Card title={'LISTADO DE PLANIFICACIONES POR EJECUTAR'} icon={<IconPencilCheck strokeWidth={'1.5'} size={'20'}/>}>
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
                                        <div className={`h-2.5 w-2.5 rounded-full bg-${status[planification.status].color} me-2`}></div>{status[planification.status].label}
                                    </div>
                                </Table.Td>
                                <Table.Td>{planification.user.name} {planification.user.last_name}</Table.Td>
                                <Table.Td>{moment(planification.created_at).format('MMMM Do YYYY')}</Table.Td>
                                <Table.Td>
                                    <div className='flex items-center gap-2'>
                                        <ActionButton
                                            type={'process'}
                                            url={route('planification.executeForm', [planification])}
                                        />
                                    </div>
                                </Table.Td>
                            </tr>
                        )) :
                            <Table.Empty colSpan={7} message={
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

ExecuteList.layout = page => <AppLayout children={page}/>
