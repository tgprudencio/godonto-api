import Sequelize, { Model } from "sequelize";

class Alldates extends Model {
    static init (sequelize) {
        super.init(
            {
                name: Sequelize.DATE,
            },
            {
                sequelize,
            }
        );

        return this;
    }
}

export default Alldates;
