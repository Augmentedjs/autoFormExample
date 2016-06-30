define("controlPanel", ["augmented", "augmentedPresentation"], function(Augmented) {
    "use strict";
    var ControlPanel = Augmented.Presentation.DecoratorView.extend({
        name: "control",
        el: "#control",
        add: function() {
            this.sendMessage("add", "add");
            this.reset();
        },
        reset: function() {
            this.sendMessage("reset", "reset");
        }
    });
    return ControlPanel;
});
