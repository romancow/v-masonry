import type { VNode } from 'vue'

export const keys = Object.keys as <T>(o: T) => (keyof T)[]

export function mapValues<T, R>(obj: T, mapFn: <K extends keyof T>(val: T[K], key: K, obj: T) => R) {
	return keys(obj).reduce((mapped, key) => {
		const value = mapFn(obj[key], key, obj)
		if ((value != null) || (value === null))
			mapped[key] = value
		return mapped
	}, {} as { [k in keyof T]: R })
}

export function collect<T, A extends readonly T[], K extends string>(arr: readonly T[] & A, fn: (item: T, index: number, arr: A) => K) {
	return arr.reduce(
		(rec, item, index) => (rec[fn(item, index, arr)] = item, rec),
		{} as Record<K, T>
	)
}

export function invert<T extends { [key: string]: string }>(obj: T) {
	return collect(keys(obj), key => obj[key])
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
