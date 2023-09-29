function isArray(collection) {
    return Array.isArray(collection);
}

function myEach(collection, callback) {
    if (isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
            callback(collection[i], i);
        }
    } else {
        for (const key in collection) {
            if (collection.hasOwnProperty(key)) {
                callback(collection[key], key);
            }
        }
    }
    return collection;
}

function myMap(collection, callback) {
    if (isArray(collection)) {
        const result = [];
        myEach(collection, (value) => {
            result.push(callback(value));
        });
        return result;
    } else {
        const result = {};
        myEach(collection, (value, key) => {
            result[key] = callback(value, key);
        });

        // Convert object values to an array
        const arrayResult = Object.values(result);

        return arrayResult;
    }
}






function myReduce(collection, callback, acc) {
    let initAcc = acc;
    myEach(collection, (value, key) => {
        if (initAcc === undefined) {
            initAcc = value;
        } else {
            initAcc = callback(initAcc, value, key, collection);
        }
    });
    return initAcc;
}

function myFind(collection, predicate) {
    let result;
    let found = false;
    myEach(collection, (value, key) => {
        if (!found && predicate(value, key)) {
            result = value;
            found = true;
        }
    });
    return result;
}

function myFilter(collection, predicate) {
    const result = isArray(collection) ? [] : {};
    myEach(collection, (value, key) => {
        if (predicate(value, key)) {
            if (isArray(result)) {
                result.push(value);
            } else {
                result[key] = value;
            }
        }
    });
    return isArray(result) ? result : [];
}

function mySize(collection) {
    let size = 0;
    myEach(collection, () => {
        size++;
    });
    return size;
}

function myFirst(array, n = 1) {
    if (n === 1) {
        return array[0];
    } else {
        return array.slice(0, n);
    }
}

function myLast(array, n = 1) {
    if (n === 1) {
        return array[array.length - 1];
    } else {
        return array.slice(-n);
    }
}

function mySortBy(array, callback) {
    return array.slice().sort((a, b) => {
        const aValue = callback(a);
        const bValue = callback(b);
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    });
}

function myFlatten(array, shallow = false, newArr = []) {
    for (const item of array) {
        if (isArray(item) && !shallow) {
            myFlatten(item, false, newArr);
        } else {
            newArr.push(item);
        }
    }
    return newArr;
}

function myKeys(object) {
    const keys = [];
    myEach(object, (value, key) => {
        keys.push(key);
    });
    return keys;
}

function myValues(object) {
    const values = [];
    myEach(object, (value) => {
        values.push(value);
    });
    return values;
}
