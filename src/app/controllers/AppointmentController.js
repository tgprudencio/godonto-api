import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import User from '../models/User';
import Appointment from '../models/Appointments';


class AppointmentController {
    async store(req, res) {
        const schema = Yup.object().shape({
            providerId: Yup.number().required(),
            date: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação.' });
        }

        const { providerId, date } = req.body;

        // check if providerId is provider

        const isProvider = await User.findOne({
            where: { id: providerId, provider: true },
        });

        if (!isProvider) {
            return res.status(401).json({ error: 'Você apenas pode agendar uma consulta com profissionais da clínica' })
        }

        console.log(date);
        // Checking past dates
        const hourStart = startOfHour(parseISO(date));

        if (isBefore(hourStart, new Date())) {
            return res.status(400).json({ error: 'Não é possível agendar uma consulta em uma data passada' });
        }

        // Check date availability
        console.log(providerId, hourStart);
        const checkAvailability = await Appointment.findOne({
            where: {
                providerId,
                canceledAt: null,
                date: hourStart
            }
        })

        if (checkAvailability) {
            return res.status(400).json({ error: 'O horário escolhido já foi reservado.' });
        }

        const appointment = await Appointment.create({
            userId: req.userId,
            providerId,
            date: hourStart,
        })

        return res.json(appointment);
    }
}

export default new AppointmentController();