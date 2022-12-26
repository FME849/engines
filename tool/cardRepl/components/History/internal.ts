import {
	DuelCommand,
	DuelCommandType,
	DuelPlace,
} from '@metacraft/murg-engine';

interface CommandInfo {
	id: string;
	icon: string;
	idColor?: string;
	iconColor?: string;
}

export const getCommandInfo = ({
	type,
	target,
	payload,
}: DuelCommand): CommandInfo => {
	const { from, to } = target || {};
	const result: CommandInfo = {
		id: to?.id?.substring?.(3, 5),
		icon: '',
	};

	/* <--       ﯑ */
	if (type === DuelCommandType.CardMove) {
		result.id = from.id?.substring?.(3, 5);

		if (from.place === DuelPlace.Deck && to.place === DuelPlace.Hand) {
			result.icon = '﬷'; /* <- draw */
		} else if (to.place === DuelPlace.Ground) {
			result.icon = '﬷';
		} else if (to.place === DuelPlace.Grave) {
			result.icon = '';
			result.iconColor = 'magenta';
		}
	} else if (type === DuelCommandType.PlayerMutate) {
		if (payload?.health) {
			result.id = '♥';
			result.iconColor = payload.health > 0 ? 'green' : 'red';
			result.icon = payload.health > 0 ? '' : '';
		} else if (payload?.perTurnDraw) {
			result.id = '';
			result.iconColor = payload.perTurnDraw > 0 ? 'green' : 'red';
			result.icon = payload.perTurnDraw > 0 ? '' : '';
		} else if (payload?.perTurnTroop) {
			result.id = '﯑';
			result.iconColor = payload.perTurnTroop > 0 ? 'green' : 'red';
			result.icon = payload.perTurnTroop > 0 ? '' : '';
		} else {
			result.id = '';
		}
	} else if (type === DuelCommandType.DuelMutate) {
		result.id = 'T';
	}

	return result;
};
