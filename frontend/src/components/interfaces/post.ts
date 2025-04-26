export interface Tag {
	name: string;
}

interface Img {
	url: string;
}

interface Content {
	type: string;
}

interface BaseContent<T extends Content> extends Content {
	children: T[];
}

export interface TextContent extends Content {
	type: "text";
	text: string;
	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
	strikethrough?: boolean;
	code?: boolean;
}

export interface LinkContent extends BaseContent<TextContent> {
	type: "link";
	url: string;
}

export type ChildContent = TextContent | LinkContent;

export interface HeadingContent extends BaseContent<ChildContent> {
	type: "heading";
	level: number;
}

export interface ImageContent extends BaseContent<ChildContent> {
	type: "image";
	image: Img;
}

export interface ListItemContent extends BaseContent<ChildContent> {
	type: "list-item";
}

export interface ListContent extends BaseContent<ListItemContent | ListContent> {
	type: "list";
	format: "ordered" | "unordered";
	indentLevel?: number;
}

export interface Paragraph extends BaseContent<TextContent> {
	type: "paragraph";
}

export interface Quote extends BaseContent<TextContent> {
	type: "quote";
}

export type PrimaryContent = HeadingContent | ImageContent | ListContent | Paragraph | Quote;

interface Post {
	id: string;
	title: string;
	content: PrimaryContent[];
	tags: Tag[];
	cover?: Img[];
	publishedAt: Date;
	locale?: string;
}

class Post implements Post {
	static toPost({ id, documentId, title, content, tags, cover, publishedAt, locale }: any): Post {
		return {
			id: documentId ?? id,
			title,
			content,
			tags,
			cover,
			publishedAt: new Date(publishedAt),
			locale,
		};
	}
}

interface FetchError {
	status: number;
	message: string;
}

class FetchError implements FetchError {
	static async from(res: Response): Promise<FetchError> {
		return {
			status: res.status,
			message: await res.text(),
		};
	}

	static [Symbol.hasInstance](value: any) {
		return typeof value.status === "number" && typeof value.message === "string";
	}
}

export { Post, FetchError };
