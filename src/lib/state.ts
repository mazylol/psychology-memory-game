export type GameState = {
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

export type DBState = {
	id: number | undefined;
	name: string | undefined;
	age: number | undefined;

	roundOneScore: number | undefined;
	roundTwoScore: number | undefined;
};
