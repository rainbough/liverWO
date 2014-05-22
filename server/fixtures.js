//This creates a few basic user accounts and a 3 members if none are present in the database at server start.

if (Members.find().count() === 0) {

	Members.insert({
		firstname: 'Tom',
		lastname: 'Coleman',
		email: 'tom@example.com',
		routeName: "TColeman"
	});	

	Members.insert({
		city: "Austin",
		country: "USA",
		email: "rainbough@landesbioscience.com",
		firstname: "Rainbough",
		imageUrl: "https://s3.amazonaws.com/blogimages.socialagency.com/1da053eb656bc204ca516e2a5fe5b4fc.png",
		labAddress1: "Rio Grande St.",
		labAddress2: "",
		labName: "Sublime",
		labPhone: "(512) 450-8856",
		lastname: "Phillips",
		prefix: "Ms.",
		state: "TX",
		suffix: "LMT",
		title: "Web Developer",
		zip: "78681",
		routeName: "RPhillips"
	});


	Members.insert({
		city: "Austin",
		country: "USA",
		firstname: "Jane",
		imageUrl: "http://cdn.superbwallpapers.com/wallpapers/animals/kitten-16219-1920x1080.jpg",
		labAddress1: "112 Right Here Dr.",
		labAddress2: "Unit 5",
		labName: "Sublime Text Lab",
		labPhone: "512-123-4567",
		lastname: "Doe",
		prefix: "Ms.",
		state: "TX",
		suffix: "PHD",
		title: "assistant",
		zip: "78681",
		routeName: "JDoe"
	});

}

if (Labs.find().count() === 0) {
	Labs.insert({
		labName: "ABCGroup"
	});
	Labs.insert({
		labName: "XYZGroup"
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
		var globalGroup = Roles.GLOBAL_GROUP;
		if (user.roles.length > 0) {
			if(user.name === "Admin"){
				Roles.addUsersToRoles(id, user.roles);
			} else{

				Roles.addUsersToRoles(id, user.roles);
			}
		}
	});

}

if (Feeds.find().count() === 0) {
	
	Feeds.insert({
		url: "http://www.ncbi.nlm.nih.gov/entrez/eutils/erss.cgi?rss_guid=161WTD0KV8_5VMFkfDDBQalNMSH8GP47V5Snqx6fv5LFoppwGI"
	});
}

if (News.find().count() === 0){
	News.insert({
		title: "Test News Item",
		content: "This is a test of our news items system. It uses some html <strong>Like This</strong>",
		imageUrl: "http://www.anokhimedia.com/imagefly/w650-h310-c/resources/media/images/blog_articles/big_news_fake_blog-01_5d6_650x310.jpg",
		routeName: "TestNewsItem"
	});
}

