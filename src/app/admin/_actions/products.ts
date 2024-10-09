    "use server"

    import db from "@/db/db"
    import { z } from "zod"
    import fs from "fs/promises"
    import { notFound, redirect } from "next/navigation"

    const fileSchema = z.instanceof(File, {message: "Required"})
    const imageSchema = fileSchema.refine(
        file => file.size === 0 || file.type.startsWith("image/")
    )

    const addSchema = z.object({
        name: z.string().min(1),
        category: z.string().min(1),
        description: z.string().min(1),
        price: z.coerce.number().int().min(1),
        image: imageSchema.refine(file => file.size > 0, "Required")
    })

    export async function addProduct(prevState: unknown, formData: FormData){
        
        const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
        if(result.success === false){
            return result.error.formErrors.fieldErrors
        }
        // console.log(formData)
        const data = result.data

        await fs.mkdir("public/products", {recursive: true})
        const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
        await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))

        await db.product.create({ data: {
            isAvailable: false,
            name: data.name,
            category: data.category,
            description: data.description,
            price: data.price,
            imagePath,
        }})
        redirect("/admin/products")
    }   

    const editSchema = addSchema.extend({
        file: fileSchema.optional(),
        image: imageSchema.optional()
    })

    export async function updateProduct( id: string, prevState: unknown, formData: FormData){
        const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
        if(result.success === false){
            return result.error.formErrors.fieldErrors
        }
        // console.log(formData)
        const data = result.data
        const product = await db.product.findUnique({where: {id}})

        if(product == null) return notFound()
        
        let imagePath = product.imagePath
        if(data.image != null && data.image.size > 0){
             
            await fs.unlink(`public${product.imagePath}`)
            imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
            await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))
    }

        await db.product.update({
            where: { id }, 
            data: {
            isAvailable: false,
            name: data.name,
            category: data.category,
            description: data.description,
            price: data.price,
            imagePath,
        },
        })
        redirect("/admin/products")
    }   


    export async function toggleProductAvailability(id: string, isAvailable: boolean){
        await db.product.update({where: {id}, data: {
            isAvailable
        }})
    }

    export async function deleteProduct(id: string){
        const product = await db.product.delete({where: { id }})
        if(product == null ) return notFound()
        
        await fs.unlink(`public${product.imagePath}`)
    }


