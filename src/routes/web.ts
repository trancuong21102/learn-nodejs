import express,{Express} from 'express';
import { getCreateUserPage, getHomePage,getUserDetail,postCreateUser, postDeleteUser, putUpdateUser } from 'controllers/user.controller';
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashboardPage } from 'controllers/admin/dashboard.controler';
import fileUploadMiddleware from 'src/middleware/multer';
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();


const webRoutes = (app: Express) => {
    router.get('/',getHomePage);

    // admin routes
    router.get('/admin', getDashboardPage);
    router.get('/admin/user', getAdminUserPage);
    router.get('/admin/user/create',getCreateUserPage);
    router.post('/admin/handle-create-user', fileUploadMiddleware('avatar'), postCreateUser);
    router.post('/admin/delete-user/:id',postDeleteUser);
    router.get('/admin/get-user/:id',getUserDetail);
    router.post('/admin/update-user/:id',fileUploadMiddleware('avatar'),putUpdateUser);



    app.use('/', router);
}

export default webRoutes;
