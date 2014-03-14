Template.memberEdit.events({
	'submit form': function(e) {
		e.preventDefault();
		var currentMemberId = this._id;
		var memberProperties = {
			title: $(e.target).find('[name=title]').val(),
			prefix: $(e.target).find('[name=prefix]').val(),
			firstname: $(e.target).find('[name=firstname]').val(),
			lastname: $(e.target).find('[name=lastname]').val(),
			suffix: $(e.target).find('[name=suffix]').val(),
			institution1: $(e.target).find('[name=institution1]').val(),
			institution2: $(e.target).find('[name=institution2]').val(),
			institution3: $(e.target).find('[name=institution3]').val(),
			imageUrl: $(e.target).find('[name=image_url]').val(),
			labPhone: $(e.target).find('[name=phone]').val(),
			labName: $(e.target).find('[name=labName]').val(),
			labAddress1: $(e.target).find('[name=address1]').val(),
			labAddress2: $(e.target).find('[name=address2]').val(),
			city: $(e.target).find('[name=city]').val(),
			state: $(e.target).find('[name=state]').val(),
			zip: $(e.target).find('[name=zip]').val(),
			country: $(e.target).find('[name=country]').val()
		}

		Members.update(currentMemberId, {$set: memberProperties}, function(error) {
			if (error) {
				alert(error.reason);
			} else {
				Router.go('memberPage', {_id: currentMemberId});
			}
		});
		
	},
	'click .delete': function(e) {
		e.preventDefault();
		if(confirm("Delete this member?")) {
			var currentMemberId = this._id;
			Members.remove(currentMemberId);
			Router.go('membersList');
		}
	}
});

