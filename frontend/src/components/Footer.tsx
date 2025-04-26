import React from 'react';

import "../styles/components/Footer.scss"

const Footer: React.FC = () => {
	return (
		<div className={"Footer"}>
			<div>
				<img src="/img/logo.svg" />
				<div>NeumoBlog</div>
			</div>
			<div>
				<div>
					{["© 2024 Brand, Inc.", "Privacy", "Term", "Sitemap"].join("\\•\\").split("\\").map(e => (
						<div>{e}</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Footer;
