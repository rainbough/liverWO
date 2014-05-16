// This is the smtp credentials for the mandrill api

Meteor.startup(function () {
	process.env.MAIL_URL = 'smtp://app22908635@heroku.com:RNzB8KRvRP8KvqMKB-Uwwg@smtp.mandrillapp.com:587';
});
