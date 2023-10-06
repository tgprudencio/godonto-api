import { startOfDay, endOfDay, parseISO } from "date-fns";
import { Op } from "sequelize";
import Appointment from "../models/Appointment";
import User from "../models/User";
import Member from "../models/Member";
import Specialization from "../models/Specialization";

class ScheduleController {
    async index(req, res) {
        const checkUserProvider = await User.findOne({
            where: { id: req.userId, provider: true },
        });

        if (!checkUserProvider) {
            return res.status(401).json({ error: 'Este usuário não possui permissão para acessar a agenda' });
        }

        const { date, userId } = req.query;
        const parsedDate = parseISO(date);
        const appointments = await Appointment.findAll({
            where: {
                userId: userId,
                canceledAt: null,
                date: {
                    [ Op.between ]: [ startOfDay(parsedDate), endOfDay(parsedDate) ],
                },
            },
            order: [ 'date' ],
            attributes: [ 'id', 'date', 'past', 'cancelable' ],
            include: [
                {
                    model: Member,
                    as: 'member',
                    attributes: [ 'id', 'name' ],
                    include: [{
                        model: Specialization,
                        as: 'specialization',
                        attributes: [ 'id', 'name' ]
                    }]
                },
                {
                    model: Member,
                    as: 'member',
                    attributes: [ 'id', 'name' ],
                },
            ],
        })
        return res.json(appointments);
    }
}

export default new ScheduleController();