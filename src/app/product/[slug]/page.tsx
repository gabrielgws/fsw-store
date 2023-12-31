import { prismaClient } from "@/lib/prisma"
import { ProductImages } from "./components/product-images";
import { ProductInfo } from "./components/product-info";
import { computeProductTotalPrice } from "@/helpers/product";
import { ProductList } from "@/components/ui/product-list";
import { SectionTitle } from "@/components/ui/section-title";

interface ProductDetailsPageProps {
   params: {
    slug: string
   },
}

export default async function ProductDetailsPage ({params: {slug}}: ProductDetailsPageProps) {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: slug
    },
    include: {
      category: {
        include: {
          Product: {
            where: {
              slug: {
                not: slug
              }
            }
          }
        }
      }
     }
  })

  if(!product) return null;

  return (
    <div className="flex flex-col gap-8 pb-8">
      <ProductImages imageUrls={product.imageUrls} name={product.name}/>
      <ProductInfo product={computeProductTotalPrice(product)}/>
      <div>
        <SectionTitle>Produtos Recomendados</SectionTitle>
        <ProductList products={product.category.Product}/>
      </div>
    </div> 
  )
}