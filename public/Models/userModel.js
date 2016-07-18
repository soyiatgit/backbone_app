/* this file defines a user model using the 
Backbone model methods*/

var UserModel = Backbone.Model.extend({
	defaults:{
		name:"",
		age:"",
		project:"",
		exp:""
	}
})