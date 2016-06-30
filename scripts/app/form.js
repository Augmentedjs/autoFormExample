define("form", ["augmented", "augmentedPresentation", "schema"], function(Augmented, P, Schema) {
    "use strict";
    var Form = Augmented.Presentation.AutomaticForm.extend({
        el: "#main",
        schema: Schema,
        init: function() {
            this.on("publishData", function() {
                this.sendMessage("publishData", this.model.toJSON());
            });

            this.on("reset", function() {
                this.reset();
            });
        }
    });
    return Form;
});
