import  { FC, ReactNode } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import ChildrenInterface from '@/interface/children.interface'


const AdminLayoutRouter:FC<ChildrenInterface>=({children})=>{
    return <AdminLayout>{children}</AdminLayout>
}
export default AdminLayoutRouter

