import User from "../models/User";

class AlldatesController {
    async index(req, res) {
        const allDates = await User.findAll({
            order: [ 'id' ]
        });

        return res.json(allDates)
    }

}

export default new AlldatesController();