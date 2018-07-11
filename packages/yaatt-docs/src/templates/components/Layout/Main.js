import React from 'react';

import { main } from './styles';

export default ({ children }) => (
	<div style={main.host}>
		{children}
	</div>
);
