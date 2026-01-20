# jQuery 4.0 Modern Coding Patterns

Comprehensive coding patterns for modern jQuery development.

## Selector Patterns

### Caching Strategy

```javascript
// ✅ Module-level caching for frequently accessed elements
const UI = {
	$container: null,
	$items: null,
	$form: null,

	init() {
		this.$container = $('#main-container')
		this.$items = this.$container.find('.item')
		this.$form = $('#search-form')
	},
}

// ✅ Function-scoped caching
function processItems() {
	const $items = $('.item') // Cache once
	$items.addClass('processing')
	$items.each(function () {
		// Process each item
	})
	$items.removeClass('processing')
}
```

### Optimized Selector Patterns

```javascript
// ✅ ID first, then find
const $links = $('#nav').find('a')

// ✅ Class selector without element type
const $buttons = $('.btn-primary')

// ✅ Context parameter
const $inputs = $('input', '#form-container')

// ❌ Avoid complex CSS3 selectors
$('div:not(.active):has(.child)') // Slow

// ✅ Better: break into steps
const $divs = $('div').not('.active').has('.child')
```

## Event Patterns

### Namespace Events

```javascript
// ✅ Namespace for easy cleanup
const NAMESPACE = 'myPlugin'

function initPlugin($container) {
	$container.on(`click.${NAMESPACE}`, '.item', handleClick)
	$container.on(`mouseenter.${NAMESPACE}`, '.item', handleHover)
	$(window).on(`resize.${NAMESPACE}`, handleResize)
}

function destroyPlugin($container) {
	$container.off(`.${NAMESPACE}`)
	$(window).off(`.${NAMESPACE}`)
}
```

### Event Delegation Pattern

```javascript
// ✅ Single delegated handler for dynamic content
$container.on('click', '[data-action]', function (e) {
	e.preventDefault()
	const $target = $(this)
	const action = $target.data('action')

	const actions = {
		delete: () => deleteItem($target),
		edit: () => editItem($target),
		toggle: () => toggleItem($target),
	}

	actions[action]?.()
})
```

### Custom Events

```javascript
// ✅ Custom events for component communication
const Events = {
	ITEM_ADDED: 'app:item:added',
	ITEM_REMOVED: 'app:item:removed',
	FILTER_CHANGED: 'app:filter:changed',
}

// Trigger
$container.trigger(Events.ITEM_ADDED, [{ id: 123, name: 'New Item' }])

// Listen
$container.on(Events.ITEM_ADDED, (e, item) => {
	console.log('Item added:', item)
})
```

## AJAX Patterns

### Async/Await Wrapper

```javascript
// ✅ Reusable API client
const API = {
	baseUrl: '/api/v1',

	async get(endpoint, params = {}) {
		return $.ajax({
			url: `${this.baseUrl}${endpoint}`,
			method: 'GET',
			data: params,
			dataType: 'json',
		})
	},

	async post(endpoint, data) {
		return $.ajax({
			url: `${this.baseUrl}${endpoint}`,
			method: 'POST',
			data: JSON.stringify(data),
			contentType: 'application/json',
			dataType: 'json',
		})
	},

	async delete(endpoint) {
		return $.ajax({
			url: `${this.baseUrl}${endpoint}`,
			method: 'DELETE',
		})
	},
}

// Usage
async function loadUsers() {
	try {
		const users = await API.get('/users', { limit: 10 })
		renderUsers(users)
	} catch (error) {
		showError('Failed to load users')
	}
}
```

### Request Queue Pattern

```javascript
// ✅ Prevent duplicate requests
const RequestQueue = {
	pending: new Map(),

	async fetch(key, requestFn) {
		if (this.pending.has(key)) {
			return this.pending.get(key)
		}

		const promise = requestFn()
		this.pending.set(key, promise)

		try {
			return await promise
		} finally {
			this.pending.delete(key)
		}
	},
}

// Usage
async function getUser(id) {
	return RequestQueue.fetch(`user-${id}`, () =>
		$.ajax({ url: `/api/users/${id}` }),
	)
}
```

## DOM Manipulation Patterns

### Fragment Builder

```javascript
// ✅ Build HTML efficiently
function buildItemList(items) {
	return items
		.map(
			(item) => `
      <li class="item" data-id="${item.id}">
        <span class="item-name">${escapeHtml(item.name)}</span>
        <button class="btn-delete" data-action="delete">Delete</button>
      </li>
    `,
		)
		.join('')
}

// ✅ HTML escaping utility
function escapeHtml(text) {
	const div = document.createElement('div')
	div.textContent = text
	return div.innerHTML
}

// Usage
$list.html(buildItemList(items))
```

