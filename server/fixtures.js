if (Members.find().count() === 0) {
	Members.insert({
		title: "A Member Title",
		name: 'Member Name',
		url: 'http://www.example.com'
	});

	Members.insert({
		title: 'Member Title or Affiliation',
		name: 'Tom Coleman',
		url: 'http://meteor.com'
	});

	Members.insert({
		title: 'Member Title or Affiliation',
		name: 'Tom Coleman',
		url: 'http://themeteorbook.com'
	});
}

