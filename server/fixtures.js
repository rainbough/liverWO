if (Members.find().count() === 0) {

	Members.insert({
		firstname: 'Tom',
		lastname: 'Coleman',
		institution1: 'meteor.com',
		email: 'tom@example.com'
	});	

	Members.insert({
		firstname: 'Rainbough',
		lastname: 'Phillips',
		institution1: 'Landes Bioscience'

	});
	Members.insert({
		firstname: 'Jane',
		lastname: 'Doe',
		institution1: 'Landes Bioscience'
	});

}

if (Meteor.users.find().count() === 0) {
	var users = [
		{name: "Normal User", email: 'normal@example.com', roles: []},
		{name:"Admin",email:"admin@700forscience.com",roles:['admin']}
	];

	_.each(users, function (user) {
		var id;
		id = Accounts.createUser({
			email: user.email,
			password: "700appletrees",
			profile: { name: user.name}
		});

		if (user.roles.length > 0) {
			Roles.addUsersToRoles(id, user.roles);
		}
	});

}
