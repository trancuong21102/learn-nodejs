import express,{Express} from 'express';
import { getCreateUserPage, getHomePage,getUserDetail,postCreateUser, postDeleteUser, putUpdateUser } from 'controllers/user.controller';
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashboardPage } from 'controllers/admin/dashboard.controler';
import fileUploadMiddleware from 'src/middleware/multer';
import { getProductPage } from 'controllers/client/product.controller';
import { getAdminCreateProductPage, postCreateProduct } from 'controllers/admin/product.controller';
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();


const webRoutes = (app: Express) => {
    router.get('/',getHomePage);
    router.get('/product/:id',getProductPage)
    // admin routes
    router.get('/admin', getDashboardPage);
    router.get('/admin/user', getAdminUserPage);
    router.get('/admin/product', getAdminProductPage);

    router.get('/admin/user/create',getCreateUserPage);
    router.get('/admin/product/create',getAdminCreateProductPage);

    router.post('/admin/handle-create-user', fileUploadMiddleware('avatar'), postCreateUser);
    router.post('/admin/handle-create-product', fileUploadMiddleware('image','images/product'), postCreateProduct);

    router.post('/admin/delete-user/:id',postDeleteUser);
    router.get('/admin/get-user/:id',getUserDetail);

    router.post('/admin/update-user/:id',fileUploadMiddleware('avatar'),putUpdateUser);



    app.use('/', router);
}

export default webRoutes;
