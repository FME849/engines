import { FC } from 'react';
import { CardState } from '@cocrafts/card';
import { Box, Text } from 'ink';

import GraveCard from './GraveCard';

interface Props {
	color?: string;
	cards?: CardState[];
}

export const GraveYard: FC<Props> = ({ color, cards }) => {
	return (
		<Box alignSelf="center" borderStyle="round" borderColor="#323232">
			{cards.map((item, i) => {
				return <GraveCard item={item} key={i} />;
			})}
			<Text color={color}> • </Text>
		</Box>
	);
};

GraveYard.defaultProps = {
	color: '#323232',
};

export default GraveYard;
