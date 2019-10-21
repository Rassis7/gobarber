import Appointment from '../models/Appointment';
import User from '../models/User';
import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

class ScheduleController {
  async index({ userId, query }, res) {
    const checkUserProvider = await User.findOne({
      where: { id: userId, provider: true },
    });

    if (!checkUserProvider)
      return res.status(401).json({ error: 'User is not a provider' });

    const { date } = query;
    const parseDate = parseISO(date);
    const appointments = await Appointment.findAll({
      where: {
        provider_id: userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
        },
      },
      order: ['date'],
    });

    return res.json(appointments);
  }
}

export default new ScheduleController();
