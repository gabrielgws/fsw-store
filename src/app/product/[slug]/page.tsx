import { prismaClient } from "@/lib/prisma"

interface ProductDetailsPageProps {
   params: {
    slug: string
   }
}

export default async function ProductDetailsPage ({params: {slug}}: ProductDetailsPageProps) {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: slug
    }
  })

  if(!product) return null;

  return (
    <div>
      {product.name}
    </div>
  )
}