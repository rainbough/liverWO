Meteor.methods({
	"subscribeMailchimp": function(email) {
		var apiKey = "e9fd5b0cb4d88eb584905f36b65e13b7-us3";
		var listId = "f0f786db67";
		var apiEndPoint = apiKey.slice(-3); // Pull appropriate api endpoint datacenter from apiKey http://apidocs.mailchimp.com/api/rtfm/#api-endpoints
		var url = "http://"+ apiEndPoint +".api.mailchimp.com/1.3/?method=listSubscribe&apikey="+ apiKey +"&id="+ listId +"&email_address="+ encodeURIComponent(email) +"&output=json";
		//synchronous POST
		var result = HTTP.post(url, {timeout:30000});
		if(result.statusCode==200) {
			var respJson = JSON.parse(result.content);
			return respJson;
		} else {
			// TODO: Add better error handling
			//if(result.statusCode==502) {
			//  some stuff;
			//} else {
			//  some stuff;
			//}
			var errorJson = JSON.parse(result.content);
			throw new Meteor.Error(result.statusCode, errorJson.error);
		}
	}
});
