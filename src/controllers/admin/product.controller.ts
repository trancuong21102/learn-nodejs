import express,{Express, Request, Response} from 'express';
import { handleCreateProduct, handleGetProductDetail, handleUpdateProduct } from 'services/product-service';
import { ProductSchema, TProductSchema } from 'src/validation/product.shcema';


const router = express.Router();

const getProductDetail = async(req: Request, res: Response) => {
    const { id } = req.params;
    const product = await handleGetProductDetail(id)
    return res.render("admin/product/detail",{id: id, product: product})
}

const getAdminCreateProductPage = async(req:Request, res:Response) => {
    const errors: string[] = [];
    const oldData = {
        naem: "",
        price: 0,
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
            await handleCreateProduct(name, price, detailDesc, shortDesc, +quantity, factory, target, file ? file.filename : "")
            return res.redirect("/admin/product")
    }catch(err) {
        console.error(err);
    }
}

const putUpdateProduct = async (req: Request, res: Response) => {
    const { name, price, detailDesc, shortDesc, quantity, factory, target } = req.body;
    const { id } = req.params;
    const file = req.file;
    const image = file ? file.filename : "";
     await handleUpdateProduct(id.toString(), name, price, detailDesc, shortDesc, +quantity, factory, image, target);
    return res.redirect("/admin/product")
}



export {
    getAdminCreateProductPage,
    postCreateProduct,
    putUpdateProduct,
    getProductDetail
}
