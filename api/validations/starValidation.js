class starValidation {
  static async validateStarInput(req, res, next) {
    const {
      plain_orders_star_name,
      plain_orders_hidden_coordinates,
      plain_orders_hidden_id_constellation,
    } = req.body;

    switch (true) {
      case plain_orders_star_name === null ||
        plain_orders_star_name === undefined:
        return res.status(400).json({
          error: 'star names are required',
        });

      case plain_orders_hidden_coordinates === null ||
        plain_orders_hidden_coordinates === undefined:
        return res.status(400).json({
          error: 'coordinates row is required',
        });

      case plain_orders_hidden_id_constellation === null ||
        plain_orders_hidden_id_constellation === undefined:
        return res.status(400).json({
          error: 'Id constellation is required',
        });
    }
    next();
  }

  static async validateStarOrderId(req, res, next) {
    const { order_id } = req.params;

    switch (true) {
      case order_id === null || order_id === undefined:
        return res.status(400).json({
          error: 'star order id is required',
        });
    }
    next();
  }
}

export default starValidation;
