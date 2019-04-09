const { to, ReE, ReS } = require('../services/utilities/jsend');

const Dashboard = function (req, res) {
	let user = req.user.id;

	return ReS(res, user);
}
module.exports.Dashboard = Dashboard