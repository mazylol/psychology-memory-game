import { db } from '$lib/server/db';
import { state } from '$lib/server/schema';
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function GET() {
	try {
		const people = await db.select().from(state);
		return json(people);
	} catch (error) {
		console.error('Error fetching state:', error);
		return json({ success: false, error: 'Failed to fetch state' }, { status: 500 });
	}
}

export async function POST({ request }) {
	try {
		const data: any = await request.json();

		// check if person already exists, if so, update their scores (if they're higher than the previous ones)
		const people = await db.select().from(state);
		const person = people.find((person) => person.name === data.name);

		if (person) {
			if (data.results.roundOne.score > person.roundOneScore) {
				await db
					.update(state)
					.set({
						roundOneScore: data.results.roundOne.score
					})
					.where(eq(state.name, data.name))
					.run();
			}

			if (data.results.roundTwo.score > person.roundTwoScore) {
				await db
					.update(state)
					.set({
						roundTwoScore: data.results.roundTwo.score
					})
					.where(eq(state.name, data.name))
					.run();
			}

			return json({ success: true });
		}

		await db
			.insert(state)
			.values({
				name: data.name,
				age: data.age,
				roundOneScore: data.results.roundOne.score,
				roundTwoScore: data.results.roundTwo.score
			})
			.run();

		return json({ success: true });
	} catch (error) {
		console.error('Error inserting state:', error);
		return json({ success: false, error: 'Failed to insert state' }, { status: 500 });
	}
}
