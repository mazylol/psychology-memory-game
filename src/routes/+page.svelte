<script lang="ts">
	import type { DBState, GameState } from '$lib/state';
	import RoundOne from '../components/RoundOne.svelte';
	import RoundTwo from '../components/RoundTwo.svelte';

	let gameState: GameState = {
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

	let dbState: DBState[] = [];

	async function sendState() {
		try {
			const response = await fetch('/api/state', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(gameState)
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

	async function getState() {
		try {
			const response = await fetch('/api/state', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const result = await response.json();

			if (result.success) {
				console.log('State successfully retrieved:', result.data.rows);

				let rows = result.data.rows;

				for (let i = 0; i < rows.length; i++) {
					dbState.push({
						id: rows[i][0],
						name: rows[i][1],
						age: rows[i][2],
						roundOneScore: rows[i][3],
						roundTwoScore: rows[i][4]
					});
				}
			} else {
				console.error('Failed to get state:', result.error);
			}
		} catch (error) {
			console.error('Error getting state:', error);
		}
	}
</script>

<main class="min-h-screen bg-neutral-300">
	{#if gameState.gameStarted}
		{#if gameState.round === 0}
			<RoundOne bind:state={gameState} />
		{/if}
		{#if gameState.round == 1}
			<div class="flex h-screen flex-col items-center justify-center">
				<h1 class="text-4xl font-bold text-neutral-900">
					<span class="text-blue-500">Auditory</span>
					<span class="text-red-500">Deceit</span>
				</h1>
				<p class="mt-4 max-w-3xl text-lg text-neutral-700">
					You have failed the first round. You will now be taken to the second round.
				</p>
				<button
					class="bg-primary-500 mt-4 rounded-md bg-blue-500 px-4 py-2 text-white"
					on:click={() => {
						gameState.round += 1;
					}}>Start Round 2</button
				>
			</div>
		{/if}
		{#if gameState.round === 2}
			<RoundTwo bind:state={gameState} />
		{/if}
		{#if gameState.round === 3}
			<div class="flex h-screen flex-col items-center justify-center">
				<h1 class="text-4xl font-bold text-neutral-900">
					<span class="text-blue-500">Auditory</span>
					<span class="text-red-500">Deceit</span>
				</h1>
				<p class="mt-4 max-w-3xl text-lg text-neutral-700">
					Thank you for playing the game! Your results are as follows:
				</p>
				<p class="mt-4 max-w-3xl text-lg text-neutral-700">
					Round 1: {gameState.results.roundOne.score}
				</p>
				<p class="mt-4 max-w-3xl text-lg text-neutral-700">
					Round 2: {gameState.results.roundTwo.score}
				</p>
				<button
					class="bg-primary-500 mt-4 rounded-md bg-blue-500 px-4 py-2 text-white"
					on:click={async () => {
						await sendState();
						gameState.round = 0;
						gameState.gameStarted = false;
						gameState.results.roundOne.score = 0;
						gameState.results.roundTwo.score = 0;
					}}>Submit</button
				>
				<button
					class="mt-4 rounded-lg bg-yellow-500 p-1"
					on:click={() => {
						gameState.round = 0;
						gameState.gameStarted = false;
						gameState.results.roundOne.score = 0;
						gameState.results.roundTwo.score = 0;
					}}>Home</button
				>
			</div>
		{/if}
		{#if gameState.round === 4}
			<div class="flex flex-col items-center justify-center pt-16">
				<h1 class="text-4xl font-bold text-neutral-900">
					<span class="text-blue-500">Auditory</span>
					<span class="text-red-500">Deceit</span>
					<span class="text-yellow-500">Leaderboard</span>
				</h1>
				{#if dbState.length > 0}
					<table class="mt-4 border border-neutral-500">
						<thead>
							<tr>
								<th class="border border-neutral-500">Name</th>
								<th class="border border-neutral-500">Age</th>
								<th class="border border-neutral-500">Round 1 Score</th>
								<th class="border border-neutral-500">Round 2 Score</th>
							</tr>
						</thead>
						<tbody>
							{#each dbState as state}
								<tr>
									<td class="border border-neutral-500">{state.name}</td>
									<td class="border border-neutral-500">{state.age}</td>
									<td class="border border-neutral-500">{state.roundOneScore}</td>
									<td class="border border-neutral-500">{state.roundTwoScore}</td>
								</tr>
							{/each}
						</tbody>
					</table>
					<button
						class="mt-4 rounded-lg bg-yellow-500 p-1"
						on:click={() => {
							gameState.round = 0;
							gameState.gameStarted = false;
							dbState = [];
						}}>Back</button
					>
				{:else}
					<p class="mt-4 max-w-3xl text-lg text-neutral-700">No results found.</p>
				{/if}
			</div>
		{/if}
	{:else}
		<div class="flex h-screen flex-col items-center justify-center">
			<h1 class="text-4xl font-bold text-neutral-900">
				<span class="text-blue-500">Auditory</span>
				<span class="text-red-500">Deceit</span>
			</h1>
			<button
				class="mt-4 rounded-lg bg-yellow-500 p-1"
				on:click={async () => {
					await getState();
					dbState.sort((a, b) => (b.roundTwoScore ?? 0) - (a.roundOneScore ?? 0));
					gameState.gameStarted = true;
					gameState.round = 4;
				}}>Leaderboard</button
			>
			<p class="mt-4 max-w-3xl text-lg text-neutral-700">
				The game will start with flashing a series of numbers and you will have to input what they
				were. You will go until you fail. The second part of the game will be
				the same thing but random, false numbers will be audibly played to you.
			</p>
			<form class="flex flex-col">
				<input
					type="text"
					class="mt-4 rounded-md border border-neutral-500 px-4 py-2"
					placeholder="Name (First and Last)"
					bind:value={gameState.name}
				/>
				<input
					type="number"
					class="mt-4 rounded-md border border-neutral-500 px-4 py-2"
					placeholder="Age"
					bind:value={gameState.age}
				/>
				<button
					class="bg-primary-500 mt-4 rounded-md bg-blue-500 px-4 py-2 text-white"
					on:click={() => {
						if (!gameState.name || !gameState.age) {
							alert('Please fill in your name and age');
							return;
						}
						gameState.gameStarted = true;
					}}>Start</button
				>
			</form>
		</div>
	{/if}
</main>
