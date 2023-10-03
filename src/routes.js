import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
    const user = await User.create({
        name: 'Thiago',
        email: 'thiago.gprudencio@gmail.com',
        passwordHash: '123456789',
    })
    return res.json(user)
});

export default routes;
