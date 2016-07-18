//var users = new UserCollection();


$(document).ready(function(){
	//window.bbapp.users = new UserCollection();
	var UserListView =  Backbone.View.extend({
		model: window.bbapp.users,
		el: $('#table-body'),
		initialize : function(){
			var self= this;
			this.model.on('add', this.render, this);
			this.model.on('change', function(){
				setTimeout(function(){
					self.render();
				},30)
			}, this);
			this.model.on('remove', this.render, this);
			this.model.fetch({
				success: function(response){
					_.each(response.toJSON(), function(item){
						console.log(item._id);
					})
				},
				error: function(err){
					console.log("tried to GET but failed as" + err);
				}
			})
		},
		render : function(){
			var that = this;
			this.$el.html('');
			_.each(this.model.toArray(), function(u){
				that.$el.append((new UserView({model:u})).render().$el);
			});
			return this;
		}
	})
	window.bbapp.userview = new UserListView();
	
	
	$("#add-user").on('click',function(){
		var user = new UserModel({
			name: $('#name-input').val(),
			age: $('#age-input').val(),
			exp: $('#exp-input').val(),
			project: $('#project-input').val()
		});
		window.bbapp.users.add(user);
		window.bbapp.users.sort();
		$('#name-input').val("");
		$('#age-input').val("");
		$('#exp-input').val("");
		$('#project-input').val("");
		
		//saving to DB
		user.save(null,{
			success: function(response){
				console.log("saved with "+ response.toJSON()._id);
			},
			error: function(error){
				console.log("Failed to save because"+ error);
			}
		})
	});

	//var view = new UserView(user);
	//var view = new UserView({model:user});
})

// var Person = Backbone.Model.extend({
	// defaults: {
		// name: 'Guest User',
		// age: 23,
		// occupation: 'worker'
	// },

	// validate: function(attributes){
		// if ( attributes.age < 0 ){
			// return 'Age must be positive.';
		// }

		// if ( !attributes.name ){
			// return 'Every person must have a name.';
		// }
	// },

	// work: function(){
		// return this.get('name') + ' is working.';
	// }
// });



// var PersonView = Backbone.View.extend({
   // tagName: 'li',

   // initialize: function(){
     // this.render();
   // },

   // render: function(){
     // this.$el.html( this.model.get('name') + ' (' + this.model.get('age') + ') - ' + this.model.get('occupation') );
  // }
// });