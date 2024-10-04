export type State = {
	name: string;
	age: number | undefined;

	gameStarted: boolean;

	round: number;

	results: {
		roundOne: {
			score: number;
			answerTimes: number[];
		};

		roundTwo: {
			score: number;
			answerTimes: number[];
		};
	};
};
