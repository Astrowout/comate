<script>
	export let isOpen = false;
	export let title = 'Missing title';

	import { createEventDispatcher, onDestroy } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';
	import Icon from '../Icon/index.svelte';

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');

	let modal;

	const handleKeydown = e => {
		if (e.key === 'Escape') {
			close();
			return;
		}

		if (e.key === 'Tab') {
			// trap focus
			const nodes = modal.querySelectorAll('*');
			const tabbable = Array.from(nodes).filter(n => n.tabIndex >= 0);

			let index = tabbable.indexOf(document.activeElement);
			if (index === -1 && e.shiftKey) index = 0;

			index += tabbable.length + (e.shiftKey ? -1 : 1);
			index %= tabbable.length;

			tabbable[index].focus();
			e.preventDefault();
		}
	};

	const previouslyFocused = typeof document !== 'undefined' && document.activeElement;

	if (previouslyFocused) {
		onDestroy(() => {
			previouslyFocused.focus();
		});
	}
</script>

<svelte:window on:keydown={isOpen && handleKeydown}/>

{#if isOpen}
	<div
		class="overlay"
		on:click={close}
		transition:fade={{duration: 200}}
	>
	</div>
{/if}

{#if isOpen}
	<div
		class="modal"
		role="dialog"
		aria-modal="true"
		bind:this={modal}
		in:fly={{easing: elasticOut, opacity: 1, y: 50, duration: 800}}
		out:fly={{opacity: 0, y: 50, duration: 200}}
	>
		<header class="header">
			<span class="title">{title}</span>

			<button
				on:click={close}
				class="close"
			>
				<Icon
					src="/cross.svg"
					w="14"
				>
				</Icon>
			</button>
		</header>

		<div class="modal__content">
			<slot></slot>
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
	}

	.modal {
		position: absolute;
		left: 50%;
		top: 50%;

		display: flex;
		flex-direction: column;
		width: calc(100% - 20px);
		max-width: 400px;
		max-height: calc(100% - 50px);

		color: var(--primary-color-light);
		background-color: var(--silver-color);

		transform: translate(-50%, -50%);
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 10px 10px 10px 20px;

		border-bottom: 1px solid var(--alternate-color-faded);
	}

	.title {
		font-size: 18px;
		font-weight: 200;

		color: var(--primary-color-dark);
	}

	.close {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 30px;
		height: 30px;

		color: var(--alternate-color);
	}

	.modal__content {
		padding: 20px;
		overflow: auto;
	}
</style>
