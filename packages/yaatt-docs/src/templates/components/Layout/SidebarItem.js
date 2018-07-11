import React from 'react';

import { sidebar } from './styles';

export default ({ children }) => (
	<div style={sidebar.item}>
		{children}
	</div>
);
