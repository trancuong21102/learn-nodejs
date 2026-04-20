import { prisma } from "config/client";

const getProducts = async() => {
    const prodcuts = await prisma.product.findMany();
    return prodcuts;
}

const getProductById = async(id: number) => {
    const product = await prisma.product.findUnique({
        where: {
            id: id
        }
    });
    return product;
}

export {
    getProducts,
    getProductById
}