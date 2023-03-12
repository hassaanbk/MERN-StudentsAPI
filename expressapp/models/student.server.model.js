const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    studentNumber:{
        type: String,
        default: '',
        trim: true,
        required: 'Student number cannot be blank'
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    phoneNumber: {
        type: String,
        match: [/^(\+?1 ?)?\(?([2-9][0-9]{2})\)?[-. ]?([2-9][0-9]{2})[-. ]?([0-9]{4})$/]
    },
    email: {
        type: String,
		// Validate the email format
		match: [/.+\@.+\..+/, "Please fill a valid email address"]
    },
    program: {
        type: String
    }
});
mongoose.model('Student', StudentSchema);
