// This is the smtp credentials for the mandrill api

Meteor.startup(function () {
	process.env.MAIL_URL = 'smtp://postmaster@app22908635.mailgun.org:699airpagst5@smtp.mailgun.org:587';
});
