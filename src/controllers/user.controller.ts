import { Request, Response } from 'express';
import { getAllUsers, handleCreateUser, handleDeleteUser, handleGetUserDetail, handleUpdateUser } from 'services/user-service';

const getHomePage = async (req: Request, res: Response) => {
    //get users
    const users = await getAllUsers();
    console.log("check users", users);
    return res.render("home", { name: users })
}

const getCreateUserPage = (req: Request, res: Response) => {
    return res.render("create-user")
}

const getUserDetail = async(req: Request, res: Response) => {
    const { id } = req.params;
     
    const user = await handleGetUserDetail(id)
    return res.render("view-user",{id: id, user: user})
}

const postCreateUser = async (req: Request, res: Response) => {
    const { fullName, email, address } = req.body;
    console.log("check data", fullName, email, address);
    console.log("check data", req.body);
    await handleCreateUser(fullName, email, address);
    return res.redirect("/")
}

const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params 
    await handleDeleteUser(id);
    return res.redirect("/")
}

const putUpdateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { fullName, email, address } = req.body ;
    await handleUpdateUser(id,  fullName, email, address );
    return res.redirect("/")
}

export {
    getHomePage,
    getCreateUserPage,
    postCreateUser,
    postDeleteUser,
    getUserDetail,
    putUpdateUser
}