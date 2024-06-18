import AppLayout from '@/Layouts/AppLayout'
import { Head, usePage } from '@inertiajs/react'
import { IconCheck, IconDatabaseOff, IconPlus, IconAugmentedReality } from '@tabler/icons-react'
import Table from '@/Components/Table'
import Pagination from '@/Components/Pagination'
import React from 'react'
import Search from '@/Components/Search'
import Button from '@/Components/Button'
import ActionButton from '@/Components/ActionButton'

export default function Index() {

    // destruct users from props
    const { dependencies } = usePage().props;

    return (
        <>
            <Head title='Dependencias'/>
            <div className='mb-5'>
                <div className='flex flex-row items-center md:justify-between gap-5'>
                    <div className='lg:w-2/6 xl:w-1/6'>
                        <Button
                            label='Agregar Nueva Dependencia'
                            type={'link'}
                            icon={<IconPlus size={'20'} strokeWidth={'1.5'}/>}
                            className={'bg-white text-gray-700 border hover:border-sky-500'}
                            href={'/apps/dependencies/create'}
                            added={true}
                        />
                    </div>
                    <div className='w-full'>
                        <Search
                            url={'/apps/users'}
                            placeholder={'Buscar dependencias por su nombre...'}
                        />
                    </div>
                </div>
            </div>
            <Table.Card title={'LISTADO DE DEPENDENCIAS'} icon={<IconAugmentedReality strokeWidth={'1.5'} size={'20'}/>}>
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className={'w-10'}>#</Table.Th>
                            <Table.Th>Nombre</Table.Th>
                            <Table.Th>Codigo Interno</Table.Th>
                            <Table.Th>Responsable</Table.Th>
                            <Table.Th>Acción</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {dependencies.data.length ?
                            dependencies.data.map((dependency, i) => (
                            <tr key={i}>
                                <Table.Td>{++i + (dependencies.current_page-1) * dependencies.per_page}</Table.Td>
                                <Table.Td>{dependency.name}</Table.Td>
                                <Table.Td>123456</Table.Td>
                                <Table.Td>{dependency.user && `${dependency.user.name} ${dependency.user.last_name}`}</Table.Td>
                                <Table.Td>
                                    <div className='flex items-center gap-2'>
                                        <ActionButton
                                            url={`/apps/dependencies/${dependency.id}/edit`}
                                        />
                                        <ActionButton
                                            type={'delete'}
                                            url={`/apps/users`}
                                            id={dependency.id}
                                        />
                                        <ActionButton
                                            type={'config'}
                                            url={route('apps.alert.form', dependency)}
                                            id={dependency.id}
                                        />
                                    </div>
                                </Table.Td>
                            </tr>
                        )) :
                            <Table.Empty colSpan={5} message={
                                <>
                                    <div className='flex justify-center items-center text-center mb-2'>
                                        <IconDatabaseOff className='w-10 h-10 text-gray-400' strokeWidth={'1.2'}/>
                                    </div>
                                    <span className='text-gray-500'>datos de dependencias</span> <span className='text-rose-500 underline underline-offset-2'>no encontrados.</span>
                                </>
                            }/>
                        }
                    </Table.Tbody>
                </Table>
            </Table.Card>
            {dependencies.last_page !== 1 && (<Pagination links={dependencies.links}/>)}
        </>
    )
}

Index.layout = page => <AppLayout children={page}/>
