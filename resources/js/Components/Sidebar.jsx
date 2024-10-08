import LinkItem from './LinkItem'
import hasAnyPermission from '@/Utils/Permissions'
import { 
    IconComponents, 
    IconLayout2, 
    IconUserCheck, 
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
import { usePage } from '@inertiajs/react'
import React from 'react'
export default function Sidebar({ isSidebarOpen }) {

    // destruct auth from props
    const { auth } = usePage().props;
    const myDep = !auth.super ? (auth.respDep ? auth.respDep.id : 0) : 8;

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
                {title: 'Alertas', href: `/apps/dependency/${myDep}/alert`, icon: <IconAlarm strokeWidth={'1.5'} size={'20'}/>, permissions: hasAnyPermission(['control-alert'])},
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
                {title: 'Respaldo', href: '/backups', icon: <IconUsers strokeWidth={'1.5'} size={'20'}/>, permissions: hasAnyPermission(['users-access'])},
                {title: 'Logs', href: '/log-viewer', icon: <IconUserCheck strokeWidth={'1.5'} size={'20'}/>, permissions: hasAnyPermission(['roles-access']), blank: true},
            ]
        },
    ]

    return (
        <div className={`${isSidebarOpen ? 'w-[260px]' : 'w-[100px]'} bg-white min-h-screen overflow-y-auto hidden md:block relative z-10 border-r transition-all duration-300`}>
            {isSidebarOpen ?
                <>
                    <div className='flex justify-center items-center px-6 py-2 h-18'>
                        <div className='text-2xl font-bold text-gray-700 text-center leading-loose tracking-wider'>
                            PESAM CEM
                        </div>
                    </div>
                    <div className='w-full p-3 flex items-center gap-4 border-b bg-sky-50 border-sky-100 border-t'>
                        <img src={auth.user.avatar} className='w-12 h-12 rounded-full border border-sky-500'/>
                        <div className='flex flex-col gap-0.5'>
                            <div className='text-gray-700 text-sm'>{auth.user.name} {auth.user.last_name}</div>
                            <div className='text-gray-400 text-xs'>{auth.user.email}</div>
                        </div>
                    </div>
                    <div className='py-1 w-full flex flex-col overflow-y-auto'>
                        {links.map((link, i) => (
                            <div className='' key={i}>
                                {auth.super === true ?
                                    <div className='uppercase text-xs font-semibold py-2 text-gray-700 px-2'>
                                        {link.title}
                                    </div>
                                    :
                                    link.permissions === true &&
                                    <div className='uppercase text-xs font-semibold py-2 text-gray-700 px-2'>
                                        {link.title}
                                    </div>
                                }
                                {link.details.map((detail, x) =>  <LinkItem isSidebarOpen={isSidebarOpen} link={detail} key={x}/>)}
                            </div>
                        ))}
                    </div>
                </>
                :
                <>
                   <div className='flex justify-center items-center px-6 py-2 h-16'>
                        <IconComponents size={'20'} strokeWidth={'1.2'} className='text-gray-700'/>
                    </div>
                    <div className='w-full px-6 py-3 flex justify-center items-center gap-4 border-b bg-sky-50 border-sky-100 border-t'>
                        <img src={auth.user.avatar} className='w-8 h-8 rounded-full border border-sky-500'/>
                    </div>
                    <div className='w-full flex flex-col overflow-y-auto items-center justify-center'>
                        {links.map((link, i) => (
                            <div className='flex flex-col min-w-full items-center' key={i}>
                                {link.details.map((detail, x) => <LinkItem isSidebarOpen={isSidebarOpen} link={detail} key={x}/>)}
                            </div>
                        ))}
                    </div>
                </>
            }
        </div>
    )
}
