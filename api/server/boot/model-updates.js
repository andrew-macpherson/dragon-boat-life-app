module.exports = function(app) {

/// UPDATE ALL DATABASE TABLES TO DB
//// @todo: find way to automate this


	var updateModels = [
		'User','AccessToken','ACL','RoleMapping','Role','dbUser','team','teamMember','event','race'
	];

	app.dataSources.dragonBoatRoster.autoupdate(updateModels, function(err) {
	 	if (err) throw err;
	 });
};
