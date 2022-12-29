export interface TemplateStyle {
	color?: string;
	size?: number;
	weight?: string;
}

export enum FragmentType {
	TEXT = 'text',
	KEYWORD = 'keyword',
}

export interface TemplateFragment {
	text: string;
	type: string;
	style?: TemplateStyle;
}

export enum ActivationType {
	Summon,
	Death,
	Passive,
	Attack,
	Defense,
	Glory,
	PreFight,
	PostFight,
	Charge,
	Inspire,
	Banner,
}

export enum InspireSource {
	Metal,
	Wood,
	Water,
	Fire,
	Earth,
	Dark,
	Light,
	Summon,
	Death,
	Spell,
	Skill,
}

export type SkillIds = 'UnitStealer';

export type SkillAttributes = Record<string, unknown> & {
	id: SkillIds;
};

export type SkillRunner = (
	duel: DuelState,
	card: Card,
	state: CardState,
) => DuelCommand[];

export interface Skill {
	template: TemplateFragment[] | string;
	charge?: number;
	activation?: ActivationType;
	inspire?: InspireSource;
	attribute?: SkillAttributes;
}

export interface Attribute {
	attack: number;
	health: number;
	defense: number;
	charge?: number;
}

export interface GenerativeValue {
	bare: number;
	enhanced: number;
	isCounter?: boolean;
	isCountered: boolean;
}

export enum CardType {
	Hero,
	Troop,
	Spell,
}

export enum ClassType {
	Assassin = '01',
	Knight = '02',
	Tanker = '03',
	Wizard = '04',
	Summoner = '05',
	Beast = '06',
}

export enum ElementalType {
	Metal = '01',
	Wood = '02',
	Water = '03',
	Fire = '04',
	Earth = '05',
	Light = '06',
	Dark = '07',
}

export interface Card {
	id: string;
	name: string;
	title?: string;
	kind: CardType;
	rarity: number;
	class: ClassType;
	elemental?: ElementalType;
	attribute?: Attribute;
	skill?: Skill;
}

export interface CardMeta {
	version: string;
	entities: string[];
	map: Record<string, Card>;
}

export enum DuelCommandType {
	CardSummon = 'CardSummon',
	CardMove = 'CardMove',
	CardMutate = 'CardMutate',
	CardDust = 'CardDust',
	PlayerMutate = 'PlayerMutate',
	DuelMutate = 'DuelMutate',
}

export enum DuelPlace {
	Deck = 'Deck',
	Hand = 'Hand',
	Ground = 'Ground',
	Grave = 'Grave',
	Ability = 'Ability',
	Player = 'Player',
}

export enum DuelPhases {
	Draw = 'Draw',
	Setup = 'Setup' /* <-- setup hero/troop/spell,  skill, */,
	PreFight = 'PreFight',
	Fight = 'Fight',
	PostFight = 'PostFight',
	CleanUp = 'CleanUp',
}

export type DuelCommandPayload = Partial<Attribute> & {
	gameOver?: boolean;
	turn?: number;
	phase?: DuelPhases;
	phaseOf?: string;
	perTurnDraw?: number;
	perTurnHero?: number;
	perTurnSpell?: number;
	perTurnTroop?: number;
};

export enum TargetSide {
	Left = 'left',
	Right = 'right',
}

export interface BoardTarget {
	place: DuelPlace;
	owner?: string;
	id?: string;
	index?: number;
}

export interface DuelCommandTarget {
	from?: BoardTarget;
	to?: BoardTarget;
}

export interface DuelCommand {
	type: DuelCommandType;
	owner?: string;
	target?: DuelCommandTarget;
	payload?: DuelCommandPayload;
	amount?: number;
}

export interface DuelSetting {
	initialCardCount: number;
	initialPlayerHealth: number;
	elementalFactor: number;
	handSize: number;
	groundSize: number;
	maxAttachment: number;
	perTurnDraw: number;
	perTurnHero: number;
	perTurnSpell: number;
	perTurnTroop: number;
}

export interface PlayerConfig {
	id: string;
	deck: string[];
}

export interface DuelConfig {
	version: string;
	setting: DuelSetting;
	firstMover: string;
	firstPlayer: PlayerConfig;
	secondPlayer: PlayerConfig;
}

export interface CardIdentifier {
	id: string;
	owner: string;
	place: DuelPlace;
}

export type CardState = Attribute & CardIdentifier;

export type PlayerState = Attribute & {
	id: string;
	perTurnDraw: number;
	perTurnHero: number;
	perTurnSpell: number;
	perTurnTroop: number;
};

export interface DuelState {
	setting: DuelSetting;
	cardMap: Record<string, Card>;
	stateMap: Record<string, CardState>;
	uniqueCardCount: number /* <-- important! to track unique card in a match */;
	turn: number;
	phase: DuelPhases;
	phaseOf: string;
	firstMover: string;
	firstPlayer: PlayerState;
	secondPlayer: PlayerState;
	firstDeck: string[];
	secondDeck: string[];
	firstHand: string[];
	secondHand: string[];
	firstGround: string[];
	secondGround: string[];
	firstGrave: string[];
	secondGrave: string[];
}

type CommandFields = 'owner' | 'target' | 'payload';

export type CommandCreator<K extends keyof DuelCommand = CommandFields> = (
	payload: Pick<DuelCommand, K>,
) => DuelCommand[];

export interface RunCommandPayload {
	duel: DuelState;
	command: DuelCommand;
}

export type CommandRunner<T = RunCommandPayload> = (
	payload: T,
) => Partial<DuelState>;

export enum BundleGroup {
	InitialDraw = 'InitialDraw',
	TurnDraw = 'TurnDraw',
	Summon = 'Summon',
	EndTurn = 'EndTurn',
	Setup = 'Setup' /* <-- setup hero/troop/spell,  skill, */,
	FightSkill = 'FightSkill',
	FightCombat = 'FightCombat',
	PhaseUpdate = 'PhaseUpdate',
	CleanUp = 'CleanUp',
	DuelUpdate = 'DuelUpdate',
}

export interface DuelCommandBundle {
	turn: number;
	group?: BundleGroup;
	phase: DuelPhases;
	phaseOf?: string;
	commands: DuelCommand[];
}

export interface MoveResult {
	duel?: DuelState;
	commandBundles: DuelCommandBundle[];
}

export type CommandHistory = DuelCommandBundle[];
