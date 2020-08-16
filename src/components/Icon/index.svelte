<script>
	import InlineSVG from 'svelte-inline-svg';

	export let src = '';
	export let w = 'auto';
</script>

<InlineSVG {src} width={w} />
