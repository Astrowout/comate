<script>
	export let segment;

	import { onMount } from 'svelte';
	import { Plugins } from '@capacitor/core';

	const { StatusBar } = Plugins;

	onMount(() => {
		StatusBar.hide();
	});
</script>

<slot {segment}></slot>