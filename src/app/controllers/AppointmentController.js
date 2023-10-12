import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, subHours } from 'date-fns';
import User from '../models/User';
import Member from '../models/Member';
import File from '../models/File';
import Appointment from '../models/Appointment';
import Specialization from '../models/Specialization';


class AppointmentController {
    async index(req, res) {
        const { userId, page = 1 } = req.query;

        const appointments = await Appointment.findAll({
            where : { userId: userId, canceledAt: null },
            order: [ 'date' ],
            attributes: [ 'id', 'date', 'past', 'cancelable' ],
            limit: 20,
            offset: (page -1) * 20,
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: [ 'id', 'name' ],
                    include: [ 
                        {
                            model: File,
                            as: 'avatar',
                            attributes: [ 'id', 'path', 'url' ],
                        }
                    ]
                },
                {
                    model: Member,
                    as: 'member',
                    attributes: [ 'id', 'name' ],
                    include: [
                        {
                            model: Specialization,
                            as: 'specialization',
                            attributes: [ 'id', 'name' ]
                        }
                    ]
                },
            ]
        });

        return res.json(appointments);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            userId: Yup.number().required(),
            memberId: Yup.number().required(),
            date: Yup.date().required(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação.' });
        }

        const { userId, memberId, date } = req.body;
        
        // Checking past dates
        const hourStart = startOfHour(parseISO(date));
        if (isBefore(hourStart, new Date())) {
            return res.status(400).json({ error: 'Não é possível agendar uma consulta em uma data passada' });
        }

        // Check date availability
        const checkAvailability = await Appointment.findOne({
            where: {
                memberId,
                canceledAt: null,
                date: hourStart
            }
        })
        if (checkAvailability) {
            return res.status(400).json({ error: 'O horário escolhido já foi reservado.' });
        }
        
        const appointment = await Appointment.create({
            userId: userId,
            memberId: memberId,
            date: hourStart,
        });

        return res.json(appointment);
    }

    async delete(req, res) {
        const appointment = await Appointment.findByPk(req.params.id);
        if (appointment.userId != req.userId) {
            return res.status(401).json({ error: 'Você não possui permissão para cancelar este agendamento.' });
        }

        const dateWithSub = subHours(appointment.date, 2);
        if (isBefore(dateWithSub, new Date())) {
            return res.status(401).json({ error: 'Você só pode cancelar um agendamento com 2 horas de antecedência.' });
        }

        appointment.canceledAt = new Date();

        await appointment.save();

        return res.json(appointment);
    }

}

export default new AppointmentController();