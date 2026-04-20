import { prisma } from "config/client";

import bcrypt from "bcrypt";
import { ACCOUNT_TYPE } from "config/constant";
const saltRounds = 10;

const hashPassword = async (plainText: string) => {
    return await bcrypt.hash(plainText, saltRounds);
};

const handleCreateUser = async (fullName: string, username: string, phone: string, role: string, address: string, avatar: string) => {
    const defaultPassword = await hashPassword("123456");
   const newUser = await prisma.user.create({
        data: {
            fullName: fullName,
            username: username,
            password : defaultPassword, 
            accountType: ACCOUNT_TYPE.SYSTEM,
            phone: phone,
            address: address,
            avatar: avatar,
            roleId: +role //"22" => 22
        }
   })

}

const handleDeleteUser = async (id: string | string[]) => {
    const deleteUser = await prisma.user.delete({
        where: {
            id: Number(id)
        }
    })
    return deleteUser;
}

const handleUpdateUser = async (id: string, fullName: string, username: string, phone: string, role: string, address: string, avatar: string) => {
   const updateUser = await prisma.user.update({
    where: {
        id: Number(id),
    },
    data: {
         fullName: fullName,
            username: username,
            password : "",
            accountType: "",
            phone: phone,
            address: address,
            ...(avatar !== undefined && { avatar }),
            roleId: +role
    }
   })

   return updateUser;
}


const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
}

const getAllRoles = async () => {
    const roles = await prisma.role.findMany();
    return roles;
}

const handleGetUserDetail = async (id: string | string[]) => {
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        }
    })
    return user;
}

const getAllProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
}

export {
    handleCreateUser,
    getAllUsers,
    handleDeleteUser,
    handleGetUserDetail,
    handleUpdateUser,
    getAllRoles,
    hashPassword,
    getAllProducts
}