<svelte:head>
	<title>Welcome</title>
</svelte:head>

<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { elasticOut, quintOut } from 'svelte/easing';
	import { Button, Icon } from '../components';

	let loaded = false;

	onMount(() => {
		loaded = true;
	});
</script>

{#if loaded}
	<main class="root">
		<h1
			in:fly={{opacity: 0, y: -30, easing: elasticOut, duration: 1000, delay: 300}}
			out:fly={{opacity: 0, y: -30, easing: quintOut}}
			class="logo__text"
		>
			comate
		</h1>

		<div>
			<div
				in:fly={{opacity: 0, x: 250, y: -250, easing: quintOut, duration: 800}}
				out:fly={{opacity: 0, x: -250, y: 250, easing: quintOut, delay: 200, duration: 800}}
			>
				<Icon
					src="/logo.svg"
					w="100"
				>
				</Icon>
			</div>

			<p
				class="description__main"
				in:fly={{opacity: 0, y: 30, easing: quintOut, delay: 100}}
				out:fly={{opacity: 0, y: 30, easing: quintOut, delay: 100}}
			>
				Comate is an honest alarm clock to <span class="highlight">help you sleep.</span> The average human being needs <span class="highlight">8 hours of sleep</span> per night.
			</p>

			<small
				class="description__extra"
				in:fly={{opacity: 0, y: 30, easing: quintOut, delay: 200}}
				out:fly={{opacity: 0, y: 30, easing: quintOut}}
			>
				With comate you don't sleep till 7AM, you sleep till you've had enough sleep to function properly everyday.
			</small>
		</div>

		<div
			in:fly={{opacity: 0, y: 50, easing: elasticOut, duration: 1000, delay: 300}}
			out:fly={{opacity: 0, y: 50, easing: quintOut}}
		>
			<Button url="/app">
				<span class="u-icon-spacing">Put me in a coma</span>

				<Icon
					src="/arrow.svg"
					w="18"
				>
				</Icon>
			</Button>
		</div>
	</main>
{/if}

<style>
	.root {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;

		max-width: 420px;
		margin: 0 auto;
		padding: 30px 20px 50px;
	}

	.logo__text {
		font-size: 30px;
		font-weight: 200;
	}

	.description__main {
		margin-top: 20px;

		font-size: 18px;
	}

	.description__extra {
		display: block;
		margin-top: 15px;

		font-size: 14px;

		color: var(--silver-color-faded);
	}

	.highlight {
		color: var(--highlight-color);
	}
</style>
