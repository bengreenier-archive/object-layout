var objectLayout = function objectLayout (obj, schemaObj) {
    return baseCtor(obj, schemaObj);
}

objectLayout.append = function (obj, schemaObj) {
    // same as above but appends old objects afterward
    var result = baseCtor(obj, schemaObj);
    
    if (typeof(result) === "function") {
        return function (obj) {
            var res = result(obj);
            res = appendValues(res, obj);
            return res;
        };
    } else {
        result = appendValues(result, obj);        
    }
    
    return result;
}

module.exports = exports = objectLayout;

function baseCtor (obj, schemaObj) {
    if (typeof(obj) === "undefined") {
        throw new TypeError("obj must be an object");
    }
    if (typeof(obj) !== "object") {
        throw new TypeError("obj must be an object");
    }
    if (typeof(schemaObj) === "undefined" && typeof(obj) === "object") {
        return createObjectLayoutFunc(obj);
    }
    if (typeof(schemaObj) !== "object") {
        throw new TypeError("schemaObj must be an object");
    }
    return layout(obj, schemaObj);
}

function createObjectLayoutFunc (schemaObj) {
    return function (obj) {
        if (typeof(obj) !== "object") {
            throw new TypeError("obj must be an object");
        }
        return layout(obj, schemaObj);
    };
}

function layout(obj, schemaObj) {
    var newObj = {};
    for (var prop in schemaObj) {
        if (typeof(schemaObj[prop]) === "object" && typeof(obj[prop]) === "object") {
            newObj[prop] = layout(obj[prop], schemaObj[prop]);
        } else {
            newObj[prop] = obj[prop];
        }
    }
    return newObj;
}

function appendValues(result, obj) {
    for (var prop in obj) {
        if (typeof(result[prop]) === "undefined") {
            result[prop] = obj[prop];
        }
    }
    
    return result;
}