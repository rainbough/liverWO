if (Members.find().count() === 0) {

	Members.insert({
		firstname: 'Tom',
		lastname: 'Coleman',
		organization: 'meteor.com'
	});	

	Members.insert({
		firstname: 'Rainbough',
		lastname: 'Phillips',
		organization: 'Landes Bioscience'
	});
	Members.insert({
		firstname: 'Jane',
		lastname: 'Doe',
		organization: 'Landes Bioscience'
	});

	
}

