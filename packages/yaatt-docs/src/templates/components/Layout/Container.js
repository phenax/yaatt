import React from 'react';

import { container } from './styles';

export default ({ children }) => (
	<div style={container.host}>
		{children}
	</div>
);
