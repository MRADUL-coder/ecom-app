import Slug from '@/components/Slug'
import SlugInterface from '@/interface/slug.interface'
import { FC } from 'react'

const SlugRouter: FC<SlugInterface> = async ({params}) => {
  const {slug} = await params
  const slugRes = await fetch(`${process.env.SERVER}/api/product/${slug}`)
  const data = slugRes.ok ? await slugRes.json() : null

  return (
    <Slug data={data} title={slug} />
  )
}

export default SlugRouter