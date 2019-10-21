import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

import authMiddleware from './app/middleware/auth';
import AvailabeController from './app/controllers/AvailabeController';

const routes = new Router();
const upload = multer(multerConfig);

// not token
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
// users
routes.put('/users', UserController.update);

// providers
routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/availabe', AvailabeController.index);

// appointments
routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
routes.delete('/appointments/:id', AppointmentController.delete);

// schedules;
routes.get('/schedules', ScheduleController.index);

// notifications
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

// files
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
