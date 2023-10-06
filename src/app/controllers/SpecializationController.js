import * as Yup from 'yup';
import Specialization from "../models/Specialization";

class SpecializationController {
    async index(req, res) {
        const specializations = await Specialization.findAll({
            where: { deletedAt: null },
            attributes: [ 'id', 'name' ],
        });

        return res.json(specializations);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação.' });
        }

        const specializationExists = await Specialization.findOne({ where: { name: req.body.name } });

        if (specializationExists) {
            return res.status(400).json({ error: 'Especialização já cadastrada.' });
        }

        const { id, name } = await Specialization.create(req.body);

        return res.json({ id, name });
    }

}

export default new SpecializationController();