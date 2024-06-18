import { IconPencil, IconTrash, IconEye, IconArrowBadgeUp, IconHammer, IconFileDownload } from '@tabler/icons-react'
import { Link, useForm } from '@inertiajs/react'
import Swal from 'sweetalert2'
import { toast } from 'react-hot-toast'
import React from 'react'
import axios from 'axios'
export default function ActionButton({ type, title, url, id }) {

    const { delete: destroy } = useForm();

    const deleteData = async (id) => {
        Swal.fire({
            title: '¿Estás seguro de que quieres eliminar esto?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, bórralo!',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(`${url}/${id}`, {
                    onSuccess: () => {
                        toast.success('Data successfully deleted!',{
                            icon: '👏',
                            style: {
                                borderRadius: '10px',
                                background: '#333',
                                color: '#fff',
                            },
                        })
                    }
                })
            }
        })
    }

    const showFile = async (url) => {
        const response = await axios.get(
            url, { responseType: "blob" }
        );
        const newUrl = window.URL.createObjectURL(response.data);
        window.open(newUrl, "_blank");
    }

    return (
        <>
            {type == 'delete'?
                <button onClick={() => deleteData(id)} className='bg-red-100 px-3 py-1 rounded-lg border border-red-100 hover:bg-red-200 hover:border-red-500 flex items-center gap-1 text-red-500'>
                    <IconTrash className='text-red-500' strokeWidth={'1.2'} size={'20'}/> {title}
                </button>
                : type == 'view'?
                <Link href={url} className='bg-blue-100 px-3 py-1 rounded-lg border border-blue-100 hover:bg-blue-200 hover:border-blue-500 flex items-center gap-1 text-blue-500'>
                    <IconEye className='text-blue-500' strokeWidth={'1.2'} size={'20'}/> {title}
                </Link>
                : type == 'config'?
                <Link href={url} className='bg-blue-100 px-3 py-1 rounded-lg border border-blue-100 hover:bg-blue-200 hover:border-blue-500 flex items-center gap-1 text-blue-500'>
                    <IconHammer className='text-blue-500' strokeWidth={'1.2'} size={'20'}/> {title}
                </Link>
                : type == 'process'?
                <Link href={url} className='bg-green-100 px-3 py-1 rounded-lg border border-green-100 hover:bg-green-200 hover:border-green-500 flex items-center gap-1 text-green-500'>
                    <IconArrowBadgeUp className='text-green-500' strokeWidth={'1.2'} size={'20'}/> {title}
                </Link>
                : type == 'file'?
                <button onClick={() => showFile(url)} className='bg-green-100 px-3 py-1 rounded-lg border border-green-100 hover:bg-green-200 hover:border-green-500 flex items-center gap-1 text-green-500'>
                    <IconFileDownload className='text-green-500' strokeWidth={'1.2'} size={'20'}/> {title}
                </button>
                :
                <Link href={url} className='bg-yellow-100 px-3 py-1 rounded-lg border border-yellow-100 hover:bg-yellow-200 hover:border-yellow-500 flex items-center gap-1 text-yellow-500'>
                    <IconPencil size={'20'} strokeWidth={'1.2'}/> {title}
                </Link>
            }
        </>
    )
}
