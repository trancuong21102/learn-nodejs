import express,{Express} from 'express';
import { getCreateUserPage, getHomePage,getUserDetail,postCreateUser, postDeleteProduct, postDeleteUser, putUpdateUser } from 'controllers/user.controller';
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashboardPage } from 'controllers/admin/dashboard.controler';
import fileUploadMiddleware from 'src/middleware/multer';
import {  getProductDetailById, getProductPage } from 'controllers/client/product.controller';
import { getAdminCreateProductPage, getProductDetail, postCreateProduct, putUpdateProduct } from 'controllers/admin/product.controller';
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();


const webRoutes = (app: Express) => {
    router.get('/',getHomePage);
    router.get('/product/:id',getProductDetailById)
    // admin routes
    router.get('/admin', getDashboardPage);
    router.get('/admin/user', getAdminUserPage);
    router.get('/admin/product', getAdminProductPage);

    router.get('/admin/user/create',getCreateUserPage);
    router.get('/admin/product/create',getAdminCreateProductPage);

    router.post('/admin/handle-create-user', fileUploadMiddleware('avatar'), postCreateUser);
    router.post('/admin/handle-create-product', fileUploadMiddleware('image','images/product'), postCreateProduct);

    router.post('/admin/delete-user/:id',postDeleteUser);
    router.post('/admin/product/delete/:id',postDeleteProduct);
    
    router.get('/admin/get-user/:id',getUserDetail);
    router.get('/admin/product/detail/:id',getProductDetail);

    router.post('/admin/update-user/:id',fileUploadMiddleware('avatar'),putUpdateUser);
    router.post('/admin/update-product/:id',fileUploadMiddleware('image','images/product'),putUpdateProduct);



    app.use('/', router);
}

export default webRoutes;
