'use client'

import { Avatar, Select, Skeleton, Table } from 'antd'

import React from 'react'
import moment from 'moment'

const data = [
  {
    "orderId": "ORD1001",
    "userId": "USR001",
    "product": {
      "productId": "P001",
      "productName": "Wireless Mouse",
      "quantity": 2,
      "price": 29.99
    },
    "totalAmount": 59.98,
    "status": "pending",
    "createdAt": "2025-06-05T10:00:00Z"
  },
  {
    "orderId": "ORD1002",
    "userId": "USR002",
    "product": {
      "productId": "P003",
      "productName": "Bluetooth Headphones",
      "quantity": 1,
      "price": 59.99
    },
    "totalAmount": 59.99,
    "status": "success",
    "createdAt": "2025-06-04T12:45:00Z"
  },
  {
    "orderId": "ORD1003",
    "userId": "USR003",
    "product": {
      "productId": "P002",
      "productName": "USB-C Charger",
      "quantity": 3,
      "price": 29.99
    },
    "totalAmount": 89.97,
    "status": "error",
    "createdAt": "2025-06-03T14:30:00Z"
  },
  {
    "orderId": "ORD1004",
    "userId": "USR004",
    "product": {
      "productId": "P004",
      "productName": "Laptop Stand",
      "quantity": 1,
      "price": 49.99
    },
    "totalAmount": 49.99,
    "status": "warning",
    "createdAt": "2025-06-02T16:00:00Z"
  }
]


const Orders = () => {

  const columns = [
    {
      title: "Customer",
      key: 'customer',
      render: ()=>(
        <div className='flex gap-3'>
          <Avatar size="large" className='!bg-orange-500'>M</Avatar>
          <div className='flex flex-col'>
            <h1 className='font-medium'>Er Saurav</h1>
            <label className='text-gray-500'>email@gmail.com</label>
          </div>
        </div>
      )
    },
    {
      title: "Product",
      key: "product",
      render: (item: any)=>(
        <label>{item.product.productName}</label>
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
      title: 'Address',
      key: 'address',
      render: ()=>(
        <label className='text-gray-500'>1234 Elm Street, Apt 56B, Springfield, IL 62704, USA</label>
      )
    },
    {
      title: "Status",
      key: "status",
      render: ()=>(
        <Select placeholder="Status" style={{width: 120}}>
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
      <Skeleton active />
      <Table 
        columns={columns}
        dataSource={data}
        rowKey="orderId"
      />
    </div>
  )
}

export default Orders