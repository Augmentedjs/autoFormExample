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
        "description": "A User",
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
                "type" : "string"
            }
        },
        "required": ["ID", "Name"]
    };

    var MyForm = Augmented.Presentation.AutomaticForm.extend({
        el: "#main",
        schema: schema
    });

    var formView = new MyForm();
    formView.render();


});
