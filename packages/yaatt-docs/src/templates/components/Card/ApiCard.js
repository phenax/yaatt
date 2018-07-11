import React from 'react';
import { cond, equals } from 'ramda';

import { apiCard } from './styles';

export const ApiCardSmall = ({ api: { url, method, name } }) => (
	<div style={apiCard.small.host}>
		<div style={apiCard.small.title}>
			<span style={apiCard.small.title__method}>{method}</span>
			<span style={apiCard.small.title__url}>{url}</span>
		</div>
		<div style={apiCard.small.subtitle}>{name}</div>
	</div>
);

export const ApiCardBig = ({ api: { url, method, name } }) => (
	<div style={apiCard.big.host}>
		<div style={apiCard.big.title}>
			<span style={apiCard.big.title__method}>{method}</span>
			<span style={apiCard.big.title__url}>{url}</span>
		</div>
		<div style={apiCard.big.subtitle}>{name}</div>
	</div>
);

const ApiCard = ({ api, type }) => cond([
	[ equals('small'), <ApiCardSmall api={api} /> ],
	[ equals('big'), <ApiCardBig api={api} /> ],
])(type);

export default ApiCard;
