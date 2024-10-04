<script lang="ts">
	import type { State } from '$lib/state';

	let state: State = {
		name: '',
		age: undefined,
		gameStarted: false,
		round: 0,
		results: {
			roundOne: {
				score: 0,
				answerTimes: []
			},
			roundTwo: {
				score: 0,
				answerTimes: []
			}
		}
	};
</script>

<main class="min-h-screen bg-neutral-300">
	{#if state.gameStarted}
		<div class="flex h-screen flex-col items-center justify-center">
			<h1 class="text-4xl font-bold text-neutral-900">Game started!</h1>
			<p class="mt-4 text-lg text-neutral-700">This is the game page</p>
		</div>
	{:else}
		<div class="flex h-screen flex-col items-center justify-center">
			<h1 class="text-4xl font-bold text-neutral-900">Welcome to the game!</h1>
			<input
				type="text"
				class="mt-4 rounded-md border border-neutral-500 px-4 py-2"
				placeholder="Name"
				bind:value={state.name}
			/>
			<input
				type="number"
				class="mt-4 rounded-md border border-neutral-500 px-4 py-2"
				placeholder="Age"
				bind:value={state.age}
			/>
			<button
				class="bg-primary-500 mt-4 rounded-md bg-blue-500 px-4 py-2 text-white"
				on:click={() => (state.gameStarted = true)}>Start</button
			>
		</div>
	{/if}
</main>
