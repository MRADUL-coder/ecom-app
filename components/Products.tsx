'use client'
import DataInterface from '@/interface/data.interface'
import clientCatchError from '@/lib/client-catch-error'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Button, Card, message } from 'antd'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import '@ant-design/v5-patch-for-react-19';
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { mutate } from 'swr'

const Products: FC<DataInterface> = ({data}) => {
  const [isBrowser, setIsBrowser] = useState(false)
  const router = useRouter()


  const addToCart = async (id: string)=>{
    try {
      const session = await getSession()
      if(!session)
        return router.push("/login")

      await axios.post("/api/cart", {product: id})
      message.success("Product added to cart")
      mutate('/api/cart?count=true')
    }
    catch(err)
    {
      clientCatchError(err)
    }
  }

  useEffect(()=>{
    setIsBrowser(true)
  }, [])

  if(!isBrowser)
    return null

  return (
    <div className='grid grid-cols-4 gap-10'>
        {
          data.data.map((item: any, index: number)=>(
            <Card 
              key={index}
              hoverable
              cover={
                <div className='relative w-full h-[180px]'>
                  <Image 
                    src={item.image} 
                    fill
                    alt={item.title} 
                    className='rounded-t-lg object-cover'
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>
              }
            > 
              <Card.Meta 
                title={
                  <Link href={`/products/${item.title.toLowerCase().split(" ").join("-")}`} className='!text-inherit hover:!underline'>
                    {item.title}
                  </Link>
                }
                description={
                  <div className='flex gap-2'>
                    <label>₹{item.price}</label>
                    <del>₹{item.price}</del>
                    <label>(${item.discount}% Off)</label>
                  </div>
                }
              />

              <Button onClick={()=>addToCart(item._id)} icon={<ShoppingCartOutlined />} type="primary" className='!w-full !mt-5 !mb-2'>Add to cart</Button>
              <Link href={`/products/${item.title.toLowerCase().split(" ").join("-")}`}>
                <Button type="primary" danger className='!w-full'>Buy now</Button>
              </Link>
            </Card>
          ))
        }
      </div>
  )
}

export default Products