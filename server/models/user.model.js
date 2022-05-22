const mongoose = require ('mongoose');
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        maxlength: [12, "name must be 12 characters or less"]
    },
    score: {
        type: Number,
        required: [true, "score required"]
    },
    password: {
        type: String,
        required: [true, "password required"],
        minlength: [8, "password must be 8 characters or longer"],
    },
},
    { timestamps: true }
)

UserSchema.virtual('confirm')
    .get(() => this._confirm)
    .set(value => this._confirm = value);

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirm) {
        this.invalidate('confirm', 'Password must match confirm password');
    }
    next();
});

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

module.exports = mongoose.model('User', UserSchema)