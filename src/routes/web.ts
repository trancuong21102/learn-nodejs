import express,{Express} from 'express';
import { getCreateUserPage, getHomePage,getUserDetail,postCreateUser, postDeleteUser, putUpdateUser } from 'controllers/user.controller';
const router = express.Router();


const webRoutes = (app: Express) => {
    router.get('/',getHomePage);
    router.get('/create-user',getCreateUserPage);
    router.get('/handle-get-user/:id',getUserDetail);
    router.post('/handle-create-user',postCreateUser);
    router.post('/handle-delete-user/:id',postDeleteUser);
    router.post('/handle-update-user/:id',putUpdateUser);
    app.use('/', router);
}

export default webRoutes;
