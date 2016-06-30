require.config({
	"baseUrl": "scripts/",

    "paths": {
        //base libraries
		"jquery": "lib/jquery.min",
		"underscore": "lib/lodash.min",
		"backbone": "lib/backbone-min",

        // hosted version
		//"augmented": "/augmented/scripts/core/augmented",
        //"augmentedPresentation": "/augmented/scripts/presentation/augmentedPresentation",

        // local version
		"augmented": "lib/augmented",
        "augmentedPresentation": "lib/augmentedPresentation",

        "application": "app/application",
        "mediator": "app/mediator",
        "controlPanel": "app/controlPanel",
        "userList": "app/userList",
        "form": "app/form",
        "schema": "app/schema"
	},
    "shim": {
    }
});

//  main app

require(["augmented", "augmentedPresentation", "application", "mediator", "controlPanel", "userList", "form"],
    function(Augmented, Presentation, App, Mediator, ControlPanel, UserList, Form) {

    var mediator = new Mediator();
    var formView = new Form();
    var control = new ControlPanel();
    var userList = new UserList();

    formView.render();
    userList.render();

    mediator.observeColleagueAndTrigger(formView, "form");
    mediator.observeColleagueAndTrigger(control, "control");
    mediator.observeColleagueAndTrigger(userList, "userlist");
});
