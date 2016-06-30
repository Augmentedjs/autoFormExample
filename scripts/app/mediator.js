define("mediator", ["augmented", "augmentedPresentation"], function(Augmented) {
    "use strict";
    var Mediator = Augmented.Presentation.Mediator.extend({
        el: "#mediator",
        init: function(options) {
            this.on("add", function() {
                this.publish("form", "publishData");
            });

            this.on("reset", function() {
                this.publish("form", "reset");
            });

            this.on("publishData", function(model) {
                this.publish("userlist", "add", model);
            });
        },
        render: function() {
        }
    });
    return Mediator;
});
