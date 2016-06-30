define("application", ["augmented", "augmentedPresentation"], function(Augmented) {
    "use strict";
    var app = new Augmented.Presentation.Application("AutomaticForm Example");
    app.registerStylesheet("https://fonts.googleapis.com/css?family=Roboto:100,300,400");
    app.start();
    return app;
});
