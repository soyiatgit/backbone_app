/* this file defines a user view using Backbone view class and 
UserModel as its model. */

var UserView =  Backbone.View.extend({
	tagName : 'tr',
	initialize : function(){
		var self = this;
		this.template = _.template($("#userTemplate").html());
		this.$el.bind('click', function(){
		alert('row clicked'+ self.model.toJSON().name);
		})
		this.render();
	},
	events:{
		'click .edit-button' : 'edit',
		'click .update-button' : 'update',
		'click .cancel-button' : 'cancel',
		'click .del-button' : 'delete'
	},
	cancel: function(){
		window.bbapp.userview.render();
	},
	//although delete is a keyword in JS, here it is used as a key in a key value pair. 
	//The JS interpretor never process the key , hence it can be used in such  cases.
	delete : function(){
		this.model.destroy({
			success: function(response){
				console.log("Deleted Successfully");
			},
			error: function(){
				console.log("Failed to Delete");
			}
		});
	},
	update: function(){
		this.model.set('name',$('.name-update').val());
		this.model.set('age',$('.age-update').val());
		this.model.set('exp',$('.exp-update').val());
		this.model.set('project',$('.project-update').val());
		//updating to DB
		this.model.save(null,{
			success: function(response){
				console.log("saved with "+ response.toJSON()._id);
			},
			error: function(error){
				console.log("Failed to save because"+ error);
			}
		})
	},
	edit: function(){
		this.$(".edit-button").hide();
		this.$(".del-button").hide();
		this.$(".update-button").show();
		this.$(".cancel-button").show();
		//keeping safe the previous values
		var name = this.$('.name').html();
		var age = this.$('.age').html();
		var exp = this.$('.exp').html();
		var project = this.$('.project').html();
		//replacing the table columns with input boxes
		this.$('.name').html("<input type='text' style='width:200px;' class='form-control name-update' value='" + name + "'/>");
		this.$('.age').html("<input type='text'  style='width:100px;' class='form-control age-update' value='" + age + "'/>");
		this.$('.exp').html("<input type='text'  style='width:120px;' class='form-control exp-update' value='" + exp + "'/>");
		this.$('.project').html("<input type='text' style='width:200px;' class='form-control project-update' value='" + project + "'/>");
	},
	render : function(){
		var that = this;
		//this.$el.html(this.model.get('name'));
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
})


