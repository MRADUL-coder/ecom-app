'use client'

import DataInterface from '@/interface/data.interface'
import clientCatchError from '@/lib/client-catch-error'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Button, Card, message } from 'antd'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import '@ant-design/v5-patch-for-react-19'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { mutate } from 'swr'

const Products: FC<DataInterface> = ({ data }) => {
  const [isBrowser, setIsBrowser] = useState(false)
  const router = useRouter()

  const addToCart = async (id: string) => {
    try {
      const session = await getSession()

      if (!session) {
        return router.push('/login')
      }

      await axios.post('/api/cart', {
        product: id
      })

      message.success('Product added to cart')
      mutate('/api/cart?count=true')
    } catch (err) {
      clientCatchError(err)
    }
  }

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  if (!isBrowser) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
      {data.data.map((item: any, index: number) => (
        <Card
          key={index}
          hoverable
          className="h-full"
          cover={
            <div className="relative w-full h-[220px] sm:h-[240px] md:h-[260px]">
              <Image
                src={item.image}
                fill
                alt={item.title}
                className="rounded-t-lg object-cover"
                sizes="(max-width: 640px) 100vw,
                       (max-width: 1024px) 50vw,
                       (max-width: 1280px) 33vw,
                       25vw"
              />
            </div>
          }
        >
          <div className="flex flex-col h-full">
            <Card.Meta
              title={
                <Link
                  href={`/products/${item.title
                    .toLowerCase()
                    .split(' ')
                    .join('-')}`}
                  className="!text-inherit hover:!underline line-clamp-2"
                >
                  {item.title}
                </Link>
              }
              description={
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="font-semibold text-green-600">
                    ₹{item.price}
                  </span>

                  <del className="text-gray-400">
                    ₹{item.price}
                  </del>

                  <span className="text-red-500">
                    ({item.discount}% Off)
                  </span>
                </div>
              }
            />

            <div className="mt-5 flex flex-col gap-3">
              <Button
                onClick={() => addToCart(item._id)}
                icon={<ShoppingCartOutlined />}
                type="primary"
                block
              >
                Add to Cart
              </Button>

              <Link
                href={`/products/${item.title
                  .toLowerCase()
                  .split(' ')
                  .join('-')}`}
              >
                <Button
                  type="primary"
                  danger
                  block
                >
                  Buy Now
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default Products