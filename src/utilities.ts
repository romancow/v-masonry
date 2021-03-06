import type { VNode } from 'vue'

export const keys = Object.keys as <T>(o: T) => (keyof T)[]

export function mapKeys<T>(obj: T, mapFn: (key: keyof T) => string) {
	return keys(obj).reduce((mapped, key) => {
		mapped[mapFn(key)] = obj[key]
		return mapped
	}, {} as Record<string, any>)
}

export function mapValues<T, R>(obj: T, mapFn: <K extends keyof T>(val: T[K], key: K, obj: T) => (R | undefined)) {
	return keys(obj).reduce((mapped, key) => {
		const value = mapFn(obj[key], key, obj)
		if ((value != null) || (value === null))
			mapped[key] = value
		return mapped
	}, {} as { [k in keyof T]: R })
}

export function forEach<T>(obj: T, fn: <K extends keyof T>(val: T[K], key: K, obj: T) => void) {
	keys(obj).forEach(key => fn(obj[key], key, obj))
}

export function select<T>(obj: T, keys: (keyof T)[]) {
	return keys.reduce((selected, key) => { 
		selected[key] = obj[key]
		return selected
	}, {} as Partial<T>)
}

export function filter<T>(obj: T, filterFn?: <K extends keyof T>(val: T[K], key: K, obj: T) => boolean) {
	return keys(obj).reduce((filtered, key) => {
		const val = obj[key]
		if (filterFn?.(val, key, obj) ?? (val != null))
			filtered[key] = val
		return filtered
	}, {} as Partial<T>)
}

export function camelcase(str: string) {
	return str.replace(/[-\s]([a-z])/g, match => match[1].toUpperCase())
}

export function addClass(node: VNode, cls: string) {
	let classes = (node.data ??= {}).class ?? []
	if (typeof classes === "string")
		classes = [classes, cls]
	else if (Array.isArray(classes))
		classes.push(cls)
	else classes[cls] = true
	node.data.class = classes
	return node
}
