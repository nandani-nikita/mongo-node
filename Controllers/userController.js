
const mongoose = require('mongoose');

const UserSch = mongoose.model('User');

const allDetails = async (req, res) => {
    try {
        const resp = await UserSch.aggregate([
            {
                $lookup:
                {
                    from: 'teamData',
                    localField: 'email',
                    foreignField: 'email',
                    as: 'team_details'
                }
            },
            {
                "$unwind": "$team_details"
            },
            {
                $project: {
                    'team_details.full_name': 0,
                    'team_details._id': 0,
                    'team_details.email': 0
                }
            }

        ])
        return res.status(200).json(resp)
    } catch (error) {
        console.log(error);
        res.status(406).json(error)
    }
};

module.exports = {
    allDetails
}
