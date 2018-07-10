import React from 'react';

import { NavSidebar } from './components/Nav';
import { ApiCard } from './components/Card';

export default ({ docs }) => (
	<div>
		<NavSidebar>
			{docs.map((api, i) => (
				<NavSidebar.Item key={i}>
					<ApiCard type='small' api={api} />
				</NavSidebar.Item>
			))}
		</NavSidebar>
	</div>
);
