import React from 'react';
import { cond, equals } from 'ramda';

import { apiCard } from './styles';

export const ApiCardSmall = ({ api: { url, method, name } }) => (
	<div style={apiCard.wraper}>
		<div style={apiCard.title}>
			<span style={apiCard.title__method}>{method}</span>
			<span style={apiCard.title__url}>{url}</span>
		</div>
		<div style={apiCard.subtitle}>{name}</div>
	</div>
);

export default ({ api, type }) => cond([
	[ equals('small'), <ApiCardSmall api={api} /> ],
])(type);
