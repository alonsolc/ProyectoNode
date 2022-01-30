//const nanoid = require('nanoid');
//const auth = require('../auth');

const table = 'mdp_user';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(table);
    }

    function average() {
        return store.average(table);
    }

    function reportOne() {
        return store.reportOne(table);
    }

    function get(id) {
        return store.get(table, id);
    }

    function insert(body) {

        return store.insert(table, body);
    }

    function update(body, id) {

        return store.update(table, body, id);
    }

    return {
        list,
        average,
        reportOne,
        get,
        insert,
        update,
    };
}