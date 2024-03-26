'use strict'

function saveToStorage(key, val) {
	const strVal = JSON.stringify(val)
	console.log(`Saving ${strVal.length} bytes to local storage...`)
	localStorage.setItem(key, strVal)
}

function loadFromStorage(key) {
	var val = localStorage.getItem(key)
	return JSON.parse(val)
}

function getRandomInt(min, max) {
	const minCeiled = Math.ceil(min)
	const maxFloored = Math.floor(max)
	return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}