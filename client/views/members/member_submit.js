Template.memberNew.events({
	'submit form': function(e) {
		e.preventDefault();

		var member = {
			username: $(e.target).find('[name=username]').val(),
			title: $(e.target).find('[name=title]').val(),
			prefix: $(e.target).find('[name=prefix]').val(),
			firstname: $(e.target).find('[name=firstname]').val(),
			lastname: $(e.target).find('[name=lastname]').val(),
			suffix: $(e.target).find('[name=suffix]').val(),
			institution1: $(e.target).find('[name=institution1]').val(),
			institution2: $(e.target).find('[name=institution2]').val(),
			institution3: $(e.target).find('[name=institution3]').val(),
			imageUrl: $(e.target).find('[name=image_url]').val(),
			email: $(e.target).find('[name=email]').val(),
			labPhone: $(e.target).find('[name=phone]').val(),
			labName: $(e.target).find('[name=labName]').val(),
			labAddress1: $(e.target).find('[name=address1]').val(),
			labAddress2: $(e.target).find('[name=address2]').val(),
			city: $(e.target).find('[name=city]').val(),
			state: $(e.target).find('[name=state]').val(),
			zip: $(e.target).find('[name=zip]').val(),
			country: $(e.target).find('[name=country]').val()
		}

		Meteor.call('member', member, function(error, id) { 
			if (error) {
				throwError(error.reason);
				
				if (error.error === 302)
					Router.go('memberPage', {_id: error.details})
			} else {
				Router.go('memberPage', {_id: id});
			}
		});
	}
});