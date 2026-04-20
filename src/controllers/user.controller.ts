import { Request, Response } from 'express';
import { getProducts } from 'services/client/item.service';
import { handleDeleteProduct } from 'services/product-service';
import { getAllRoles, getAllUsers, handleCreateUser, handleDeleteUser, handleGetUserDetail, handleUpdateUser } from 'services/user-service';

const getHomePage = async (req: Request, res: Response) => {
    const products = await getProducts();
    return res.render("client/home/show", { products })
}

const getCreateUserPage = async(req: Request, res: Response) => {
    const roles = await getAllRoles();
    return res.render("admin/user/create.ejs", { roles })
}

const getUserDetail = async(req: Request, res: Response) => {
    const { id } = req.params;
    const roles = await getAllRoles();
    const user = await handleGetUserDetail(id)
    return res.render("admin/user/detail",{id: id, user: user, roles: roles})
}

const postCreateUser = async (req: Request, res: Response) => {
    const { fullName, username,phone,role, address } = req.body;

    const file = req.file;
    const avatar = file ? file.filename : "";
    await handleCreateUser(fullName, username, phone, role, address, avatar);
    return res.redirect("/admin/user")
}

const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params 
    await handleDeleteUser(id);
    return res.redirect("/admin/user")
}

const putUpdateUser = async (req: Request, res: Response) => {
    const { fullName, username,phone,role, address } = req.body;
    const { id } = req.params;
    const file = req.file;
    const avatar = file ? file.filename : "";
     await handleUpdateUser(id.toString(), fullName, username, phone, role, address, avatar);
    return res.redirect("/admin/user")
}

const postDeleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params 
    await handleDeleteProduct(id);
    return res.redirect("/admin/product")
}

export {
    getHomePage,
    getCreateUserPage,
    postCreateUser,
    postDeleteUser,
    getUserDetail,
    putUpdateUser,
    postDeleteProduct
}