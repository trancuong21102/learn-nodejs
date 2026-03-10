import { prisma } from "config/client";
import getConnection from "config/database";

const handleCreateUser = async (fullName: string, email: string, address: string) => {
    console.log("insert a new user:", fullName, email, address);
   const newUser = await prisma.user.create({
        data: {
            name: fullName,
            email: email,
            address: address
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

const handleUpdateUser = async (id: string | string[], fullName: string, email: string, address: string) => {
   const updateUser = await prisma.user.update({
    where: {
        id: Number(id)
    },
    data: {
        name: fullName,
        email: email,
        address: address
    }
   })

   return updateUser;
}


const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
}

const handleGetUserDetail = async (id: string | string[]) => {
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        }
    })
    return user;
}

export {
    handleCreateUser,
    getAllUsers,
    handleDeleteUser,
    handleGetUserDetail,
    handleUpdateUser
}