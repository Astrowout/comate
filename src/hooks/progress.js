import { elapsedTime } from '../store/timer.js';

export const progress = (node) => {
	let circumference = 0;

	const progressWidth = window.getComputedStyle(document.documentElement).getPropertyValue('--progress-width');

	circumference = node.r.baseVal.value * 2 * Math.PI;

	node.style.strokeDasharray = `${circumference} ${circumference}`;
	node.style.strokeDashoffset = 0;

	node.setAttribute('r', 125 - (progressWidth / 2));

	return {
		update({ time, devMode }) {
			const progress = 1 - (time / elapsedTime.time(devMode));
			const offset = circumference * progress;
			node.style.strokeDashoffset = offset;
		}
	};
}

export const progressBackground = (node) => {
	const progressWidth = window.getComputedStyle(document.documentElement).getPropertyValue('--progress-width');

	node.setAttribute('r', 125 - (progressWidth / 2));
}