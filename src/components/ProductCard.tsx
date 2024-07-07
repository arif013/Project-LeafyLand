import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import Link from "next/link"
import { descriptionFormatter, formatCurrency } from "@/lib/formatter"
import { Button } from "./ui/button"

type ProductCardProps = {
    id: string,
    name: string,
    description: string,
    price: number,
    imagePath: string
}

export async function ProductCard({id, name, description, price, imagePath}: ProductCardProps) {
    
    return<>
            <Card className="flex overflow-hidden flex-col">
                <div className="relative w-full h-auto aspect-video">
                    <Image src={imagePath} fill alt={name}/>
                </div>
                <CardHeader>
                    <CardTitle>
                        {name}
                    </CardTitle>
                    <CardDescription>
                        {descriptionFormatter(description)}...
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p>{formatCurrency(price)}</p>
                </CardContent>
                <CardFooter>
                    <Button >
                    <Link href={`/products/${id}/product-details`}>View Details</Link>

                    </Button>
                </CardFooter>
            </Card>
    </>
}