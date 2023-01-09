import { SkillIds, SkillRunner } from '../utils/type';

import { destroyFacingMinHealth, frontMutate, selfMutate } from './mutate';
import { unitStealer } from './steal';

export const skillMap: Record<SkillIds, SkillRunner> = {
	UnitStealer: unitStealer,
	SelfMutate: selfMutate,
	FrontMutate: frontMutate,
	DestroyFacingMinHealth: destroyFacingMinHealth,
};
