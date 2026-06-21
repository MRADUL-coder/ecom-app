'use client'
import { Button, Card, Form, Input } from 'antd'
import Image from 'next/image'
import React from 'react'
import Logo from './shared/Logo'
import { UserAddOutlined } from '@ant-design/icons'

import Link from 'next/link'
import clientCatchError from '@/lib/client-catch-error'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Signup = () => {
    const router= useRouter()
    const signup = async(value: any)=>{
        try{
           await axios.post("/api/user/signup",value)
           router.push("/login")
        }
        catch(err)
        {
            clientCatchError(err)
        }
    }

    return (
        <div className='bg-gray-100 h-screen grid grid-cols-2 animated__animated animate__fadeIn overflow-hidden'>
            <div className='relative'>
                <Image 
                    src="/images/signup.jpg"
                    fill
                    alt="signup"
                    className='object-cover'
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                />
            </div>
            <div className='flex items-center justify-center'>
                <Card className='w-[480px] animate__animated animate__slideInRight'>
                    <div className='space-y-4'>
                        <div className='flex justify-center'>
                            <Logo />
                        </div>
                        <Form layout='vertical' onFinish={signup}>
                            <Form.Item 
                                label="Fullname"
                                name="fullname"
                                rules={[{required: true}]}
                            >
                                <Input size='large' placeholder='Ravi singh parihar' />
                            </Form.Item>

                            <Form.Item 
                                label="Email"
                                name="email"
                                rules={[{required: true, type: 'email'}]}
                            >
                                <Input size='large' placeholder='email@example.com' />
                            </Form.Item>

                            <Form.Item 
                                label="Password"
                                name="password"
                                rules={[{required: true}]}
                            >
                                <Input.Password size='large' placeholder='email@example.com' />
                            </Form.Item>

                            <Form.Item>
                                <Button htmlType='submit' size='large' type="primary" danger icon={<UserAddOutlined />}>Sign up</Button>
                            </Form.Item>
                        </Form>
                        <div className='flex gap-2'>
                            <p className='text-gray-500'>Already have an account ?</p>
                            <Link href="/login">Sign in</Link>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Signup