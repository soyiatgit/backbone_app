/* this file defines a user collection using Backbone view class and 
UserModel as its model. */

	window.bbapp = window.bbapp || {};
	Backbone.Model.prototype.idAttribute = '_id';

var UserCollection =  Backbone.Collection.extend({
	url : 'http://localhost:4000/api/users',
	comparator: 'name'
	
});
window.bbapp.users = new UserCollection();


