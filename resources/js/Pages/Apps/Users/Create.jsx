import Button from '@/Components/Button'
import Card from '@/Components/Card'
import Input from '@/Components/Input'
import SelectInput from '@/Components/Select'
import AppLayout from '@/Layouts/AppLayout'
import { Head, useForm, usePage } from '@inertiajs/react'
import { IconPencilPlus, IconPencilX, IconUsers, IconPointFilled } from '@tabler/icons-react'
import toast from 'react-hot-toast'
import React from 'react'

export default function Create() {

    // destruct role and permissions from userPage props
    const { roles, dependencies } = usePage().props;

    // destruct data, setData, post and errors from useForm
    const { data, setData, post, errors } = useForm({
        name: '',
        last_name: '',
        email: '',
        rolesData: [],
        password: '',
        password_confirmation: '',
        dependency: {},
    });

    // define handle checkbox
    const handleCheckbox = (e) => {
        let array = data.rolesData

        if(array.includes(e.target.value))
            array = array.filter(name => name !== e.target.value);
        else
            array.push(e.target.value);

        setData('rolesData', array);
    }

    // define method handle form
    const handleForm = async (e) => {
        e.preventDefault();

        post('/apps/users', {
            onSuccess: () => {
                toast.success('Usuario creado correctamente!',{
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


    return (
        <>
            <Head title='Crear Usuario'/>
            <Card
                title={'Crear Usuario'}
                icon={<IconUsers size={'20'} strokeWidth={'1.5'}/>}
            >
                <form onSubmit={handleForm}>
                    <div className='grid grid-cols-2 gap-2'>
                        <div className='mb-4'>
                            <Input
                                label={'Nombre'}
                                type={'text'}
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                errors={errors.name}
                            />
                        </div>
                        <div className='mb-4'>
                            <Input
                                label={'Apellido'}
                                type={'text'}
                                value={data.last_name}
                                onChange={e => setData('last_name', e.target.value)}
                                errors={errors.last_name}
                            />
                        </div>
                        <div className='mb-4'>
                            <Input
                                label={'Email'}
                                type={'email'}
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                errors={errors.email}
                            />
                        </div>
                        <div className='mb-4'>
                            <SelectInput
                                label={'Dependencia'}
                                options={dependencies}
                                value={data.dependency}
                                onChange={e => setData('dependency', e)}
                                errors={errors.dependency}
                            />
                        </div>
                        <div className='mb-4'>
                            <Input
                                label={'Contraseña'}
                                type={'password'}
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                errors={errors.password}
                            />
                        </div>
                        <div className='mb-4'>
                            <Input
                                label={'Confirmar Contraseña'}
                                type={'password'}
                                value={data.password_confirmation}
                                onChange={e => setData('password_confirmation', e.target.value)}
                                errors={errors.password_confirmation}
                            />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-600 text-sm'>Roles</label>
                        <div className='grid grid-cols-1 gap-x-3 gap-y-1.5 h-[400px] overflow-y-auto'>
                            {roles.map((role, i) => (
                                <div className='border-b px-4 pb-2 pt-1 border-dashed' key={i}>
                                    <div className='flex items-center gap-2 mb-1.5'>
                                        <input
                                            type='checkbox'
                                            className='rounded-full'
                                            value={role.name}
                                            onChange={handleCheckbox}
                                            id={`check-${role.id}`}
                                        />
                                        <div className='font-semibold'>{role.name}</div>
                                    </div>
                                    {role.name !== 'administrador' ?
                                        <div className='flex flex-wrap items-center gap-4 ml-5'>
                                            {role.permissions.map((permission, x) => (
                                                <div className='text-sm text-gray-500 flex items-center gap-1' key={x}>
                                                    <IconPointFilled strokeWidth={'1.5'} size={'15'}/>{permission.name}
                                                </div>
                                            ))}
                                        </div>
                                        :
                                        <div className='text-sm text-gray-500 flex items-center gap-1 ml-5'>
                                            <IconPointFilled strokeWidth={'1.5'} size={'15'}/> all permissions
                                        </div>
                                    }
                                </div>
                            ))}
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
                            href={'/apps/users'}
                        />
                    </div>
                </form>
            </Card>
        </>
    )
}

Create.layout = page => <AppLayout children={page}/>
