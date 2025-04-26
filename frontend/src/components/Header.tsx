import React from 'react';

import "../styles/components/Header.scss"

const Header: React.FC = () => {
	return (
		<div className={"Header"}>
			<div>
				<img src="/img/logo.svg" />
				<div>NeumoBlog</div>
			</div>
			<div>
				{Object.entries({"Home":'/', "Blog":'.', "About":'/about'}).map(([n,t]) => (
					<a href={t}>
						<div>{n}</div>
					</a>
				))}
			</div>
		</div>
	);
};

export default Header;
