<script lang="ts">
	import type { State } from '$lib/state';

	let state: State = {
		name: '',
		age: undefined,
		gameStarted: false,
		round: 0,
		results: {
			roundOne: {
				score: 0
			},
			roundTwo: {
				score: 0
			}
		}
	};

	async function sendState() {
		try {
			const response = await fetch('/api/state', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(state)
			});

			const result = await response.json();
			if (result.success) {
				console.log('State successfully inserted!');
			} else {
				console.error('Failed to insert state:', result.error);
			}
		} catch (error) {
			console.error('Error sending state:', error);
		}
	}
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
				<span class="text-blue-500">Auditory</span>
				<span class="text-red-500">Deceit</span>
			</h1>
			<p class="mt-4 max-w-3xl text-lg text-neutral-700">
				The game will start with flashing a series of numbers and you will have to input what they
				were in under 10 seconds. You will go until you fail. The second part of the game will be
				the same thing but random, false numbers will be played to you.
			</p>
			<input
				type="text"
				class="mt-4 rounded-md border border-neutral-500 px-4 py-2"
				placeholder="Name (First and Last)"
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
