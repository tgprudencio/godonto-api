import { startOfDay, endOfDay, parseISO } from "date-fns";
import { Op } from "sequelize";
import Appointment from "../models/Appointments";
import User from "../models/User";

class ScheduleController {
    async index(req, res) {
        const checkUserProvider = await User.findOne({
            where: { id: req.userId, provider: true },
        });

        if (!checkUserProvider) {
            return res.status(401).json({ error: 'Este usuário não possui permissão para acessar a agenda' });
        }

        const { date } = req.query;
        const parsedDate = parseISO(date);

        const appointments = await Appointment.findAll({
            where: {
                providerId: req.userId,
                canceledAt: null,
                date: {
                    [ Op.between ]: [ startOfDay(parsedDate), endOfDay(parsedDate) ],
                },
            },
            order: [ 'date' ],
        })
        return res.json(appointments);
    }
}

export default new ScheduleController();