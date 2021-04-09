export function checkText(text, maxText) {
	return text.length > maxText ? text.slice(0, maxText) + '...' : text
}
