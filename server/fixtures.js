if (Members.find().count() === 0) {

	Members.insert({
		firstname: 'Tom',
		lastname: 'Coleman',
		institution1: 'meteor.com',
		email: 'tom@example.com'
	});	

	Members.insert({
	  city: "Austin",
	  country: "USA",
	  email: "rainbough@landesbioscience.com",
	  firstname: "Rainbough",
	  imageUrl: "https://s3.amazonaws.com/blogimages.socialagency.com/1da053eb656bc204ca516e2a5fe5b4fc.png",
	  institution1: "Landes Bioscience",
	  institution2: "MakerSquare",
	  institution3: "",
	  labAddress1: "Rio Grande St.",
	  labAddress2: "",
	  labName: "Sublime",
	  labPhone: "(512) 450-8856",
	  lastname: "Phillips",
	  prefix: "Ms.",
	  state: "TX",
	  suffix: "LMT",
	  title: "Web Developer",
	  zip: "78681"
	});


	Members.insert({

	  city: "Austin",
	  country: "USA",
	  firstname: "Jane",
	  imageUrl: "http://cdn.superbwallpapers.com/wallpapers/animals/kitten-16219-1920x1080.jpg",
	  institution1: "Landes Bioscience",
	  institution2: "Breath and Balance Bodyworks",
	  institution3: "MakerSquare",
	  labAddress1: "112 Right Here Dr.",
	  labAddress2: "Unit 5",
	  labName: "Sublime Text Lab",
	  labPhone: "512-123-4567",
	  lastname: "Doe",
	  prefix: "Ms.",
	  state: "TX",
	  suffix: "PHD",
	  title: "assistant",
	  zip: "78681"
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
