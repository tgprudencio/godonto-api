import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileControler from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import AvailableController from './app/controllers/AvailableController';
import SpecializationController from './app/controllers/SpecializationController';
import MemberController from './app/controllers/MemberController';
import AlldatesController from './app/controllers/AlldatesController';

import authMiddleware from './app/middlewares/auth';


const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/specializations', SpecializationController.index);
routes.post('/specializations', SpecializationController.store);

routes.get('/members', MemberController.index);
routes.post('/members', MemberController.store);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:memberId/available', AvailableController.index);

routes.get('/alldates', AlldatesController.index);

routes.get('/appointments/:memberId', AppointmentController.list);
routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
routes.delete('/appointments/:id', AppointmentController.delete);
routes.put('/appointments/:id', AppointmentController.update);

routes.get('/schedule', ScheduleController.index);

routes.post('/files', upload.single('file'), FileControler.store);


export default routes;
