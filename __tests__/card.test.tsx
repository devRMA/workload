import { render } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/atoms/card";

describe("Card", () => {
	it("renders its children", () => {
		const { getByText } = render(<Card>card content</Card>);
		expect(getByText("card content")).toBeInTheDocument();
	});

	it("forwards the ref to the underlying div", () => {
		const ref = createRef<HTMLDivElement>();
		render(<Card ref={ref}>card</Card>);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});

	it("merges custom className", () => {
		const { container } = render(<Card className="my-custom">card</Card>);
		expect(container.firstElementChild?.className).toContain("my-custom");
	});
});

describe("CardHeader", () => {
	it("renders its children", () => {
		const { getByText } = render(<CardHeader>header content</CardHeader>);
		expect(getByText("header content")).toBeInTheDocument();
	});

	it("forwards the ref to the underlying div", () => {
		const ref = createRef<HTMLDivElement>();
		render(<CardHeader ref={ref}>header</CardHeader>);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});

	it("merges custom className", () => {
		const { container } = render(
			<CardHeader className="my-custom">header</CardHeader>,
		);
		expect(container.firstElementChild?.className).toContain("my-custom");
	});
});

describe("CardTitle", () => {
	it("renders its children as an h3", () => {
		const { container, getByText } = render(
			<CardTitle>title content</CardTitle>,
		);
		expect(getByText("title content")).toBeInTheDocument();
		expect(container.querySelector("h3")).not.toBeNull();
	});

	it("forwards the ref to the underlying heading", () => {
		const ref = createRef<HTMLHeadingElement>();
		render(<CardTitle ref={ref}>title</CardTitle>);
		expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
	});

	it("merges custom className", () => {
		const { container } = render(
			<CardTitle className="my-custom">title</CardTitle>,
		);
		expect(container.querySelector("h3")?.className).toContain("my-custom");
	});
});

describe("CardContent", () => {
	it("renders its children", () => {
		const { getByText } = render(<CardContent>content body</CardContent>);
		expect(getByText("content body")).toBeInTheDocument();
	});

	it("forwards the ref to the underlying div", () => {
		const ref = createRef<HTMLDivElement>();
		render(<CardContent ref={ref}>content</CardContent>);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});

	it("merges custom className", () => {
		const { container } = render(
			<CardContent className="my-custom">content</CardContent>,
		);
		expect(container.firstElementChild?.className).toContain("my-custom");
	});
});
