const { verifyToken } = require('./jwt');
const utility = require('./utility');

const userService = require('../Services/userService');
const register = async (req, res) => {
    try {

        console.log('Register User Api');
        if (!(req.body.name && req.body.mobile && req.body.email && req.body.password)) {
            return res.status(406).json({
                error: "Invalid Input. Fields required: name, email, password, mobile"
            });
        }


        let checkValidName = utility.isValidName(req.body.name);
        if (!checkValidName) {
            return res.status(406).json({
                error: "Invalid Name String"
            });
        }
        let checkValidMobile = utility.isValidMobile(req.body.mobile);
        if (!checkValidMobile) {
            return res.status(406).json({
                error: "Invalid Mobile Number"
            });
        }

        let checkValidEmail = utility.isValidEmail(req.body.email);
        if (!checkValidEmail) {
            return res.status(406).json({
                error: "Invalid Email Format"
            });
        }
        let checkValidPassword = utility.isValidPassword(req.body.password);
        if (!checkValidPassword) {
            return res.status(406).json({
                error: "Password length is minimum 8 characters and maximum 12 characters. Passowrd must contain at least one uppercase letter, one lowercase letter, one number and one special character; special characters allowed: !@#$%^&*"
            });
        }


        let user = await userService.userRegisterService(req.body);
        if ('error' in user) {
            return res.status(406).json({ error: user.error.toString() })
        }

        res.status(200).json({
            msg: 'User Enrolled. Please Verify OTP.',
            userId: user.userId,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
        });

    } catch (error) {
        console.log(error);
        res.status(406).json(error);
    }

};

const login = async (req, res) => {
    try {
        if (!(req.body.mobile && req.body.password)) {
            return res.status(406).json({
                error: "Invalid Input. Fields required: mobile, password"
            });
        }

        let checkValidMobile = utility.isValidMobile(req.body.mobile);
        if (!checkValidMobile) {
            return res.status(406).json({
                error: "Invalid Mobile Number"
            });
        }
        let checkValidPassword = utility.isValidPassword(req.body.password);
        if (!checkValidPassword) {
            return res.status(406).json({
                error: "Password length is minimum 8 characters and maximum 12 characters. Passowrd must contain at least one uppercase letter, one lowercase letter, one number and one special character; special characters allowed: !@#$%^&*"
            });
        }
        let loggedInUser = await userService.userLoginService(req.body);

        if ('error' in loggedInUser) {
            return res.status(406).json({ error: loggedInUser.error.toString() })
        }

        res.status(200).json({
            userId: loggedInUser.userId,
            name: loggedInUser.name,
            email: loggedInUser.email,
            mobile: loggedInUser.mobile,
            token: loggedInUser.token
        });

    } catch (error) {
        console.log(error);
        res.status(406).json(error)
    }

};


const verifyOtp = async (req, res) => {
    try {
        if (!(req.body.otp && req.body.mobile)) {
            return res.status(406).json({
                error: "Invalid Input. Fields required: OTP"
            });
        }
        let checkValidMobile = utility.isValidMobile(req.body.mobile);
        if (!checkValidMobile) {
            return res.status(406).json({
                error: "Invalid Mobile Number"
            });
        }
        let checkValidOtp = utility.isValidOtp(req.body.otp);
        if (!checkValidOtp) {
            return res.status(406).json({
                error: "Invalid Input"
            });
        }

        let verifyOtp = await userService.userOtpVerifyService(req.body);

        if ('error' in verifyOtp) {
            return res.status(406).json({ error: verifyOtp.error.toString() })
        }

        res.status(200).json({
            msg: verifyOtp.msg,
            id: verifyOtp.id,
            name: verifyOtp.name,
            email: verifyOtp.email,
            mobile: verifyOtp.mobile
        });

    } catch (error) {
        console.log(error);
        res.status(406).json(error)
    }

};

const setPin = async (req, res) => {

    try {
        const userVerify = await verifyToken(req.headers["authorization"]);
        if (!userVerify) {
            return res.status(406).json({
                error: `Authentication Failed.`
            })
        }
        if (!(req.body.pin && req.body.mobile)) {
            return res.status(406).json({
                error: "Invalid Input. Fields required: PIN, Mobile"
            });
        }
        let checkValidMobile = utility.isValidMobile(req.body.mobile);
        if (!checkValidMobile) {
            return res.status(406).json({
                error: "Invalid Mobile Number"
            });
        }
        let checkValidPin = utility.isValidPin(req.body.pin);
        if (!checkValidPin) {
            return res.status(406).json({
                error: "Invalid Pin. PIN should be a 4 digit number."
            });
        }

        let setPin = await userService.userSetPinService(req.body);

        if ('error' in setPin) {
            return res.status(406).json({ error: user.error.toString() })
        }

        res.status(200).json({
            msg: 'PIN set successfully.',
            userId: setPin.userId,
            name: setPin.name,
            email: setPin.email,
            mobile: setPin.mobile
        });

    } catch (error) {
        console.log(error);
        res.status(406).json(error)
    }

};

const resetPasswordRequest = async (req, res) => {
    try {
        if (!(req.body.email)) {
            return res.status(406).json({
                error: "Invalid Input. Fields required: Email"
            });
        }
        let checkValidEmail = utility.isValidEmail(req.body.email);
        if (!checkValidEmail) {
            return res.status(406).json({
                error: "Invalid Email Format"
            });
        }


        let resetPassword = await userService.userResetPasswordReq(req.body);

        if ('error' in resetPassword) {
            return res.status(406).json({ error: resetPassword.error.toString() })
        }

        res.status(200).json({
            msg: resetPassword.msg,
            email: resetPassword.email,
            status: true
        });

    } catch (error) {
        console.log(error);
        res.status(406).json(error)
    }

};
module.exports = {
    register,
    login,
    verifyOtp,
    setPin,
    resetPasswordRequest
}
