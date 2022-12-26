import {
	CommandHistory,
	DuelState,
	getInitialState,
	mergeFragmentToState,
	move,
	MoveResult,
} from '@metacraft/murg-engine';
import clone from 'lodash/cloneDeep';

const cache = require('./0001.json');

export const initialState = getInitialState(cache.config);

export const replay = async () => {
	const duel: DuelState = clone(initialState);
	const commandHistory: CommandHistory = [];

	const runMove = (f: () => MoveResult) => {
		const { state, bundles } = f();

		mergeFragmentToState(duel, state);
		bundles.forEach((bundle) => commandHistory.push(bundle));
	};

	runMove(() => move.distributeCards(duel, 5));

	return {
		duel,
		history: commandHistory,
	};
};
