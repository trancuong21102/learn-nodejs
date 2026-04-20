import { prisma } from "config/client";
import { hashPassword } from "./user-service";
import { Product } from "@prisma/client";

const handleCreateProduct = async (name: string, price: number, detailDesc: string, shortDesc: string, quantity: number, factory: string, target: string, image: string) => {
    await prisma.product.create({
        data: {
            name: name,
            price: price,
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            quantity: quantity,
            factory: factory,
            target: target,
            image: image
        }
    })
}

const handleGetProductDetail = async (id: string | string[]) => {
    const product = await prisma.product.findUnique({
        where: {
            id: Number(id)
        }
    })
    return product;
}

const handleUpdateProduct = async (id: string, name: string, price: number, detailDesc: string, shortDesc: string, quantity: number, factory: string, image: string, target: string) => {
    const updateUser = await prisma.product.update({
        where: {
            id: Number(id),
        },
        data: {
            name: name,
            price: price,
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            quantity: quantity,
            factory: factory,
            image: image,
            target: target
        }
    })

    return updateUser;
}

const handleDeleteProduct = async (id: string | string[]) => {
    const deletedProduct = await prisma.product.delete({
        where: {
            id: Number(id),
        }
    })

    return deletedProduct;
}

export {
    handleCreateProduct,
    handleGetProductDetail,
    handleUpdateProduct,
    handleDeleteProduct
}