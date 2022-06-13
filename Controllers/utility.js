const isValidEmail = function (email) {
    const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(String(email).toLowerCase());
}

const isValidPassword = function (password) {
    const regexp = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;
    return regexp.test(password);
}

const isValidMobile = function (mobile) {
    const regexp = /^\d{10}$/;
    return regexp.test(mobile);
}
const isValidOtp = function (otp) {
    const regexp = /^\d{6}$/;
    return regexp.test(otp);
}
const isValidPin = function (pin) {
    const regexp = /^\d{4}$/;
    return regexp.test(pin);
}
const isValidName = function (name) {
    const regexp = /^[ A-Za-z0-9]*$/;

    return regexp.test(name);
}
const isValidUuid = function (uuid) {
    const regexp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    return regexp.test(uuid);
}

module.exports = {
    isValidEmail,
    isValidPassword,
    isValidMobile,
    isValidOtp,
    isValidPin,
    isValidName,
    isValidUuid
}