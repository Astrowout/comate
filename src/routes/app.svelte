<svelte:head>
	<title>comate ‒ {devMode ? $minutes : $hours}:{devMode ? $seconds : $minutes}</title>
</svelte:head>

<script>
	import { onMount } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';
	import { Plugins } from '@capacitor/core';
	import { Button, Icon, AudioPlayer, Modal } from '../components';
	import { elapsedTime, hours, minutes, seconds } from '../store/timer.js';
	import { progress, progressBackground } from '../hooks/progress.js';
	import sounds from '../data/sounds.js';

	const { Haptics, LocalNotifications, Toast } = Plugins;

	let timer = null;
	let devMode = false;
	let showModal = false;
	let activeSound = 0;
	let alarm = false;

	$: elapsedTime.reset(devMode);

	onMount(async() => {
		await LocalNotifications.requestPermission();
	});

	const handleStart = () => {
		alarm = false;

		timer = setInterval(() => {
			elapsedTime.update(time => time - 1000);

			if ($elapsedTime <= 0) {
				handleReset();
				handleStop();
			}
		}, 1000);
	}

	const handleStop = async() => {
		await LocalNotifications.schedule({
			notifications: [
			  {
				title: "Wake up!",
				body: "A lovely day is waiting for you.",
				id: 1,
			  }
			]
		});

		alarm = true;

		Haptics.vibrate();
	}

	const handleReset = () => {
		clearInterval(timer);

		elapsedTime.reset(devMode);
		timer = null;
	}

	const handleDevMode = async() => {
		devMode = !devMode;

		await Toast.show({
			text: devMode ? 'DEV mode enabled' : 'DEV mode disabled',
			position: 'top'
		});
	}
</script>

<main class="root">
	<header
		class="header"
		in:fly={{opacity: 0, y: -50, easing: elasticOut, duration: 1000, delay: 1100}}
	>
		<a
			href="/"
			class="header__icon"
		>
			<Icon
				src="/info.svg"
				w="6"
			>
			</Icon>
		</a>

		<h1 class="header__text">
			comate
		</h1>

		<button
			class="header__icon"
			class:hidden={!!timer}
			on:click={handleDevMode}
		>
			{#if !devMode}
				<Icon
					src="/code.svg"
					w="18"
				>
				</Icon>
			{:else}
				<Icon
					src="/clock.svg"
					w="18"
				>
				</Icon>
			{/if}
		</button>
	</header>

	<div>
		<span
			in:scale={{opacity: 0, start: 0.5, easing: elasticOut, duration: 1000, delay: 1000}}
			class="time"
		>
			{#if devMode}
				<span
					class="time__seconds"
					in:fade
				>
					{$minutes}<span class:pulse={timer}>:</span>{$seconds}
				</span>
			{:else}
				<span in:fade>
					{$hours}<span class:pulse={timer}>:</span>{$minutes}
				</span>
			{/if}

			<svg class="time__progress">
				<circle
					use:progressBackground
					class="time__progress-background"
					r="125"
					cx="125"
					cy="125"
				/>

				<circle
					use:progress={{
						time: $elapsedTime,
						devMode
					}}
					class="time__progress-ring"
					r="125"
					cx="125"
					cy="125"
				/>
			</svg>
		</span>

		<div class="audio">
			<AudioPlayer
				{...sounds[activeSound]}
				playing={alarm}
			>
			</AudioPlayer>

			<button
				class="audio__button"
				on:click={() => showModal = true}
			>
				<Icon
					src="/audio.svg"
					w="16"
				>
				</Icon>
			</button>
		</div>
	</div>

	{#if !timer}
		<div in:fly={{opacity: 0, y: 30, easing: elasticOut, duration: 1000, delay: 200}}>
			<Button on:click={handleStart}>
				<span class="u-icon-spacing">Start sleep cycle</span>

				<Icon
					src="/play.svg"
					w="14"
				>
				</Icon>
			</Button>
		</div>
	{:else}
		<div in:fly={{opacity: 0, y: 30, easing: elasticOut, duration: 1000, delay: 200}}>
			<Button
				alt
				on:click={handleReset}
			>
				<span class="u-icon-spacing">Reset</span>

				<Icon
					src="/reset.svg"
					w="16"
				>
				</Icon>
			</Button>
		</div>
	{/if}
</main>

<Modal
	title="Pick a song"
	on:close="{() => showModal = false}"
	isOpen={showModal}
>
	{#each sounds as sound, i}
		<AudioPlayer
			inverted
			{...sound}
			on:click={() => {
				activeSound = i;
				showModal = false;
			}}
		>
		</AudioPlayer>
	{/each}
</Modal>

<style>
	.root {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;

		margin: 0 auto;
		padding: 15px 20px 50px;
	}

	.header {
		display: flex;
		align-items: center;
		width: 100%;
	}

	.header__icon {
		width: 25px;
		height: 25px;

		display: flex;
		justify-content: center;
		align-items: center;

		color: var(--highlight-color);
	}

	.header__text {
		font-size: 16px;
		font-weight: 200;
		margin: 0 auto;
	}

	.hidden {
		opacity: 0;
		visibility: hidden;
		pointer-events: none;
	}

	.time {
		position: relative;
		width: 250px;
		height: 250px;

		display: flex;
		justify-content: center;
		align-items: center;

		font-size: 60px;
		text-shadow: 0 15px 30px rgba(0, 0, 0, 0.8);
	}

	.time__progress {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.time__progress-background,
	.time__progress-ring {
		stroke-width: var(--progress-width);
		fill: transparent;
	}

	.time__progress-background {
		stroke: var(--alternate-color-faded);
	}

	.time__progress-ring {
		stroke: var(--alternate-color);

		transition: stroke-dashoffset 0.3s ease-out;
		transform: rotate(-90deg);
		transform-origin: center;
	}

	.time__seconds {
		color: var(--silver-color-faded);
	}

	.audio {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 30px;
	}

	.audio__button {
		width: 30px;
		height: 30px;
		margin-left: 15px;

		display: flex;
		justify-content: center;
		align-items: center;

		color: var(--silver-color);
	}

	.pulse {
		animation: flash 2s ease-in infinite;
	}

	@keyframes flash {
		0% {
			opacity: 1;
		}

		60% {
			opacity: 1;
		}

		61% {
			opacity: 0;
		}

		100% {
			opacity: 0;
		}
	}
</style>