import { Router } from 'express';
const router = Router();
import { City, User } from '../models/model.js';
/*@ Create two documents [user , city] user as parent and city as chiled*/
router.route('/user').post(async (req, res) => {
  let { name, age, city, country } = req.body;
  try {
    const savedCity = await City.create({ name: city, country });
    city = savedCity._id.toString();
    console.log(name, age, city);
    const user = await User.create({ name, age, city });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});
/*@  return user and city documents joined*/
router.route('/users').get(async (req, res) => {
  try {
    const users = await User.find().populate('city');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});


/*@ sort users according to their countries using aggregation pipeline and return*/
router.route('/filteredData').get(async (req, res) => {
  try {
    const data = await User.aggregate([
      {
        $lookup: {
          from: 'cities',
          localField: 'city',
          foreignField: '_id',
          as: 'cityData'
        }
      },
      {
        $group: {
          _id: '$cityData.country',
          users: { $push: '$$ROOT' }
        }
      }
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve aggregated data' });
  }
});

export default router;
