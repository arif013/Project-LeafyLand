import {db} from "@/db/db"
import { notFound } from "next/navigation"

export default async function BuyNow({ params: {id} }: {params: {id: string}}){
    const product = await db.product.findUnique({
        where: { id }
    })
    if(product == null) return notFound()
        
    return <div>Hi</div>
}