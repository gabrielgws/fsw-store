import { Badge } from "@/components/ui/badge"
import { ProductItem } from "@/components/ui/product-item"
import { CATEGORY_ICON } from "@/constants/category-icon"
import { computeProductTotalPrice } from "@/helpers/product"
import { prismaClient } from "@/lib/prisma"

export default async function CategoryProducts({params}: any){
  const category = await prismaClient.category.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      Product: true,
    },
  })

  if(!category) {
    return null
  }

  return (
    <div className="flex flex-col p-5 gap-8">
      <Badge
        className="w-fit gap-1 text-base uppercase border-2 border-primary px-3 py-[0.365rem]"
        variant="outline"
      >
        {CATEGORY_ICON[params.slug as keyof typeof CATEGORY_ICON]}
        {category?.name}
      </Badge>

      <div className="grid grid-cols-2 gap-8">
        {category.Product.map((product) => (
          <ProductItem key={product.id} product={computeProductTotalPrice(product)} />
        ))}
      </div>
    </div>
  )
}