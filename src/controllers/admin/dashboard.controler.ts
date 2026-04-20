import { Request, Response } from "express";
import { getAllProducts, getAllUsers } from "services/user-service";

const getDashboardPage = async(req:Request, res:Response) => {
    return  res.render('admin/dashboard/index.ejs');
}

const getAdminUserPage = async(req:Request, res:Response) => {
    const users = await getAllUsers();
    
    return  res.render('admin/user/index.ejs',{ name: users });
}

const getAdminOrderPage = async(req:Request, res:Response) => {
    return  res.render('admin/order/index.ejs');
}

const getAdminProductPage = async(req:Request, res:Response) => {
    const products = await getAllProducts();
    return  res.render('admin/product/index.ejs',{ products });
}

export {
    getDashboardPage,
    getAdminUserPage,
    getAdminOrderPage,
    getAdminProductPage
}