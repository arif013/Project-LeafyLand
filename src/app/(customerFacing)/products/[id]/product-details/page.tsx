import db from "@/db/db"
import { Product } from "@prisma/client"


// function getProductDetails(){
//     return db.product.findMany({
//         where: {isAvailable: true}
//     })
// }

// type productFetcherProps = {
//     productFetcher: ()=> Promise<Product[]>
// }

export default async function ProductDetails({ params: {id}}: {params: {id: string}}){
    const allProduct = await db.product.findUnique({
        where: {id} 
    })
    return <>
        <ProductDetailsPage allProduct={allProduct}/>
    </>
}

function ProductDetailsPage( {allProduct}: {allProduct: Product}){
    return <>
    {allProduct? (

        <div>{allProduct.name}</div>
    ):(
        <div>Not found</div>
    )}

    </>
}
