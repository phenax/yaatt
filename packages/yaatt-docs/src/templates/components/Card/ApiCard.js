import React from 'react';
import { cond, equals } from 'ramda';

import * as s from './styles';

export const ApiCardSmall = ({ api: { url, method, name }, ...props }) => (
	<s.ApiCard.small {...props}>
		<s.ApiCard.small.Title>
			<s.ApiCard.small.Method>{`${method} `}</s.ApiCard.small.Method>
			<s.ApiCard.small.Url>{url}</s.ApiCard.small.Url>
		</s.ApiCard.small.Title>
		<s.ApiCard.small.Subtitle>
			{name}
		</s.ApiCard.small.Subtitle>
	</s.ApiCard.small>
);

export const ApiCardBig = ({ api: { url, method, name }, ...props }) => (
	<div style={{ height: '800px', width: '100%', border: '1px solid #000' }} {...props} />
);

const ApiCard = ({ api, type, ...props }) => cond([
	[ equals('small'),   () => <ApiCardSmall api={api} {...props} />   ],
	[ equals('big'),     () => <ApiCardBig api={api} {...props} />     ],
])(type);

export default ApiCard;
