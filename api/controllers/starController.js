import models from '../models';

const {
  stars
} = models;

class starController {
  static async createStar(req, res) {
    const {
      plain_orders_star_name,
      plain_orders_hidden_coordinates,
      plain_orders_hidden_id_constellation,
    } = req.body;
    try {
      const checkStarName = await stars.findOne({
        where: {
          plain_orders_star_name
        },
      });
      const checkStarCoordinates = await stars.findOne({
        where: {
          plain_orders_hidden_coordinates
        },
      });
      const checkStarIdConstellation = await stars.findOne({
        where: {
          plain_orders_hidden_id_constellation
        },
      });

      if (checkStarName) {
        return res.status(400).json({
          error: 'this star name  already Exist',
        });
      } if (checkStarCoordinates) {
        return res.status(400).json({
          error: 'this Coordinates already Exist',
        });
      } if (checkStarIdConstellation) {
        return res.status(400).json({
          error: 'this Start Id Constellation already Exist',
        });
      }
      const newStar = await stars.create({
        plain_orders_star_name,
        plain_orders_hidden_coordinates,
        plain_orders_hidden_id_constellation,
      });
      if (newStar) {
        return res.status(200).json({
          star: newStar,
          message: ' star successful created',
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: 'Failed to create a star'
      });
    }
  }

  static async updateStar(req, res) {
    const {
      plain_orders_star_name,
      plain_orders_hidden_coordinates,
      plain_orders_hidden_id_constellation,
    } = req.body;
    const {
      order_id
    } = req.params;

    try {
      const checkOrderId = await stars.findOne({
        where: {
          order_id
        },
      });

      if (!checkOrderId) {
        return res.status(404).json({
          error: 'this order id not found',
        });
      }
      const updatingStar = await stars.update(
        {
          plain_orders_star_name,
          plain_orders_hidden_coordinates,
          plain_orders_hidden_id_constellation,
        },
        {
          where: {
            order_id,
          },
        }
      );
      if (!updatingStar) {
        return res.status(404).json({
          error: 'Failed to update star',
        });
      }
      return res.status(200).json({
        message: 'star updated successful',
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Failed to update star'
      });
    }
  }

  static async allStars(req, res) {
    try {
      const allstars = await stars.findAll();
      if (!allstars) {
        return res.status(404).json({
          error: 'No Star found',
        });
      }
      return res.status(200).json({
        allstars,
        message: 'Get stars successful ',
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Failed to get stars'
      });
    }
  }

  static async deleteStar(req, res) {
    const {
      order_id
    } = req.params;
    try {
      const deletingStar = await stars.destroy({
        where: {
          order_id,
        },
      });
      if (!deletingStar) {
        return res.status(404).json({
          error: 'This star is not found',
        });
      }
      return res.status(204).send('');
    } catch (error) {
      return res.status(500).json({
        error: 'Failed to delete star'
      });
    }
  }
}

export default starController;
