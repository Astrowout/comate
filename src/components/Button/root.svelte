<script>
	export let url = null;
	export let alt = false;
</script>

{#if url}
<a
	href="{url}"
	class="root"
	class:alt="{alt}"
>
	<slot></slot>
</a>
{:else}
<button
	type="button"
	class="root"
	class:alt={alt}
	on:click
>
	<slot></slot>
</button>
{/if}

<style>
	.root {
		position: relative;

		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		max-width: 320px;
		height: 60px;
		padding: 0 36px;

		font-size: 18px;
		line-height: 1.2;
		text-decoration: none;

		background-color: var(--alternate-color);
		border-radius: var(--border-radius-rounded);
		border: none;
		outline: none;
		color: var(--silver-color);

		cursor: pointer;

		transition: background-color 0.2s ease-out;
	}

	.root::before {
		content: '';

		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;

		opacity: 0;
		border-left: 2px solid var(--alternate-color-interactive);
		border-right: 2px solid var(--alternate-color-interactive);
		border-radius: var(--border-radius-rounded);
	}

	.root::after {
		content: '';

		position: absolute;
		top: 2px;
		right: 2px;
		bottom: 2px;
		left: 2px;

		opacity: 0;
		box-shadow: 0 0 0 2px var(--silver-color);
		border-radius: var(--border-radius-rounded);

		transition: opacity 0.2s ease-out;
	}

	.alt {
		background-color: transparent;
		border: 2px solid var(--silver-color);
	}

	.alt::before {
		border-color: var(--silver-color);
	}

	.alt::after {
		content: none;
	}

	.root:hover {
		background-color: var(--alternate-color-interactive);
	}

	.root:hover::before {
		animation: pulse 0.8s ease-out;
	}

	.alt:hover {
		background-color: var(--alternate-color-faded);
	}

	.root:focus {
		background-color: var(--alternate-color-interactive);
	}

	.root:focus:after {
		opacity: 1;
	}

	@keyframes pulse {
		0% {
			opacity: 0;
		}

		50% {
			opacity: 1;
		}

		100% {
			opacity: 0;

			transform: scale(1.2);
		}
	}
</style>
