define("schema", [], function() {
    "use strict";
    var Schema = {
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
                "type" : "integer",
                "minimum": 1
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
return Schema;
});
