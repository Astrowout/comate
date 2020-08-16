<script context="module">
	export const play = () => {
		audio.play();
	}
</script>

<script>
	export let title = '';
	export let maker = '';
	export let src = '';
	export let inverted = false;
	export let playing = false;

	import { afterUpdate } from 'svelte';

	let audio;

	$: if (playing && audio) {
		audio.play();
	} else if (audio) {
		audio.pause();
	}
</script>

<article
	class:inverted={inverted}
	on:click
>
	<p class="song">
		<span>{title}</span><span class="maker">{maker}</span>
	</p>

	<audio
		bind:this={audio}
		{src}
		class="hidden"
	>
		<track default kind="captions" />
	</audio>
</article>

<style>
	.song {
		display: flex;
		flex-direction: column;

		font-size: 14px;
		text-align: left;

		color: var(--silver-color);
	}

	.maker {
		color: var(--silver-color-faded);
	}

	.hidden {
		display: none;
	}

	.inverted {
		padding: 10px 0;
	}

	.inverted + .inverted {
		border-top: 1px solid var(--alternate-color-faded)
	}

	.inverted:first-child {
		padding-top: 0;
	}

	.inverted:last-child {
		padding-bottom: 0;
	}

	.inverted .song {
		color: var(--primary-color-light);
	}

	.inverted .maker {
		color: var(--alternate-color);
	}
</style>
