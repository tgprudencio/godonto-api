import User from '../models/User';
import * as Yup from 'yup';

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação.' });
        }

        const userExists = await User.findOne({ where: { email: req.body.email } });

        if (userExists) {
            return res.status(400).json({ error: 'Email já cadastrado.' });
        }

        const { id, name, email, provider } = await User.create(req.body);
        return res.json({ id, name, email, provider });
    }

    async update (req,res) {
        console.log(req.body)
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string(),
            password: Yup.string(),
            confirmPassword: Yup.string(),
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação.' });
        }

        const { email, oldPassword, password, confirmPassword } = req.body;

        const user = await User.findByPk(req.userId);

        if (email && email != user.email) {
            const userExists = await User.findOne({ where: { email } });

            if (userExists) {
                return res.status(400).json({ error: 'Usuário já cadastrado.' });
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Senha incorreta.' });
        }

        if (password && password != confirmPassword) {
            return res.status(401).json({ error: 'Nova senha incorreta.' });
        }
        
        const { id, name, provider } = await user.update(req.body);

        return res.json({ id, name, email, provider });
    }
}



export default new UserController();