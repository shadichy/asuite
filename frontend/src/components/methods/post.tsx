import type { PrimaryContent, ChildContent, TextContent, LinkContent, ListContent } from "../interfaces/post";

// Render TextContent with formatting options
function renderTextContent(content: TextContent) {
	let element;
	element = content.text;
	if (content.code) {
		element = <code>{element}</code>;
	}
	if (content.bold) {
		element = <strong>{element}</strong>;
	}
	if (content.italic) {
		element = <em>{element}</em>;
	}
	if (content.underline) {
		element = <u>{element}</u>;
	}
	if (content.strikethrough) {
		element = <del>{element}</del>;
	}
	return element;
}

// Render LinkContent by rendering its child TextContent elements.
function renderLinkContent(content: LinkContent) {
	return <a href={content.url}>{content.children.map((child) => renderTextContent(child))}</a>;
}

// Render ChildContent which can be TextContent or LinkContent.
function renderChildContent(content: ChildContent) {
	switch (content.type) {
		case "text":
			return renderTextContent(content);
		case "link":
			return renderLinkContent(content);
		default:
			return <></>;
	}
}

// Render "list" content
function renderListContent(content: ListContent) {
	// Apply optional indent style if indentLevel is provided.
	const indentStyle = content.indentLevel ? { paddingLeft: `${content.indentLevel * 20}px` } : {};

	const children = content.children.map((item) => {
		switch (item.type) {
			case "list-item":
				return <li>{item.children.map((child) => renderChildContent(child))}</li>;
			case "list":
				return <PrimaryContentRenderer content={item} />;
			default:
				return <></>;
		}
	});

	switch (content.format) {
		case "ordered":
			return <ol style={indentStyle}>{children}</ol>;
		case "unordered":
			return <ul style={indentStyle}>{children}</ul>;
		default:
			return <></>;
	}
}

// Main component to render PrimaryContent types
export default function PrimaryContentRenderer({ content }: { content: PrimaryContent }) {
	switch (content.type) {
		case "heading": {
			const children = content.children.map((child) => renderChildContent(child));
			switch (content.level) {
				case 1:
					return <h1>{children}</h1>;
				case 2:
					return <h2>{children}</h2>;
				case 3:
					return <h3>{children}</h3>;
				case 4:
					return <h4>{children}</h4>;
				case 5:
					return <h5>{children}</h5>;
				case 6:
					return <h6>{children}</h6>;
				default:
					return <h1>{children}</h1>;
			}
		}
		case "image": {
			return (
				<figure>
					<img src={content.image.url} alt="" />
					{content.children && content.children.length > 0 && <figcaption>{content.children.map((child) => renderChildContent(child))}</figcaption>}
				</figure>
			);
		}
		case "list": {
			return renderListContent(content);
		}
		case "paragraph": {
			return <p>{content.children.map((child) => renderChildContent(child))}</p>;
		}
		case "quote": {
			return <blockquote>{content.children.map((child) => renderChildContent(child))}</blockquote>;
		}
		default:
			return <></>;
	}
}
