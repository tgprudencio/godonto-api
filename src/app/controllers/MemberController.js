import * as Yup from 'yup';

import Specialization from "../models/Specialization";
import Member from "../models/Member";

class MemberController {
    async index(req, res) {
        const members = await Member.findAll({
            where: { deletedAt: null },
            attributes: ['id', 'name', 'email', 'specializationId'],
            include: [{
                model: Specialization,
                as: 'specialization',
                attributes: ['name']
            }]
        });

        return res.json(members);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required(),
            professionStartAt: Yup.date().required(),
            specializationId: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação.' });
        }

        const memberExists = await Member.findOne({ where: { email: req.body.email } });

        if (memberExists) {
            return res.status(400).json({ error: 'Email de membro já cadastrado.' });
        }

        const { id, name } = await Member.create(req.body);

        return res.json({ id, name });
    }

}

export default new MemberController();