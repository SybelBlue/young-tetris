Array.last = function(arr) {
    return arr && arr.length ? arr[arr.length - 1] : null;
}

Array.sum = function(arr, start=0) {
    return arr ? arr.reduce(function(sum, next) { return sum + next }, start) : start;
}

Array.swap = function(arr, i, j=null) {
    j = exists(j) ? j : i + 1;
    const old = arr[i];
    arr[i] = arr[j];
    arr[j] = old;
}

Array.range = function(n, start = 0) {
    return Array.from({ length: n }, function(_, k) { return k + start } );
}

function exists(item, _throw=false) {
    if (item === null || item === undefined) {
        if (_throw) {
            throw new Error('null value!');
        } else {
            return false;
        }
    }
    return true;
}

function assert(bool, msg, _throw=true) {
    if (!bool) {
        if (_throw) {
            throw new Error(msg);
        } else {
            console.warn(msg);
        }
    }
    return bool;
}

function trace(msg, obj) {
    console.log(msg, obj);
    return obj;
}

function _min(a, b) { return a < b ? a : b; }
function _max(a, b) { return a > b ? a : b; }

// oui oui, grace a https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
function updateQueryStringParameter(key, value) {
    var searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, value);
    window.location.search = searchParams.toString();
}

// reloads site!
function updateLevelNumber(value) {
    if (typeof(value) !== typeof(0)) return;
    updateQueryStringParameter('l', value);
    localStorage.setItem('last-level', value);
}
function updatePromptDisplay(value) { updateQueryStringParameter('p', value); }

function extendLiteral(obj, overrides)  {
    const out = Object.create(
        Object.getPrototypeOf(obj), 
        Object.getOwnPropertyDescriptors(obj) 
    );

    const props = Object.keys(overrides);
    for (const prop of props) {
        const descriptor = Object.getOwnPropertyDescriptor(overrides, prop);
        Object.defineProperty(out, prop, descriptor);
    }
    
    return out;
}

function lens(obj, ...lensLayers) {
    if (!exists(obj) || !lensLayers.length) return obj;
    const inner = obj[lensLayers.shift()];
    return lensLayers.length ? lens(inner, ...lensLayers) : inner;
}

function robustMax(...objs) {
    return objs.length ? objs.filter(x => exists(x)).reduce((a, b) => a > b ? a : b) : null;
}

function ordinal(n) {
    if (!exists(n) || Number.isNaN(n)) return n;
    switch (floor(abs(n) % 10)) {
        case 1:
            return n + 'st';
        case 2:
            return n + 'nd';
        case 3:
            return n + 'rd';
        default:
            return n + 'th';
    }
}