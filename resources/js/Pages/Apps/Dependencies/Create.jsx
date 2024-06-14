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
    const { users, parentDependencies } = usePage().props;

    // destruct data, setData, post and errors from useForm
    const { data, setData, post, errors } = useForm({
        name: '',
        internal_code: '',
        parent_id: [],
        user_id: [],
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

        post('/apps/dependencies', {
            onSuccess: () => {
                toast.success('Dependencia creada correctamente!',{
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
            <Head title='Crear Dependencia'/>
            <Card
                title={'Crear Dependencia'}
                icon={<IconAugmentedReality size={'20'} strokeWidth={'1.5'}/>}
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

Create.layout = page => <AppLayout children={page}/>
