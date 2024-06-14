import AppLayout from '@/Layouts/AppLayout'
import Card from '@/Components/Card'
import Input from '@/Components/Input'
import SelectInput from '@/Components/Select'
import Button from '@/Components/Button'
import { IconUsers, IconPencilPlus, IconPencilX, IconPointFilled } from '@tabler/icons-react'
import { Head, usePage, useForm } from '@inertiajs/react'
import toast from 'react-hot-toast'
import React from 'react'

export default function Edit() {

    // destruct data from usePage props
    const { dependency, users, parentDependencies } = usePage().props;

    // destruct data, setData, post, and errors from useForm
    const { data, setData, post, errors } = useForm({
        name: dependency.name,
        internal_code: dependency.internal_code,
        user_id: dependency.user_id,
        dependency_id: dependency.parent_id,
        _method: 'put',
    });

    // define method handle form
    const handleForm = async (e) => {
        e.preventDefault();

        post(`/apps/dependencies/${dependency.id}`, {
            onSuccess: () => {
                toast.success('Dependencia modificada correctamente!',{
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
            <Head title='Editar Dependencia'/>
            <Card
                title='Editar Dependencia'
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
                                label={'Código Interno'}
                                type={'text'}
                                value={data.internal_code}
                                onChange={e => setData('internal_code', e.target.value)}
                                errors={errors.internal_code}
                            />
                        </div>
                        <div className='mb-4'>
                            <SelectInput
                                label={'Usuario Responsable'}
                                options={users}
                                value={users.filter(e => e.value === data.user_id)[0]}
                                onChange={e => setData('user_id', e.value)}
                                errors={errors.user_id}
                            />
                        </div>
                        <div className='mb-4'>
                            <SelectInput
                                label={'Dependencia Padre'}
                                options={parentDependencies}
                                value={parentDependencies.filter(e => e.value === data.dependency_id)[0]}
                                onChange={e => setData('dependency_id', e)}
                                errors={errors.dependency_id}
                            />
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

Edit.layout = page => <AppLayout children={page}/>
