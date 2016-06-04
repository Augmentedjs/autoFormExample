require.config({
	"baseUrl": "scripts/",

    "paths": {
        //base libraries
		"jquery": "lib/jquery.min",
		"underscore": "lib/lodash.min",
		"backbone": "lib/backbone-min",
        "handlebars": "lib/handlebars.runtime.min",

        // hosted version
		"augmented": "/augmented/scripts/core/augmented",
        "augmentedPresentation": "/augmented/scripts/presentation/augmentedPresentation",

        // local version
		//"augmented": "lib/augmented",
        //"augmentedPresentation": "lib/augmentedPresentation"
	},
    "shim": {
    }
});

//  main app

require(["augmented", "augmentedPresentation"],
    function(Augmented, Presentation) {
    "use strict";
    var app = new Augmented.Presentation.Application("AutomaticForm Example");
    app.registerStylesheet("https://fonts.googleapis.com/css?family=Roboto:100,300,400");
    app.start();

    var schema = {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "title": "User",
        "description": "A list of users",
        "type": "object",
        "properties": {
            "Name" : {
                "description": "Name of the user",
                "type" : "string"
            },
            "ID" : {
                "description": "The unique identifier for a user",
                "type" : "integer"
            },
            "Email" : {
                "description": "The email of the user",
                "type" : "string",
                "format": "email"
            },
            "Role" : {
                "description": "The role of the user",
                "type": "string",
                "enum": ["Architect", "Developer", "Tech Lead", "Product Owner", "UX Designer", "QE", "Operations"]
            },
            "Active" : {
                "description": "Is the user Active",
                "type" : "boolean"
            }
        },
        "required": ["Name", "ID"]
    };

    var User = Augmented.Model.extend({
        defaults: {
            "Name": "",
            "ID": 0,
            "Email": "",
            "Role": "Developer",
            "Active": false
        }
    });

    var UserCollection = Augmented.Collection.extend({
        model: User
    });

    var MyMediator = Augmented.Presentation.Mediator.extend({
        el: "#mediator",
        init: function(options) {
            this.on("add", function() {
                //this.publish("userlist", "add", model);
                this.publish("form", "publishData");
            });

            this.on("reset", function() {
                //this.publish("userlist", "add", model);
                this.publish("form", "reset");
            });

            this.on("publishData", function(model) {
                this.publish("userlist", "add", model);
            });
        },
        render: function() {
        }
    });

    var MyForm = Augmented.Presentation.AutomaticForm.extend({
        el: "#main",
        schema: schema,
        init: function() {
            this.on("publishData", function() {
                this.sendMessage("publishData", this.model.toJSON());
            });

            this.on("reset", function() {
                this.reset();
            });
        }
    });

    var ControlPanel = Augmented.Presentation.DecoratorView.extend({
        name: "control",
        el: "#control",
        add: function() {
            this.sendMessage("add", "add");
        },
        reset: function() {
            this.sendMessage("reset", "reset");
        }
    });

    var UserList = Augmented.Presentation.Colleague.extend({
        el: "#users",
        init: function() {
            this.collection = new UserCollection();

            this.on("add", function(model) {
                this.addUser(model);
                this.render();
            });
        },
        render: function() {
            if (!this.collection.isEmpty()) {
                var i = 0, l = this.collection.length, el = Augmented.Presentation.Dom.selector("#users > #userList"), list;
                Augmented.Presentation.Dom.empty(el);
                for (i = 0; i < l; i++) {
                    list = Augmented.Presentation.Widget.DescriptionList(null, this.collection.at(i).toJSON());
                    el.appendChild(list);
                }
            }
        },
        addUser: function(model) {
            var user = new User(model);
            this.collection.add(user);
        }
    });

    var mediator = new MyMediator();
    var formView = new MyForm();
    var control = new ControlPanel();
    var userList = new UserList();

    formView.render();
    userList.render();

    mediator.observeColleagueAndTrigger(formView, "form");
    mediator.observeColleagueAndTrigger(control, "control");
    mediator.observeColleagueAndTrigger(userList, "userlist");
});
