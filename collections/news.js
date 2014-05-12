// Allow admin to edit and remove news posts from admin page.

News.allow({
	update: adminUser,
	remove: adminUser
});