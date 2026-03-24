import express,{Express, Request, Response} from 'express';


const router = express.Router();

const getProductPage = async(req:Request, res:Response) => {
    return  res.render('admin/dashboard/index.ejs');
}


export {
    getProductPage
}