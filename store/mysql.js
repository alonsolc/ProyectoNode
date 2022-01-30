const mysql = require('mysql');
const config = require('../config');

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    dateStrings:true,
};

let connection;

function handleCon() {
    connection = mysql.createConnection(dbconf);

    connection.connect((err) => {
        if (err) {
            console.error('[db err]', err);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB Connected!');
        }
    });

    connection.on('error', err => {
        console.error('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    })
}

handleCon();

function list(table) {
    return new Promise( (resolve, reject) => {
        const sql = `SELECT id_user, name, last_name, birthdate, TIMESTAMPDIFF(YEAR,birthdate,CURDATE()) age, date(creation_date) creation_date FROM ${table}`;
        connection.query(sql, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function average(table) {
    return new Promise( (resolve, reject) => {
        const sql = `SELECT AVG(TIMESTAMPDIFF(YEAR,birthdate,CURDATE())) average FROM ${table}`;
        connection.query(sql, (err, data) => {
            if (err) return reject(err);
            resolve(data[0]);
        })
    })
}

function reportOne(table) {
    return new Promise( (resolve, reject) => {
        const sql = `SELECT date(creation_date) name, COUNT(id_user) data FROM ${table} GROUP BY creation_date`;
        connection.query(sql, (err, data) => {
            if (err) return reject(err);
            // format
            for(var i = 0; i < data.length; i++) {
                data[i]['data'] = [data[i]['data']];
            }
            resolve(data);
        })
    })
}

function get(table, id) {
    return new Promise( (resolve, reject) => {
        const sql = `SELECT * FROM ${table} WHERE id_user=${id}`;
        connection.query(sql, (err, data) => {
            if (err) return reject(err);
            resolve(data[0]);
        });
    });
}

function insert(table, data) {
    return new Promise((resolve, reject) => {

        let errors = [];

        if(!data.name || data.name == '') {
            errors.push('Name is empty');
        }
        if(!data.last_name || data.last_name == '') {
            errors.push('Last Name is empty');
        }
        if(!data.birthdate || data.birthdate == '') {
            errors.push('Birthdate is empty');
        }

        if(Object.keys(errors).length) {
            reject(errors);
            return false;
        }

        const sql = `INSERT INTO ${table} (name, last_name, birthdate) VALUES ('${data.name}', '${data.last_name}', '${data.birthdate}')`;
        connection.query(sql, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

function update(table, data, id) {
    return new Promise((resolve, reject) => {

        let errors = [];

        if(!data.name || data.name == '') {
            errors.push('Name is empty');
        }
        if(!data.last_name || data.last_name == '') {
            errors.push('Last Name is empty');
        }
        if(!data.birthdate || data.birthdate == '') {
            errors.push('Birthdate is empty');
        }

        if(Object.keys(errors).length) {
            reject(errors);
            return false;
        }

        const sql = `UPDATE ${table} SET name='${data.name}', last_name='${data.last_name}', birthdate='${data.birthdate}' WHERE id_user=${id}`;
        connection.query(sql, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

module.exports = {
    list,
    average,
    reportOne,
    get,
    insert,
    update,
};