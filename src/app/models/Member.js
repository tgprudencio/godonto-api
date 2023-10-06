import Sequelize, { Model } from "sequelize";

class Member extends Model {
    static init (sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                professionStartAt: Sequelize.DATE,
                deletedAt: Sequelize.DATE,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Specialization, { foreignKey: 'specializationId', as: 'specialization' });
    }
}

export default Member;
