import React from 'react';

import { Container, Main, Sidebar } from './components/Layout';
import { ApiCard } from './components/Card';

export default ({ docs }) => (
	<div>
		<Container>
			<Sidebar>
				{docs.map((api, i) => (
					<Sidebar.Item key={i}>
						<ApiCard type='small' api={api} />
					</Sidebar.Item>
				))}
			</Sidebar>
			<Main>
				{docs.map((api, i) => (
					<ApiCard type='big' api={api} key={i} />
				))}
			</Main>
		</Container>
	</div>
);
