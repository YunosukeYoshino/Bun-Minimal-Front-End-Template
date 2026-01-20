# jQuery 4.0 API Migration Guide

Complete reference for migrating from deprecated jQuery APIs to modern equivalents.

## Removed Utility Functions

### Type Checking

| jQuery 3.x | jQuery 4.0+ / Native JS | Notes |
|------------|------------------------|-------|
| `$.isArray(arr)` | `Array.isArray(arr)` | ES5+ native |
| `$.isFunction(fn)` | `typeof fn === 'function'` | Native typeof |
| `$.isNumeric(n)` | `Number.isFinite(n)` or `typeof n === 'number' && !isNaN(n)` | Choose based on use case |
| `$.isWindow(obj)` | `obj === window` | Direct comparison |
| `$.type(obj)` | See detailed replacement below | Complex, case-dependent |

#### `$.type()` Replacement Patterns

```javascript
// Old: $.type(value)
// New: Multiple approaches depending on need

// For basic types
typeof value === 'string'
typeof value === 'number'
typeof value === 'boolean'
typeof value === 'function'

// For arrays
Array.isArray(value)

// For null/undefined
value === null
value === undefined

// For objects (excluding null)
typeof value === 'object' && value !== null

// For Date, RegExp, etc.
value instanceof Date
value instanceof RegExp

// Universal type detection function
function getType(value) {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}
```

### String/JSON Operations

| jQuery 3.x | jQuery 4.0+ / Native JS | Notes |
|------------|------------------------|-------|
| `$.trim(str)` | `str.trim()` | ES5+ native |
| `$.parseJSON(str)` | `JSON.parse(str)` | ES5+ native |

### Date/Time

| jQuery 3.x | jQuery 4.0+ / Native JS | Notes |
|------------|------------------------|-------|
| `$.now()` | `Date.now()` | ES5+ native |

### String Manipulation

| jQuery 3.x | jQuery 4.0+ / Native JS | Notes |
|------------|------------------------|-------|
| `$.camelCase(str)` | Custom function | See implementation below |

```javascript
// $.camelCase replacement
function camelCase(str) {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

// Or use lodash
import { camelCase } from 'lodash';
```

### DOM Utilities

| jQuery 3.x | jQuery 4.0+ / Native JS | Notes |
|------------|------------------------|-------|
| `$.nodeName(elem, name)` | `elem.nodeName.toLowerCase() === name.toLowerCase()` | Direct comparison |

## Removed Prototype Methods

| jQuery 3.x | jQuery 4.0+ | Notes |
|------------|-------------|-------|
| `$elems.push(elem)` | `[].push.call($elems, elem)` | Array method on collection |
| `$elems.sort(fn)` | `[].sort.call($elems, fn)` | Array method on collection |
| `$elems.splice(...)` | `[].splice.call($elems, ...)` | Array method on collection |

## Removed CSS Properties

| jQuery 3.x | Status | Replacement |
|------------|--------|-------------|
| `$.cssNumber` | Removed | Internal only, no replacement needed |
| `$.cssProps` | Removed | Internal only, no replacement needed |
| `$.fx.interval` | Removed | Uses requestAnimationFrame automatically |

## Deprecated Event Methods (Use .on()/.off())

| Old Method | Replacement |
|------------|-------------|
| `.click(fn)` | `.on("click", fn)` |
| `.dblclick(fn)` | `.on("dblclick", fn)` |
| `.mouseenter(fn)` | `.on("mouseenter", fn)` |
| `.mouseleave(fn)` | `.on("mouseleave", fn)` |
| `.hover(fn1, fn2)` | `.on("mouseenter", fn1).on("mouseleave", fn2)` |
| `.focus(fn)` | `.on("focus", fn)` |
| `.blur(fn)` | `.on("blur", fn)` |
| `.change(fn)` | `.on("change", fn)` |
| `.submit(fn)` | `.on("submit", fn)` |
| `.keydown(fn)` | `.on("keydown", fn)` |
| `.keyup(fn)` | `.on("keyup", fn)` |
| `.keypress(fn)` | `.on("keypress", fn)` |
| `.bind(event, fn)` | `.on(event, fn)` |
| `.unbind(event, fn)` | `.off(event, fn)` |
| `.delegate(sel, ev, fn)` | `.on(ev, sel, fn)` |
| `.undelegate(...)` | `.off(...)` |

## AJAX Changes

### JSONP Auto-Promotion Removed

```javascript
// jQuery 3.x: This was auto-promoted to JSONP
$.ajax({
  url: "https://api.example.com/data",
  dataType: "json",
  jsonpCallback: "callback"
});

// jQuery 4.0+: Use CORS instead
$.ajax({
  url: "https://api.example.com/data",
  method: "GET",
  dataType: "json",
  crossDomain: true
});
```

### FormData Support

jQuery 4.0 automatically handles FormData with binary data:

```javascript
const formData = new FormData();
formData.append("file", fileInput.files[0]);

$.ajax({
  url: "/upload",
  method: "POST",
  data: formData,
  processData: false,
  contentType: false
});
```

## Focus Event Order Change

jQuery 4.0 now follows the W3C specification for focus event order:

```
jQuery 3.x order: focusout → blur → focusin → focus
jQuery 4.0 order: blur → focusout → focus → focusin
```

Update code that depends on specific event ordering.

## Deferred/Promise Migration (Slim Build)

If using the slim build, migrate from jQuery Deferred to native Promise:

```javascript
// jQuery Deferred (not in slim build)
const deferred = $.Deferred();
deferred.resolve(value);
deferred.promise();

// Native Promise
const promise = new Promise((resolve, reject) => {
  resolve(value);
});

// Deferred.pipe() → Promise.then()
deferred.pipe(fn); // Old
promise.then(fn);  // New

// $.when() → Promise.all()
$.when(promise1, promise2).then(fn);  // Old
Promise.all([promise1, promise2]).then(fn);  // New
```

## Browser Support Changes

### Dropped in 4.0
- IE 10 and older
- Edge Legacy (pre-Chromium)
- iOS < last 3 versions
- Firefox < last 2 versions (except ESR)
- Android Browser

### Supported (will be dropped in 5.0)
- IE 11

### Fully Supported
- Chrome/Edge (current, current-1)
- Firefox (current, current-1, ESR)
- Safari (current, current-1)
- iOS Safari (last 3 versions)
- Android Chrome (current, current-1)