### Detach for Heavy Operations

```javascript
// ✅ Detach, modify, reattach
function sortItems($container) {
	const $items = $container.children().detach()

	const sorted = $items.sort((a, b) => {
		return $(a).data('order') - $(b).data('order')
	})

	$container.append(sorted)
}
```

### Template Pattern

```javascript
// ✅ Reusable template function
const Templates = {
	card: (data) => `
    <div class="card" data-id="${data.id}">
      <h3 class="card-title">${escapeHtml(data.title)}</h3>
      <p class="card-body">${escapeHtml(data.body)}</p>
      <footer class="card-footer">
        <span class="card-date">${formatDate(data.date)}</span>
      </footer>
    </div>
  `,

	list: (items, itemTemplate) => `
    <ul class="list">
      ${items.map((item) => `<li>${itemTemplate(item)}</li>`).join('')}
    </ul>
  `,
}
```

## Animation Patterns

### CSS Transition with Callback

```javascript
// ✅ CSS transition with completion callback
function fadeOut($element) {
	return new Promise((resolve) => {
		$element.addClass('fading-out')
		$element.one('transitionend', () => {
			$element.removeClass('fading-out').addClass('hidden')
			resolve()
		})
	})
}

// CSS
// .fading-out { opacity: 0; transition: opacity 0.3s ease; }
// .hidden { display: none; }
```

### Animation Queue

```javascript
// ✅ Sequential animations
async function animateSequence($elements) {
	for (const el of $elements) {
		await new Promise((resolve) => {
			$(el).fadeIn(300, resolve)
		})
	}
}
```

## Module Patterns

### ES Module Plugin

```javascript
// my-plugin.js
import $ from 'jquery'

const DEFAULTS = {
	speed: 300,
	easing: 'swing',
	onComplete: null,
}

export function initMyPlugin($container, options = {}) {
	const settings = { ...DEFAULTS, ...options }
	const $items = $container.find('.item')

	function handleClick(e) {
		e.preventDefault()
		const $item = $(e.currentTarget)
		$item.slideToggle(settings.speed, settings.easing, () => {
			settings.onComplete?.($item)
		})
	}

	$container.on('click', '.item', handleClick)

	return {
		destroy() {
			$container.off('click', '.item', handleClick)
		},
	}
}
```

### State Management Pattern

```javascript
// ✅ Simple state management
const Store = {
	state: {
		items: [],
		filter: 'all',
		loading: false,
	},

	listeners: new Set(),

	setState(updates) {
		this.state = { ...this.state, ...updates }
		this.notify()
	},

	subscribe(listener) {
		this.listeners.add(listener)
		return () => this.listeners.delete(listener)
	},

	notify() {
		this.listeners.forEach((listener) => listener(this.state))
	},
}

// Usage
Store.subscribe((state) => {
	renderItems(state.items)
})

Store.setState({ items: newItems })
```

## TypeScript Patterns

### Type Definitions

```typescript
import $ from 'jquery'

interface PluginOptions {
	speed?: number
	easing?: string
	onComplete?: ($element: JQuery) => void
}

interface ApiResponse<T> {
	data: T
	status: 'success' | 'error'
	message?: string
}

async function fetchData<T>(url: string): Promise<T> {
	const response = await $.ajax<ApiResponse<T>>({
		url,
		dataType: 'json',
	})

	if (response.status === 'error') {
		throw new Error(response.message)
	}

	return response.data
}
```

### Typed Event Handlers

```typescript
interface ItemData {
	id: number
	name: string
}

function handleItemClick(this: HTMLElement, event: JQuery.ClickEvent): void {
	event.preventDefault()
	const $item = $(this)
	const data = $item.data() as ItemData
	console.log(data.id, data.name)
}

$container.on('click', '.item', handleItemClick)
```

## Performance Checklist

### Before Deployment

- [ ] All selectors are cached appropriately
- [ ] No banned APIs ($.isArray, $.trim, etc.)
- [ ] Event delegation used for dynamic content
- [ ] DOM operations batched
- [ ] CSS animations preferred over jQuery animations
- [ ] No unnecessary re-queries of the same elements
- [ ] Large DOM modifications use detach/attach pattern
- [ ] AJAX requests use async/await
- [ ] No JSONP usage (use CORS instead)
- [ ] Event namespaces used for cleanup
