
import React from 'react';

import { Container, Main, Sidebar } from './components/Layout';
import { ApiCard } from './components/Card';

const getTestUrl = ({ id }) => `/test/${id}`;

export default ({ docs }) => (
	<div>
		<Container>
			<Sidebar>
				{docs.map(api => (
					<Sidebar.Item key={api.id}>
						<Sidebar.Link href={`#${getTestUrl(api)}`}>
							<ApiCard type='small' api={api} />
						</Sidebar.Link>
					</Sidebar.Item>
				))}
			</Sidebar>
			<Main>
				{docs.map(api => (
					<ApiCard
						id={getTestUrl(api)}
						type='big'
						api={api}
						key={api.id}
					/>
				))}
			</Main>
		</Container>
	</div>
);
