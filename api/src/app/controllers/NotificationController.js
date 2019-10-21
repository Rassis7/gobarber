import User from '../models/User';
import Notification from '../schemas/Notification';

class NotificationController {
  async index({ userId }, res) {
    const checkIsProvider = await User.findOne({
      where: { id: userId, provider: true },
    });

    if (!checkIsProvider)
      return res
        .status(401)
        .json({ error: 'Only provider can load notifications' });

    const notifications = await Notification.find({
      user: userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update({ params }, res) {
    const notification = await Notification.findByIdAndUpdate(
      params.id,
      { read: true },
      { new: true },
    );

    res.json(notification);
  }
}

export default new NotificationController();
