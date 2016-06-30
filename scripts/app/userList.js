define("userList", ["augmented", "augmentedPresentation"], function(Augmented) {
    "use strict";

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
    return UserList;
});
