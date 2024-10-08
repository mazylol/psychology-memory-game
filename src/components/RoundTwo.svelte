<script lang="ts">
	import { randomInt } from '$lib/numbers';
	import type { GameState } from '$lib/state';
	import { onMount } from 'svelte';

	import { Howl } from 'howler';

	const soundMap = new Map<number, Howl>();
	soundMap.set(1, new Howl({ src: ['/sounds/1.mp3'] }));
	soundMap.set(2, new Howl({ src: ['/sounds/2.mp3'] }));
	soundMap.set(3, new Howl({ src: ['/sounds/3.mp3'] }));
	soundMap.set(4, new Howl({ src: ['/sounds/4.mp3'] }));
	soundMap.set(5, new Howl({ src: ['/sounds/5.mp3'] }));
	soundMap.set(6, new Howl({ src: ['/sounds/6.mp3'] }));
	soundMap.set(7, new Howl({ src: ['/sounds/7.mp3'] }));
	soundMap.set(8, new Howl({ src: ['/sounds/8.mp3'] }));
	soundMap.set(9, new Howl({ src: ['/sounds/9.mp3'] }));

	export let state: GameState;

	let numbers: number[] = [];
	let currentNumber = randomInt(1, 9);
	numbers[0] = currentNumber;

	let showingNumber = false;
	let numberInput: string;

	function showNumber() {
		showingNumber = true;

		let random = randomInt(1, 9);
		while (random === currentNumber) {
			random = randomInt(1, 9);
		}

		soundMap.get(random).play();

		setTimeout(() => {
			showingNumber = false;
		}, 2000);
	}

	// this might cause problems later
	onMount(() => {
		showNumber();
	});
</script>

<div class="flex h-screen items-center justify-center">
	{#if showingNumber}
		<div class="text-6xl font-bold text-blue-500">{currentNumber}</div>
	{:else}
		<form>
			<input
				type="text"
				autofocus
				bind:value={numberInput}
				class="rounded-md border border-neutral-500 px-4 py-2"
			/>
			<button
				class="mb-4 ml-4 mt-4 rounded-md bg-blue-500 px-4 py-2 text-white"
				on:click={() => {
					// convert input to an array of numbers
					let numberArray = numberInput.split('').map((num) => parseInt(num));

					// validate each number
					for (let i = 0; i < numbers.length; i++) {
						if (numberArray[i] !== numbers[i]) {
							state.round += 1;

							break;
						} else {
							if (i === numbers.length - 1) {
								state.results.roundTwo.score += 1;
							}
						}
					}

					// add a new number
					currentNumber = randomInt(1, 9);
					numbers.push(currentNumber);

					// clear the input
					numberInput = '';
					numberArray = [];

					showNumber();
				}}>Submit</button
			>
		</form>
	{/if}
</div>
