'use client'

import { Avatar, message, Select, Skeleton, Table } from 'antd'
import { title } from 'process'
import React from 'react'
import moment from 'moment'
import useSWR, { mutate } from 'swr'
import fetcher from '@/lib/fetcher'
import clientCatchError from '@/lib/client-catch-error'
import axios from 'axios'
import '@ant-design/v5-patch-for-react-19';

const Orders = () => {

  const {data, error, isLoading} = useSWR('/api/order', fetcher)

  if(isLoading)
    return <Skeleton active />

  if(error)
    return <h1 className='text-rose-500 font-medium'>{error.message}</h1>

  const changeStatus = async (status: string, id:string)=>{
    try {
      await axios.put(`/api/order/${id}`, {status})
      message.success(`Product status changed to ${status}`)
      mutate("/api/order")
    }
    catch(err)
    {
      clientCatchError(err)
    }
  }

  const columns = [
    {
      title: "Customer",
      key: 'customer',
      render: (item: any)=>(
        <div className='flex gap-3'>
          <Avatar size="large" className='!bg-orange-500 !capitalize'>
            {item.user.fullname[0]}
          </Avatar>
          <div className='flex flex-col'>
            <h1 className='font-medium capitalize'>{item.user.fullname}</h1>
            <label className='text-gray-500'>{item.user.email}</label>
          </div>
        </div>
      )
    },
    {
      title: "Product",
      key: "product",
      render: (item: any)=>(
        <label className='capitalize'>{item.product.title}</label>
      )
    },
    {
      title: "Price",
      key: "price",
      render: (item: any)=>(
        <label>₹{item.product.price}</label>
      )
    },
    {
      title: "Discount",
      key: "discount",
      render: (item: any)=>(
        <label>{item.product.discount}%</label>
      )
    },
    {
      title: 'Address',
      key: 'address',
      render: (item: any)=>(
        <label className='text-gray-500'>
          {item.user.address || "Address not found"}
        </label>
      )
    },
    {
      title: "Status",
      key: "status",
      render: (item: any)=>(
        <Select placeholder="Status" style={{width: 120}} defaultValue={item.status} onChange={(value)=>changeStatus(value, item._id)}>
          <Select.Option value="processing">Processing</Select.Option>
          <Select.Option value="dispatched">Dispatched</Select.Option>
          <Select.Option value="returned">Returned</Select.Option>
        </Select>
      )
    },
    {
      title: "Date",
      key: "date",
      render: (item: any)=>(
        <label>{moment(item.createdAt).format('MMM DD, YYYY hh:mm A')}</label>
      )
    }
  ]

  return (
    <div className='space-y-8'>
      <Table 
        columns={columns}
        dataSource={data}
        rowKey="_id"
      />
    </div>
  )
}

export default Orders