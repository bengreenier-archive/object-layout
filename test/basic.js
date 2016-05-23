var assert = require('assert');

var objectLayout = require('../');

describe('objectLayout', function () {
    it("should fail if given non-objects", function () {
        assert.throws(function () {
            objectLayout(1);
        }, /obj must be an object/);
        assert.throws(function () {
            objectLayout(1,1);
        }, /obj must be an object/);
        assert.throws(function () {
            objectLayout({},1);
        }, /schemaObj must be an object/);
    });
    
    it("should create layout functions", function () {
        assert.equal(typeof(objectLayout({one: true})), "function");
    });
    
    it("should layout a basic object", function () {
        var basicObj = {
            one: 1,
            three: 3,
            five: 5,
            four: 4,
            two: 2
        };
        
        assertDeepLayout(objectLayout(basicObj, {
            one: true,
            two: true,
            three: true,
            four: true,
            five: true
        }), {
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5
        });
    });
    
    it("should layout a complex object", function () {
        var basicObj = {
            one: 1,
            three: {
                "point-7-5": 1,
                "point-5": true,
                "point-2-5": "hello"
            },
            five: 5,
            four: 4,
            two: 2
        };
        
        assertDeepLayout(objectLayout(basicObj, {
            one: true,
            two: true,
            three: {
                "point-2-5": true,
                "point-5": true,
                "point-7-5": true
            },
            four: true,
            five: true
        }), {
            one: 1,
            two: 2,
            three: {
                "point-2-5": "hello",
                "point-5": true,
                "point-7-5": 1
            },
            four: 4,
            five: 5
        });
    });
    
    it("should copy-as-is (not layout) inner objects", function () {
        var basicObj = {
            one: 1,
            three: {
                "point-7-5": 1,
                "point-5": true,
                "point-2-5": "hello"
            },
            five: 5,
            four: 4,
            two: 2
        };
        
        assertDeepLayout(objectLayout(basicObj, {
            one: true,
            two: true,
            three: true,
            four: true,
            five: true
        }), {
            one: 1,
            two: 2,
            three: {
                "point-2-5": "hello",
                "point-5": true,
                "point-7-5": 1
            },
            four: 4,
            five: 5
        });
    });
    
    it("should ignore unmentioned properties by default", function () {
        var basicObj = {
            one: 1,
            three: {
                "point-7-5": 1,
                "point-5": true,
                "point-2-5": "hello"
            },
            five: 5,
            four: 4,
            two: 2
        };
        
        assertDeepLayout(objectLayout(basicObj, {
            one: true,
            two: true,
            four: true,
            five: true
        }), {
            one: 1,
            two: 2,
            four: 4,
            five: 5
        });
    });
    
    it("should add unmentioned properties last if configured to", function () {
        var basicObj = {
            one: 1,
            three: {
                "point-7-5": 1,
                "point-5": true,
                "point-2-5": "hello"
            },
            five: 5,
            four: 4,
            two: 2
        };
        
        assertDeepLayout(objectLayout.append(basicObj, {
            one: true,
            two: true,
            four: true,
            five: true
        }), {
            one: 1,
            two: 2,
            four: 4,
            five: 5,
            three: {
                "point-7-5": 1,
                "point-5": true,
                "point-2-5": "hello"
            }
        });
    });
    
    it("should work fine with layout functions", function () {
        var basicObj = {
            one: 1,
            three: {
                "point-7-5": 1,
                "point-5": true,
                "point-2-5": "hello"
            },
            five: 5,
            four: 4,
            two: 2
        };
        
        assertDeepLayout(objectLayout.append({
            one: true,
            two: true,
            four: true,
            five: true
        })(basicObj), {
            one: 1,
            two: 2,
            four: 4,
            five: 5,
            three: {
                "point-7-5": 1,
                "point-5": true,
                "point-2-5": "hello"
            }
        });
    });
});


// ensure not only deep equality
// but that common iterator patterns
// line up
function assertDeepLayout(obj1, obj2) {
    assert.deepEqual(obj1, obj2);
    
    var counter = 0;
    for (var prop1 in obj1) {
        var innerCount = 0;
        for (var prop2 in obj2) {
            if (counter === innerCount) {
                assert.equal(prop1, prop2);
            }
            innerCount++;
        }
        counter++;
    }
    
    var counter2 = 0;
    Object.keys(obj1).forEach(function (prop1) {
        var innerCount2 = 0;
        Object.keys(obj2).forEach(function (prop2) {
            if (counter2 === innerCount2) {
                assert.equal(prop1, prop2);
            }
            innerCount2++;
        });
        counter2++;
    });
}