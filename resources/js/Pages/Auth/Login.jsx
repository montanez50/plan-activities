import AuthCard from '@/Components/AuthCard'
import Button from '@/Components/Button'
import InputGroup from '@/Components/InputGroup'
import AuthLayout from '@/Layouts/AuthLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import { IconAt, IconCheck, IconPassword, IconPlus } from '@tabler/icons-react'
import React from 'react'

export default function Login() {

    const {data, setData, post, errors} = useForm({
        email : '',
        password : '',
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        post(route('login'));
    }

  return (
    <>
        <Head title='Login'/>
        <AuthCard>
            <h1 className='text-xl font-bold mb-2 text-black text-center'>PESAM CEM</h1>
            <div className="flex justify-center items-center">
                <img src="/logo_CEM.png" className='w-[50%] rounded-lg' />
            </div>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <InputGroup
                        label={'Correo'}
                        type={'email'}
                        placeholder={'Introducir correo'}
                        icon={<IconAt size={'20'} strokeWidth={'1.5'} className='text-gray-400'/>}
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        errors={errors.email}
                    />
                </div>
                <div className='mb-4'>
                    <InputGroup
                        label={'Contraseña'}
                        type={'password'}
                        placeholder={'Introducir contraseña'}
                        icon={<IconPassword size={'20'} strokeWidth={'1.5'} className='text-gray-400'/>}
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                        errors={errors.password}
                    />
                </div>
                <div className='flex flex-wrap items-center gap-2'>
                    <Button
                        className={'bg-sky-600 shadow shadow-sky-500 text-white'}
                        icon={<IconCheck size={'20'} strokeWidth={'1.5'}/>}
                        label={'Login'}
                    />
                </div>
            </form>
        </AuthCard>
    </>
  )
}

Login.layout = page => <AuthLayout children={page}/>
