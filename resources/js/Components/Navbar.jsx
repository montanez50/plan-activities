import { usePage, } from '@inertiajs/react'
import { IconAlignLeft, IconBell, IconChevronRight } from '@tabler/icons-react'
import React, { useState, useEffect } from 'react'
import Dropdown from './Dropdown'

export default function Navbar({ toggleSidebar }) {

    // destruct auth from props
    const { auth } = usePage().props;

    // destruct url from usePage
    const { url } = usePage();

    // define state isMobile
    const [isMobile, setIsMobile] = useState(false);

    // define useEffect
    useEffect(() => {
        // define handle resize window
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 768);
        };

        // define event listener
        window.addEventListener('resize', handleResize);

        // call handle resize window
        handleResize();

        // remove event listener
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    // define array links
    const links = [
        {
            title : 'Inicio',
            active: url.startsWith('/apps/dashboard') ? true : false,
            details : [
                { title: 'Dashboard', href: '/apps/dashboard', active: url.startsWith('/apps/dashboard') ? true : false },
            ]
        },
        {
            title: 'Gestión de Usuarios',
            active: url.startsWith('/apps/users') ? true : false || url.startsWith('/apps/roles') ? true : false || url.startsWith('/apps/permissions') ? true : false || url.startsWith('/apps/dependencies') ? true : false,
            details: [
                { title: 'Usuarios', href: '/apps/users', active: url.startsWith('/apps/users') ? true : false },
                { title: 'Roles', href: '/apps/roles', active: url.startsWith('/apps/roles') ? true : false },
                { title: 'Permisos', href: '/apps/permissions', active: url.startsWith('/apps/permissions') ? true : false },
                { title: 'Dependencias', href: '/apps/dependencies', active: url.startsWith('/apps/dependencies') ? true : false },
            ]
        },
        {
            title : 'Gestión de Planificación',
            active: url.startsWith('/planification/create') ? true : false || url.startsWith('/planification/list') ? true : false || url.startsWith('/planification/process/execute') ? true : false,
            details : [
                { title: 'Crear Planificación', href: '/planification/create', active: url.startsWith('/planification/create') ? true : false },
                { title: 'Planificaciones', href: '/planification/list', active: url.startsWith('/planification/list') ? true : false },
                { title: 'Ejecutar', href: '/planification/process/execute', active: url.startsWith('/planification/process/execute') ? true : false },
            ]
        },
        {
            title : 'Control de Procesos',
            active: url.startsWith('/planification/process-') ? true : false,
            details : [
                { title: 'Revisar Planificación', href: '/planification/process-list/PR', active: url.startsWith('/planification/process-list/PR') ? true : false },
                { title: 'Aprobar Planificación', href: '/planification/process-list/RV', active: url.startsWith('/planification/process-list/RV') ? true : false },
                { title: 'Cerrar Planificación', href: '/planification/process-list/AP', active: url.startsWith('/planification/process-list/AP') ? true : false },
                { title: 'Alertas', href: '/apps/dependency/1/alert', active: url.startsWith('/apps/dependency/1/alert') ? true : false },
            ]
        },
        {
            title : 'Estadisticas',
            active: url.startsWith('/planification/individual-') ? true : false || url.startsWith('/planification/dependency-') ? true : false,
            details : [
                { title: 'Reporte Individual', href: '/planification/individual-reports', active: url.startsWith('/planification/individual-reports') ? true : false },
                { title: 'Reporte por Dependencia', href: '/planification/dependency-reports', active: url.startsWith('/planification/dependency-reports') ? true : false },
                { title: 'Indicador Individual', href: '/planification/individual-indicators', active: url.startsWith('/planification/individual-indicators') ? true : false },
                { title: 'Indicador por Dependencia', href: '/planification/dependency-indicators', active: url.startsWith('/planification/dependency-indicators') ? true : false },
            ]
        },
        // TODO Falta soporte
        {
            title: 'Otros',
            active: url.startsWith('/apps/profile') ? true : false,
            details: [
                { title: 'Profile', href: '/apps/profile', active: url.startsWith('/apps/profile') ? true : false },
            ]
        }
    ]

    return (
        <div className='py-8 px-4 md:px-8 h-16 flex justify-between items-center border-b bg-white'>
            <div className='flex items-center gap-4'>
                <button type='button' onClick={toggleSidebar} className='hidden md:block'>
                    <IconAlignLeft size={'20'} strokeWidth={'1.5'}/>
                </button>
                {links.map((link, i) => (
                    link.active === true &&
                    <div className='flex flex-row items-center gap-1 md:border-l-2 md:border-double px-4' key={i}>
                        <span className='text-sm font-semibold text-gray-600'>{link.title}</span>
                        <IconChevronRight size={'15'} strokeWidth={'1.5'}/>
                        {link.details.map((detail, x) => (
                            detail.active === true && <span className='text-sm font-semibold text-sky-500' key={x}>{detail.title}</span>
                        ))}
                    </div>
                ))}
            </div>
            <Dropdown auth={auth} isMobile={isMobile}/>
        </div>
    )
}
