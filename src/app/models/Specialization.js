import Sequelize, { Model } from "sequelize";

class Specialization extends Model {
    static init (sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                deletedAt: Sequelize.DATE,
            },
            {
                sequelize,
            }
        );

        return this;
    }
}

export default Specialization;
