import { writable, derived } from 'svelte/store';

const TIME = 28800000; // 8 hours in milliseconds
const DEV_TIME = 10000; // 10 seconds in milliseconds

const leadingZero = (value) => {
	return ('0' + value).slice(-2);
};

const createStore = () => {
	const { subscribe, set, update } = writable(TIME);

	const handleReset = (isDev) => {
		if (isDev) {
			set(DEV_TIME);
		} else {
			set(TIME)
		}
	}

	const getTime = (isDev) => {
		if (isDev) {
			return DEV_TIME;
		} else {
			return TIME;
		}
	}

	return {
		subscribe,
		update,
		reset: handleReset,
		time: getTime
	}
}

export const elapsedTime = createStore();

export const hours = derived(elapsedTime, $elapsedTime => leadingZero(Math.floor(($elapsedTime / (1000 * 60 * 60)) % 24)));
export const minutes = derived(elapsedTime, $elapsedTime => leadingZero(Math.floor(($elapsedTime / 1000 / 60) % 60 )));
export const seconds = derived(elapsedTime, $elapsedTime => leadingZero(Math.floor(($elapsedTime / 1000) % 60)));