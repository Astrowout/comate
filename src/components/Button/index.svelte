<script>
	import Root from './root.svelte';

	export let url = null;
	export let alt = false;
</script>

<Root
	{url}
	{alt}
	on:click
>
	<slot></slot>
</Root>
