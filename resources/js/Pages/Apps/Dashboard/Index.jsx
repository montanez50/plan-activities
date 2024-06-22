import Card from '@/Components/Card';
import CardOverview from '@/Components/CardOverview';
import AppLayout from '@/Layouts/AppLayout'
import { Head, Link, usePage } from '@inertiajs/react'
import { IconArrowBadgeDown, IconArrowRight, IconBadges, IconBadgesOff, IconChartBar, IconUserBolt, IconUserCheck, IconUsers, IconWallpaper } from '@tabler/icons-react';
import Bars from '@/Components/Charts/BarChart';
import React from 'react'

export default function Index() {

    const { 
        auth,
        users,
        users_count,
        roles_count,
        permissions_count,
        prepared_plans,
        revised_plans,
        approved_plans,
        closed_plans,
        anuled_plans,
        activities
    } = usePage().props;

    const planActivites =  activities.map((data) => data.activities );
    const noPlanActivities =  activities.map((data) => data.noPlanActivities );

    return (
        <>
            <Head title='Inicio'/>
            <div className='font-bold text-sky-600 text-xl mb-5'>
                DESCRIPCIÓN GENERAL
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                <div className='col-span-12 lg:col-span-2'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <CardOverview
                            title={'Planificaciones Preparadas'}
                            subtitle={'Total de planificaciones en estado de preparado'}
                            color={'bg-green-100 text-green-700'}
                            icon={<IconWallpaper size={'20'} strokeWidth={'1.5'}/>}
                            className={'shadow-sky-300'}
                        >
                            {prepared_plans}
                        </CardOverview>
                        <CardOverview
                            title={'Planificaciones Revisadas'}
                            subtitle={'Total de planificaciones en estado de revisado'}
                            color={'bg-yellow-100 text-yellow-700'}
                            icon={<IconArrowBadgeDown size={'20'} strokeWidth={'1.5'}/>}
                            className={'shadow-sky-300'}
                        >
                            {revised_plans}
                        </CardOverview>
                        <CardOverview
                            title={'Planificaciones en ejecución'}
                            subtitle={'Total de planificaciones en estado de ejecutado'}
                            color={'bg-teal-100 text-teal-700'}
                            icon={<IconBadges size={'20'} strokeWidth={'1.5'}/>}
                            className={'shadow-sky-300'}
                        >
                            {approved_plans}
                        </CardOverview>
                        <CardOverview
                            title={'Planificaciones cerradas'}
                            subtitle={'Total de planificaciones en estado de cerrado'}
                            color={'bg-gray-100 text-gray-700'}
                            icon={<IconBadgesOff size={'20'} strokeWidth={'1.5'}/>}
                            className={'shadow-sky-300'}
                        >
                            {closed_plans}
                        </CardOverview>
                        <CardOverview
                            title={'Planificaciones anuladas'}
                            subtitle={'Total de planificaciones en estado de cerrado'}
                            color={'bg-red-100 text-red-700'}
                            icon={<IconBadgesOff size={'20'} strokeWidth={'1.5'}/>}
                            className={'shadow-sky-300'}
                        >
                            {anuled_plans}
                        </CardOverview>
                        <CardOverview
                            title={'Usuarios'}
                            subtitle={'Total de usuarios'}
                            color={'bg-sky-100 text-sky-700'}
                            icon={<IconUsers size={'20'} strokeWidth={'1.5'}/>}
                            className={'shadow-sky-300'}
                        >
                            {users_count}
                        </CardOverview>
                        <CardOverview
                            title={'Roles'}
                            subtitle={'Total de roles'}
                            color={'bg-indigo-100 text-indigo-700'}
                            icon={<IconUserCheck size={'20'} strokeWidth={'1.5'}/>}
                            className={'shadow-indigo-300'}
                        >
                            {roles_count}
                        </CardOverview>
                        <CardOverview
                            title={'Permisos'}
                            subtitle={'Total de permisos'}
                            color={'bg-teal-100 text-teal-700'}
                            icon={<IconUserBolt size={'20'} strokeWidth={'1.5'}/>}
                            className={'shadow-teal-300'}
                        >
                            {permissions_count}
                        </CardOverview>
                    </div>
                </div>
                <div className='col-span-12 lg:col-span-1'>
                    <div className='bg-white rounded-lg'>
                        <div className='border-b px-6 py-3'>
                            <div className='flex items-center gap-2'>
                                <IconUsers strokeWidth={'1.5'} size={'20'}/>
                                <h1 className='font-semibold text-sm uppercase'>Lista de Usuarios</h1>
                            </div>
                        </div>
                        <div className='px-6 py-4'>
                            <div className='flex flex-col flex-wrap divide-y divide-dashed gap-2'>
                                {users.map((user, i) => (
                                    <div className={`flex flex-row gap-4 items-center ${i === 0 ? 'pb-2' : 'py-2'}`} key={i}>
                                        <img src={user.avatar} className='w-12 h-12 rounded-full'/>
                                        <div className=''>
                                            <span className='font-semibold text-sm'>{user.name} {user.last_name}</span>
                                            <p className='text-xs text-gray-400'>{user.email}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='border-t px-6 py-3'>
                            <Link href='/apps/users' className='flex items-center gap-1 justify-center group font-semibold text-gray-600 hover:text-sky-500'>
                                Ver todos los usuarios <IconArrowRight size={'20'} strokeWidth={'1.5'} className='group-hover:text-sky-500 group-hover:translate-x-1 duration-300'/>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='col-span-12 lg:col-span-3'>
                    <Card
                        title={'ACTIVIDADES EN EL AÑO'}
                        icon={<IconChartBar size={'20'} strokeWidth={'1.5'}/>}
                    >
                        <Bars activities={planActivites} noPlanActivities={noPlanActivities} />
                    </Card>
                </div>
            </div>
        </>
    )
}

Index.layout = page => <AppLayout children={page}/>
