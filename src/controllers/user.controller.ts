import { Request, Response } from 'express';
import { getAllUsers, handleCreateUser } from 'services/user-service';
import { get } from 'http';

const getHomePage = async (req: Request, res: Response) => {
    //get users
    const users = await getAllUsers();
    console.log("check users", users);
    return res.render("home",{name: users})
}

const getCreateUserPage = (req: Request, res: Response) => {
  
    return res.render("create-user")
}

const postCreateUser = async (req: Request, res: Response) => {
      const {fullName, email, address} = req.body;
    console.log("check data", fullName, email, address);
    console.log("check data", req.body);
    await handleCreateUser(fullName, email, address);
    return res.redirect("/")
}

const postDeleteUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    console.log("check id", id);
    return res.redirect("/")
}

export {
    getHomePage,
    getCreateUserPage, 
    postCreateUser
}