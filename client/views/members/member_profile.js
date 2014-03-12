Template.memberProfile.helpers({ 
	url: function(){
		if (this.imageUrl === "")
			return false;
		else
			return true;
	}
});