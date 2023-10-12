import Sequelize from "sequelize";
import User from '../app/models/User';
import File from "../app/models/File";
import Specialization from "../app/models/Specialization";
import Member from "../app/models/Member";
import Appointment from "../app/models/Appointment";
import Alldates from "../app/models/Alldates";

import databaseConfig from '../config/database';

const models = [User, File, Specialization, Member, Appointment, Alldates];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
        .map(model => model.init(this.connection))
        .map(model => model.associate && model.associate(this.connection.models));
    }
}

export default new Database();