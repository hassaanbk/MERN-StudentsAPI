const students = require('../controllers/students.server.controller');

module.exports = function(app) {
    app.route('/api/students')
        .get(students.list)
        .post(students.create);

    app.route('/api/students/:studentNumber')
        .get(students.read)
        .put(students.update)
        .delete(students.delete);

    app.param('studentNumber', students.studentByID);
}