export type State = {
	name: string;
	age: number | undefined;

	gameStarted: boolean;

	round: number;

	results: {
		roundOne: {
			score: number;
		};

		roundTwo: {
			score: number;
		};
	};
};
