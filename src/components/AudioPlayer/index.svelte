<script context="module">
	let current;
</script>

<script>
	export let title = '';
	export let maker = '';
	export let src = '';

	let audio;
	let paused = true;

	const stopOthers = () => {
		if (current && current !== audio) current.pause();
		current = audio;
	}
</script>

<article class="root">
	{#if !paused}
		<p class="song">
			<span>{title}</span> ‒ <span class="maker">{maker}</span>
		</p>
	{/if}

	<audio
		bind:this={audio}
		{src}
		on:play={stopOthers}
	>
		<track default kind="captions" />
	</audio>
</article>

<style>
	.root {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;

		margin: 0 auto;
		padding: 15px 20px 50px;
	}

	.song {
		font-size: 14px;
		color: var(--silver-color);
	}

	.maker {
		color: var(--silver-color-faded);
	}
</style>
