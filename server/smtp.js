// This is the smtp credentials for the mandrill api

Meteor.startup(function () {
	process.env.MAIL_URL = 'smtp://app22908635@heroku.com:KyUC3p4TFFAKeDYnF-0p9Q@smtp.mandrillapp.com:587';
});