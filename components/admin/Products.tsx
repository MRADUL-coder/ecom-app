'use client'
import clientCatchError from '@/lib/client-catch-error'
import fetcher from '@/lib/fetcher'
import { ArrowRightOutlined, DeleteOutlined, EditOutlined, PlusOutlined, SaveOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Card, Divider, Form, Input, InputNumber, message, Modal, Pagination, Result, Skeleton, Tag, Upload } from 'antd'

import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'
import {debounce} from 'lodash'

const Products = () => {
  const [productForm] = Form.useForm()
  const [open,setOpen] = useState(false)
  const [editId,setEditId]=useState<string | null>(null)
  const [page,setPage] =useState(1)
  const [limit,setLimit] = useState(16)
  const [products,setProducts] = useState({data:[],total:0})
  const{data,error,isLoading}=useSWR(`/api/product?page=${page}&limit=${limit}`,fetcher)

useEffect(() => {
  if (data) {
    setProducts(data)
  }
}, [data])

const onSearch = debounce(async (e) => {
  try {
    const value = e.target.value.trim()

    if (!value) {
      setProducts(data) // restore original products
      return
    }

    const { data: result } = await axios.get(`/api/product?search=${value}`)
    setProducts(result)
  } catch (err) {
    clientCatchError(err)
  }
}, 500)

  const handleClose=()=>{
    setOpen(false)
    productForm.resetFields()
    setEditId(null)
  }

  const createProduct=async(values:any)=>{
try
{
  values.image=values.upload.file.originFileObj
   const formData = new FormData()
   for(const key in values)
   {
    formData.append(key,values[key])
   }
const  {data} =   await axios.post("/api/product",formData)
mutate(`/api/product?page=${page}&limit=${limit}`)
console.log(data)
message.success("Product added successfully")
handleClose()
}
catch(err)
{
  clientCatchError(err)
}


  }

  const onPaginate=(page:number)=>{
setPage(page)
}
  
const editProduct=(item:any)=>{
  setEditId(item._id)
console.log(item)
setOpen(true)
productForm.setFieldsValue(item)
}

const saveProduct=async(values:any)=>{
  await axios.put(`/api/product/${editId}`,values)
  message.success("Product edited successfully")
  handleClose()
mutate(`/api/product?page=${page}&limit=${limit}`)
  setEditId(null)
}

const deleteProduct=async(id:any)=>{
 try{
await axios.delete(`/api/product/${id}`)
mutate(`/api/product?page=${page}&limit=${limit}`)
 }
 catch(err){
  clientCatchError(err)
 }
}

  if(isLoading)
  {
  return <Skeleton active/>
  }
     if(error)
     {
      return( <Result
    status="error"
    title={error.message}
    
   
  />)
     }
  return (
    <div className='flex flex-col gap-8'>

      <div className='flex justify-between items-center'>

    
   <Input 
   placeholder='Seacrh this site'
   suffix={<Button htmlType='submit' icon={<SearchOutlined/>}/>}
    className='!w-[350px]'
    onChange={onSearch}/>


     <Button type="primary" onClick={()=>setOpen(true)} size="large" icon={<PlusOutlined/>} iconPlacement='end' >Add Product</Button>
      </div>

      <div className='grid grid-cols-4 gap-12'>
        
         {products?.data?.map((item:any, index:number) => (
            <Card className='!relative' key={index}
            hoverable
            cover={
              <div className='relative w-full h-[180px]'>
                <Image
            src={item.image}
              fill
                alt={`pic-${index}`} 
                className='rounded-t object-cover'
            
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              </div>
            }

            actions={[<EditOutlined key="edit" className='text-green-400' onClick={()=>editProduct(item)}/>,
              <DeleteOutlined key="delete" className='text-rose-600' onClick={()=>deleteProduct(item._id)}></DeleteOutlined>
            ]}
            >
           
           <Card.Meta title={item.title}
           description={
            <div className='flex gap-2'>
              <label >₹{item.price}</label>
                  <del>₹{item.price}</del>
                 <label >(${item.discount}% Off)</label>
                  
            </div>
           }></Card.Meta>
             <Tag className='!mt-5' color="cyan">({item.quantity})PCs</Tag>
               
            </Card>
          ))
        }
 
      </div>
                  <div className='flex justify-end w-full'>
     <Pagination
     total={products.total}
     onChange={onPaginate}
     current={page}
     pageSizeOptions={[16,32,64,100]}
     defaultPageSize={limit}
     
     />
</div>
      <Modal open={open} width={720} centered footer={null} onCancel={handleClose}   mask={{ closable: false }}>
   
        <h1 className='text-lg font-medium'>Add a new Product</h1>
        <Divider/>
        <Form layout='vertical' onFinish={editId?saveProduct:createProduct} form={productForm}>
          <Form.Item name="title" label="Product name" rules={[{required:true}]}>
            <Input size="large" placeholder='Enter product name'></Input>
          </Form.Item>

          <div className='grid grid-cols-3 gap-8'>

             <Form.Item name="price" label="Price" rules={[{required:true,type:'number'}]}>
            <InputNumber size="large" placeholder='0.00 ' className='!w-full'></InputNumber>
          </Form.Item>
 
          <Form.Item name="discount" label="Discount" rules={[{required:true,type:'number'}]}>
            <InputNumber size="large" placeholder='20 ' className='!w-full'></InputNumber>
          </Form.Item>

                 <Form.Item name="quantity" label="Quantity" rules={[{required:true,type:'number'}]}>
            <InputNumber size="large" placeholder='0.00 ' className='!w-full'></InputNumber>
          </Form.Item>

          </div>
          <Form.Item label="Description" rules={[{required:true}]} name="description">
            <Input.TextArea rows={5} placeholder='Description'>
       
          
          </Input.TextArea>
          </Form.Item>
<Form.Item name="upload" rules={!editId ? [{ required: true }] : []} >
  <Upload fileList={[]}>
    <Button size="large" icon={<UploadOutlined></UploadOutlined>}>Upload a Product Image </Button>
  </Upload>
</Form.Item>
          <Form.Item>  
            {
              editId ?
               <Button size="large" type="primary" className='!bg-green-400' htmlType='submit' icon={<SaveOutlined/>}>Save changes</Button>
            :
              <Button size="large" type="primary" htmlType='submit' icon={<ArrowRightOutlined/>}>Add now</Button>
            
              }
            
             
             </Form.Item>
        </Form>
        </Modal>
    </div>
  )
}

export default Products