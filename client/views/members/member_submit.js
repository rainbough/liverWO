Template.memberNew.events({
	'submit form': function(e) {
		e.preventDefault();

		var member = {
			prefix: $(e.target).find('[name=prefix]').val(),
			firstname: $(e.target).find('[name=firstname]').val(),
			lastname: $(e.target).find('[name=lastname]').val(),
			suffix: $(e.target).find('[name=suffix]').val(),
			institution1: $(e.target).find('[name=institution1]').val(),
			institution2: $(e.target).find('[name=institution2]').val(),
			institution3: $(e.target).find('[name=institution3]').val()
		}

		member._id = Members.insert(member);
		Router.go('memberPage', member);
	}
});