import express,{Express, Request, Response} from 'express';
import { ProductSchema, TProductSchema } from 'src/validation/product.shcema';


const router = express.Router();

const getAdminCreateProductPage = async(req:Request, res:Response) => {
    const errors = []
    const oldData = {
        naem: "",
        price: "",
        detailDesc: "",
        shortDesc: "",
        quantity: "",
        factory: "",
        target: ""
    }
    return  res.render('admin/product/create.ejs',{
        errors,oldData
    });
}

const postCreateProduct = async(req:Request, res:Response) => {
    const {name, price, detailDesc, shortDesc, quantity, factory, target} = req.body as TProductSchema;
    const file = req.file;
    try {
        const validate = ProductSchema.safeParse(req.body)
        if(!validate.success) {
            const errorZod = validate.error.issues;
            const errors = errorZod.map((err) => `${err.message}`);
            const oldData = {
                name,
                price,
                detailDesc,
                shortDesc,
                quantity,
                factory,
                target
            };
            return res.render('admin/product/create.ejs',{
                errors
            });
        }
    }catch(err) {
        console.error(err);
    }
    return  res.render('admin/product');
}


export {
    getAdminCreateProductPage,
    postCreateProduct
}
