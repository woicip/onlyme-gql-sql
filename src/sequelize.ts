import { Sequelize, DataTypes } from 'sequelize';
import { username, password, host, port, database } from './configs/sql.config.json';

const sequelize = new Sequelize(`mysql://${username}:${password}@${host}:${port}/${database}`);

const users = sequelize.define('users', {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    verified: { type: DataTypes.BOOLEAN, allowNull: false },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.TEXT, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false },
    fullname: DataTypes.STRING,
    bio: DataTypes.TEXT,
    avatar: DataTypes.TEXT
}, { timestamps: false });

const messages = sequelize.define('messages', {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    user_id: { type: DataTypes.STRING, allowNull: false },
    sender: DataTypes.STRING,
    message: DataTypes.TEXT,
    postedAt: DataTypes.TIME
}, { timestamps: false });

const comments = sequelize.define('comments', {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    message_id: { type: DataTypes.STRING, allowNull: false },
    author: DataTypes.BOOLEAN,
    message: DataTypes.TEXT,
    postedAt: DataTypes.TIME
}, { timestamps: false });

try {
    (async function(){
        await sequelize.authenticate();
        console.log('⚡ MYSQL CONNECTED');
    })();

} catch(err){
    console.log(err);
}

export { sequelize, users };