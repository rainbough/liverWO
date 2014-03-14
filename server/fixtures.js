if (Members.find().count() === 0) {

	Members.insert({
		firstname: 'Tom',
		lastname: 'Coleman',
		institution1: 'meteor.com'
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

