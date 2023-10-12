import Alldates from "../models/Alldates";

class AlldatesController {
    async index(req, res) {
        const dates = await Alldates.findAll({
            attributes: [ 'id', 'name' ],
            order: [ 'id' ]
        });     

        return res.json(dates);
    }

}

export default new AlldatesController();