import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";


function MostOrdered(){
    return db.product.findMany({
        where: { isAvailable: true},
        orderBy: { orders: {_count: "desc"}},
        take: 4
    })
}

function NewestProduct(){
    return db.product.findMany({
        where: { isAvailable: true },
        orderBy: { createdAt: "desc" },
        take: 4
    })
}

export default function HomePage(){
    return <>
    <main className="flex-initial">
        <ProductGrid title="Suggested Fou You" productFetcher={MostOrdered}/>
        <ProductGrid title="Newly Launched Products" productFetcher={NewestProduct}/>
    </main>

    </>
}

type ProductGridProps = {
    title: string,
    productFetcher: ()=> Promise<Product[]>
}

async function ProductGrid({ productFetcher, title}: ProductGridProps){
    return <>
        <div className="mb-6 space-y-3 ">
            <div className="flex gap-3">
                <h2 className="text-3xl font-bold ">{title}</h2>
            <Button variant={"outline"} className="space-x-2" asChild>
                <Link href={`/products`}>
                    <span>See more</span>
                    <ArrowRight className="size-3" />
                </Link>
            </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(await productFetcher()).map(product => (
                    <ProductCard key={product.id} {...product}/>

                ))}
            </div>
        </div>
    </>
}