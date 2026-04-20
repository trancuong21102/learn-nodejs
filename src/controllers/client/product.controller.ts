import express,{Express, Request, Response} from 'express';
import { handleGetProductDetail } from 'services/product-service';
import { handleGetUserDetail } from 'services/user-service';


const router = express.Router();

const getProductPage = async(req:Request, res:Response) => {
    return  res.render('client/product/index.ejs');
}

const getProductDetailById = async(req: Request, res: Response) => {
    const { id } = req.params;
    const product = await handleGetProductDetail(id)
    return res.render("client/product/detail.ejs",{id: id, product: product})
}


export {
    getProductPage,
    getProductDetailById
}