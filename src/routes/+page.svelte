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
			<h1 class="text-4xl font-bold text-neutral-900">
				<span class="text-blue-500">Visual</span> <span class="text-yellow-500">VS</span>
				<span class="text-red-500">Auditory</span>
			</h1>
			<p class="mt-4 max-w-3xl text-lg text-neutral-700">
				The game will start with flashing a series of numbers and you will have to input what they
				were in under 10 seconds. You will go until you fail. The second part of the game will be
				the same thing but you will be listening to the number as well.
			</p>
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
				on:click={() => {
					if (!state.name || !state.age) {
						alert('Please fill in your name and age');
						return;
					}
					state.gameStarted = true;
				}}>Start</button
			>
		</div>
	{/if}
</main>
