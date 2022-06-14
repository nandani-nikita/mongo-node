const mongoose = require('mongoose');

const UserSch = mongoose.model('User');
const { hashPassword, comparePassword } = require('../Controllers/hashed');

const { generateToken } = require('../Controllers/jwt');

const { v4: uuidv4 } = require('uuid');

async function generateOtp() {
    const dateNow = new Date(Date.now());
    let otpData = {
        otp: Math.floor(100000 + Math.random() * 900000),
        createdAt: dateNow,
        validTill: new Date(dateNow.getTime() + 15 * 60000),
        isVerified: false

    }
    return otpData;
}
async function dummyFunctionEmailOtp(email) {
    return `Dummy function has sent otp on mail id: ${email} for password reset.`
}
async function dummyFunctionMobileOtp(mobile) {
    return `Dummy function has sent otp on mobile number: ${mobile}.`
}
async function userRegisterService(body) {
    try {
        const checkExistingUser = await UserSch.findOne({ $or: [{ email: body.email }, { mobile: body.mobile }] });
        console.log(checkExistingUser);
        if (!checkExistingUser) {
            const otpSchema = await generateOtp();
            const user = new UserSch({
                userId: uuidv4(),
                name: body.name,
                mobile: body.mobile,
                email: body.email,
                password: (await hashPassword(body.password)).toString(),
                referralCode: body.referral ? body.referral : null,
                otpData: otpSchema
            });
            const saveData = await user.save();
            return {
                msg: await dummyFunctionMobileOtp(body.mobile),
                userId: saveData.userId,
                name: saveData.name,
                email: saveData.email,
                mobile: saveData.mobile
            };



        } else {
            return { error: 'Email/Mobile Already Registered.' }
        }

    } catch (e) {
        console.log(`userRegisterService catch error : ${e}`);
        return { error: e.toString() }
    }
}
async function userLoginService(body) {
    try {
        const checkExistingUser = await UserSch.findOne({
            mobile: body.mobile
        });

        if (!checkExistingUser) {
            return { error: 'User NOT Registered' }
        }
        if(!checkExistingUser.otpData.isVerified) {
            return {error: 'Please Verify OTP'}
        }
        const password = await comparePassword(body.password, checkExistingUser.password)
        console.log(password);
        if (!password) {
            return { error: 'Wrong Password' }

        }
        var login = {
            loginId: checkExistingUser['_id'],
            loginName: checkExistingUser['name'],
            loginEmail: checkExistingUser['email']
        }

        const jwttoken = await generateToken(login);
        console.log('fevefvefvefsv');
        console.log(jwttoken);
        return {
            userId: checkExistingUser.userId,
            name: checkExistingUser.name,
            email: checkExistingUser.email,
            mobile: checkExistingUser.mobile,
            token: jwttoken
        }
    } catch (e) {
        console.log(`userLoginService catch error : ${e}`);
        return { error: e.toString() }
    }
}
async function userOtpVerifyService(body) {
    try {
        const dataToVerify = await UserSch.findOne({
            $and: [{ 'mobile': body.mobile }, { 'otpData.otp': body.otp }]

        }).lean();

        if (!dataToVerify) {
            return { error: 'Invalid OTP' }
        }
        console.log(dataToVerify);
        const checkOtpValid = dataToVerify.otpData.validTill > new Date(Date.now());
        if (!checkOtpValid) {
            return { error: 'OTP expired. Request Again.' }
        }
        const checkOtpVerified = dataToVerify.otpData.isVerified;
        let msg;
        if (!checkOtpVerified) {
            await UserSch.findOneAndUpdate({

                'mobile': body.mobile

            }, { $set: { 'otpData.isVerified': true } }, { new: true });
            msg = "OTP verified. User successfully registred."
        } else {
            msg = "OTP already verified. User is active. Please Login"
        }

        return {
            msg: msg,
            userId: dataToVerify.userId,
            name: dataToVerify.name,
            email: dataToVerify.email,
            mobile: dataToVerify.mobile
        }
    } catch (e) {
        console.log(`userOtpVerifyService catch error : ${e}`);
        return { error: e }
    }
}
async function userSetPinService(body) {
    try {
        const dataToVerify = await UserSch.findOne({
            mobile: body.mobile
        });

        if (!dataToVerify) {
            return { error: 'User doesn\'t exist.' }
        }

        await UserSch.findOneAndUpdate({ 'mobile': body.mobile }, { $set: { pin: body.pin } }, { new: true });


        return {
            userId: dataToVerify.userId,
            name: dataToVerify.name,
            email: dataToVerify.email,
            mobile: dataToVerify.mobile
        }
    } catch (e) {
        console.log(`userLoginService catch error : ${e}`);
        return { error: e.toString() }
    }
}
async function userResetPasswordReq(body) {
    try {
        const verifyUser = await UserSch.findOne({
            email: body.email
        });

        if (!verifyUser) {
            return { error: 'Email is not registered.' }
        }

        const dummyData =await  dummyFunctionEmailOtp(body.email);


        return {
            msg: dummyData,
            email: body.email,
        }
    } catch (e) {
        console.log(`userLoginService catch error : ${e}`);
        return { error: e.toString() }
    }
}
module.exports = {
    userRegisterService,
    userLoginService,
    userOtpVerifyService,
    userSetPinService,
    userResetPasswordReq
}