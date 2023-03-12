const mongoose = require("mongoose");
const Student = mongoose.model("Student");

function getErrorMessage(err) {
  if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return "Unknown server error";
  }
}

exports.create = function (req, res) {
  const student = new Student();
  student.studentNumber = req.body.studentNumber;
  student.firstName = req.body.firstName;
  student.lastName = req.body.lastName;
  student.address = req.body.address;
  student.city = req.body.city;
  student.phoneNumber = req.body.phoneNumber;
  student.email = req.body.email;
  student.program = req.body.program;

  console.log(req.body);
  student.save()
    .then(() => {
      res.status(200).json(student);
    })
    .catch (err => {
        console.log("error", getErrorMessage(err));
        return res.status(400).send({
            message: getErrorMessage(err)
        });
    });
};

exports.list = function (req, res) {
  Student.find()
    // .populate(
    //   "studentNumber",
    //   "firstName",
    //   "lastName",
    //   "address",
    //   "city",
    //   "phoneNumber",
    //   "email",
    //   "program"
    // )
    .then((student) => {
        res.status(200).json(student);
    })
    .catch((err) => {
        return res.status(400).send({
            message: getErrorMessage(err)
        })
    })
};

exports.studentByID = function (req, res, next, id) {
  Student.findById(id)
    .populate(
      "studentNumber",
      "firstName",
      "lastName",
      "email",
      "address",
      "city",
      "phoneNumber",
      "program"
    )
    .then((student) => {
      if (!student) return next(new Error("Failed to find student " + id));
      req.student = student;
      console.log("studentByID: ", req.student);
      next();
    })
    .catch(error => { next(error)})
};

exports.read = function (req, res) {
  res.status(200).json(req.student);
};

exports.update = function (req, res) {
  console.log("in update: ", req.student);
  const student = req.student;
  student.studentNumber = req.body.studentNumber;
  student.firstName = req.body.firstName;
  student.lastName = req.body.lastName;
  student.address = req.body.address;
  student.city = req.body.city;
  student.phoneNumber = req.body.phoneNumber;
  student.email = req.body.email;
  student.program = req.body.program;
  student.save()
    .then(() => {
      res.status(200).json(student);
    })
    .catch (err => {
        console.log("error", getErrorMessage(err));
        return res.status(400).send({
            message: getErrorMessage(err)
        });
    });
};

exports.delete = function (req, res) {
  const student = req.student;
  student.remove((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err),
      });
    } else {
      res.status(200).json(student);
    }
  });
};
