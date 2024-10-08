import React, { useState } from 'react'
import LinkItem from './LinkItem'
import hasAnyPermission from '@/Utils/Permissions'
import { Menu, Transition  } from '@headlessui/react'
import { Link } from '@inertiajs/react'
import {
    IconLogout, 
    IconX, 
    IconLayout2, 
    IconUserCheck,
    IconUserCog,
    IconUsers, 
    IconPaperclip, 
    IconWallpaper, 
    IconPencilCheck ,
    IconArrowBadgeDown,
    IconBadges,
    IconBadgesOff,
    IconAlarm,
    IconAugmentedReality,
    IconChartDonut,
    IconReport
} from '@tabler/icons-react'
import { useForm } from '@inertiajs/react'
export default function Dropdown({ auth, isMobile }) {

    // define useform helper inertia
    const { post } = useForm();

    // define state isToggle
    const [isToggle, setIsToggle] = useState(false);

    // define array links
    const links = [
        {
            title : 'INICIO',
            permissions: hasAnyPermission(['dashboard-access']),
            details : [
                {title: 'Inicio', href: '/apps/dashboard', icon: <IconLayout2 strokeWidth={'1.5'} size={'20'}/>, permissions: hasAnyPermission(['dashboard-access'])},
            ]
        },
        {
            title: 'GESTIÓN DE PLANIFICACIÓN',
            permissions: hasAnyPermission(['planifications-access']),
            details: [
                {title: 'Crear Planificación', href: '/planification/create', icon: <IconPaperclip strokeWidth={'1.5'} size={'20'}/>, permissions: hasAnyPermission(['planifications-create'])},
                {title: 'Planificaciones', href: '/planification/list', icon: <IconWallpaper strokeWidth={'1.5'} size={'20'}/>, permissions: hasAnyPermission(['planifications-access'])},
                {title: 'Ejecutar', href: '/planification/process/execute', icon: <IconPencilCheck strokeWidth={'1.5'} size={'20'}/>, permissions: hasAnyPermission(['planifications-execute-access'])},
            ]
        },
        {
            title: 'CONTROL DE PROCESOS',
            permissions: hasAnyPermission(['control-access']),
            details: [
                {title: 'Revisar Planificación', href: '/planification/process-list/PR', icon: <IconArrowBadgeDown strokeWidth={'1.5'} size={'20'}/>, permissions: hasAnyPermission(['control-review-access'])},
                {title: 'Aprobar Planificación', href: '/planification/process-list/RV', icon: <IconBadges strokeWidth={'1.5'} size={'20'}/>, permissions: hasAnyPermission(['control-approve-access'])},
                {title: 'Cerrar Planificación', href: '/planification/process-list/AP', icon: <IconBadgesOff strokeWidth={'1.5'} size={'20'}/>, permissions: hasAnyPermission(['control-close-access'])},
                {title: 'Alertas', href: '/apps/dependency/1/alert', icon: <IconAlarm strokeWidth={'1.5'} size={'20'}/>, permissions: hasAnyPermission(['control-alert'])},
            ]
        },
        {
            title: 'ESTADÍSTICAS',
            permissions: hasAnyPermission(['statistics-access']),
            details: [
                {title: 'Reportes', href: '/planification/individual-reports', icon: <IconReport strokeWidth={'1.5'} size={'20'}/>, permissions: hasAnyPermission(['statistics-individual-report'])},
                {title: 'Indicadores', href: '/planification/individual-indicators', icon: <IconChartDonut strokeWidth={'1.5'} size={'20'}/>, permissions: hasAnyPermission(['statistics-individual-indicator'])},
            ]
        },
        {
            title: 'GESTIÓN DE USUARIOS',
            permissions: hasAnyPermission(['users-access']) || hasAnyPermission(['roles-access']) || hasAnyPermission(['permissions-access']),
            details: [
                {title: 'Usuarios', href: '/apps/users', icon: <IconUsers strokeWidth={'1.5'} size={'20'}/>, permissions: hasAnyPermission(['users-access'])},
                // {title: 'Roles', href: '/apps/roles', icon: <IconUserCheck strokeWidth={'1.5'} size={'20'}/>, permissions: hasAnyPermission(['roles-access'])},
                // {title: 'Permisos', href: '/apps/permissions', icon: <IconUserBolt strokeWidth={'1.5'} size={'20'}/>, permissions: hasAnyPermission(['permissions-access'])},
                {title: 'Dependencias', href: '/apps/dependencies', icon: <IconAugmentedReality strokeWidth={'1.5'} size={'20'}/>, permissions: hasAnyPermission(['permissions-access'])},
            ]
        },
        {
            title: 'SOPORTE',
            permissions: hasAnyPermission(['support-access']) || hasAnyPermission(['roles-access']) || hasAnyPermission(['permissions-access']),
            details: [
                {title: 'Respaldo', href: '/apps/users', icon: <IconUsers strokeWidth={'1.5'} size={'20'}/>, permissions: hasAnyPermission(['users-access'])},
                {title: 'Logs', href: '/apps/roles', icon: <IconUserCheck strokeWidth={'1.5'} size={'20'}/>, permissions: hasAnyPermission(['roles-access'])},
            ]
        },
        {
            title: 'OTHER',
            permissions: true,
            details: [
                {title: 'Profile', href: '/apps/profile', icon: <IconUserCog strokeWidth={'1.5'} size={'20'}/>, permissions: true},
            ]
        },
    ]

     // define method logout
    const logout = async (e) => {
        e.preventDefault();

        post(route('logout'));
    }

    return (
        <>
            {isMobile === false ?
                <Menu className='relative z-50' as="div">
                    <Menu.Button className='flex items-center rounded-full'>
                        <img src={auth.user.avatar} alt={auth.user.name} className='w-10 h-10 rounded-full border border-sky-500'/>
                    </Menu.Button>
                    <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <Menu.Items className='absolute bg-white rounded-lg w-48 border border-gray-100 mt-2 py-2 right-0 z-50'>
                            <div className='flex flex-col gap-1.5 divide-y'>
                                <Menu.Item>
                                    <Link href="/apps/profile" className='px-3 py-1.5 text-sm text-gray-700 flex items-center gap-2 hover:text-sky-500'>
                                        <IconUserCog strokeWidth={'1.5'} size={'20'}/> Perfil
                                    </Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <button onClick={logout} className='px-3 py-1.5 text-sm text-gray-700 flex items-center gap-2 hover:text-sky-500'>
                                        <IconLogout strokeWidth={'1.5'} size={'20'}/>
                                        Cerrar Sesión
                                    </button>
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
                :
                <>
                    <button className="flex items-center group" onClick={() => setIsToggle(!isToggle)}>
                        <img src={auth.user.avatar} alt={auth.user.name} className='w-8 h-8 rounded-full border border-sky-500 group-hover:shadow group-hover:shadow-sky-700'/>
                    </button>
                    <div className={`${isToggle ?'translate-x-0 opacity-100' : '-translate-x-full'} fixed top-0 left-0 z-50 w-[300px] h-full transition-all duration-300 transform bg-white border-r`}>
                        <div className='py-2 px-4 h-16 border-b flex items-center justify-between'>
                            <div className="flex items-center gap-2">
                                <img src={auth.user.avatar} alt={auth.user.name} className='w-10 h-10 rounded-full border border-sky-500'/>
                                <div>
                                    <div className='text-sm font-semibold'>
                                        {auth.user.name}
                                    </div>
                                    <div className='text-xs text-gray-500'>{auth.user.email}</div>
                                </div>
                            </div>
                            <div>
                                <button className='flex p-2 items-center cursor-pointer hover:rounded-full hover:bg-rose-50 hover:text-rose-300' onClick={() => setIsToggle(!isToggle)}>
                                    <IconX size={'20'} strokeWidth={'1.5'}/>
                                </button>
                            </div>
                        </div>
                        <div className='py-1 w-full flex flex-col overflow-y-auto'>
                            {links.map((link, i) => (
                                <div className='py-2' key={i}>
                                    {auth.super === true ?
                                        <div className='uppercase text-sm font-bold px-2 mb-3 text-gray-700'>
                                            {link.title}
                                        </div>
                                        :
                                        link.permissions === true &&
                                        <div className='uppercase text-sm font-bold px-2 mb-3 text-gray-700'>
                                            {link.title}
                                        </div>
                                    }
                                    {link.details.map((detail, x) =>  (
                                        <LinkItem isSidebarOpen={true} link={detail} key={x} onClick={() => setIsToggle(!isToggle)}/>
                                    ))}
                                </div>
                            ))}
                            <button
                                onClick={logout}
                                className='flex items-center font-medium gap-x-3.5 py-2 px-2.5 text-gray-500 hover:border-l-2 hover:border-l-sky-200 hover:text-sky-500 capitalize hover:cursor-pointer text-sm'>
                                <IconLogout size={'20'} strokeWidth={'1.5'}/> Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </>
            }
        </>
    )
}
