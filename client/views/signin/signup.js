Template.memberSignUp.events({

    'submit form' : function(e){
        e.preventDefault();
        // retrieve the input field values
        var user = {
            email: $(e.target).find('[name=email]').val(),
            password: $(e.target).find('[name=password]').val(),
            password2: $(e.target).find('[name=password2]').val(),
            memberId: this._id
        }

        Meteor.call('user', user, function(error, id) { 
            // If validation passes, supply the appropriate fields to the
            // Meteor.loginWithPassword() function.
            var memberId = user.memberId;
            if (error) {
                throwError(error.reason);
            } else {
                Meteor.loginWithPassword(user.email, user.password);
                Router.go('memberPage', {_id: memberId});
            }

                
            
        });

    },

    'click #logout': function(){
        Meteor.logout();
    }
});

