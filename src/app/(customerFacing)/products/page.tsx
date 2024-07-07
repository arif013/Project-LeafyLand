import { ProductCard } from "@/components/ProductCard"
import db from "@/db/db"
import { Product } from "@prisma/client"

function getProducts(){
    return db.product.findMany({
        where: { isAvailable: true},
    })
}

export default function Products(){
    return<>
        <ProductGrid productFetcher={getProducts}/>
    </>
}

type ProductGridProps = {
    productFetcher: ()=> Promise<Product[]>
}

async function ProductGrid( { productFetcher} : ProductGridProps ){
    return <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(await productFetcher()).map(product => (
            <ProductCard key= {product.id} {...product} />
        ))}
    </div>
    </>
}