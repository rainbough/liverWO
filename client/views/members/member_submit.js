Template.memberNew.events({
	'submit form': function(e) {
		e.preventDefault();

		var member = {
			firstname: $(e.target).find('[name=firstname]').val(),
			lastname: $(e.target).find('[name=lastname]').val(),
			organization: $(e.target).find('[name=organization]').val()
		}

		member._id = Members.insert(member);
		Router.go('memberPage', member);
	}
});