import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatBox } from "@/components/molecules/stat-box";

describe("StatBox", () => {
	it("renders with the default variant", () => {
		const { container, getByText } = render(
			<StatBox label="Total" value="10h" />,
		);
		expect(getByText("Total")).toBeInTheDocument();
		expect(getByText("10h")).toBeInTheDocument();
		expect(container.firstElementChild?.className).toContain("border-blue-100");
	});

	it("renders with the success variant", () => {
		const { container } = render(
			<StatBox label="Total" value="10h" variant="success" />,
		);
		expect(container.firstElementChild?.className).toContain(
			"border-emerald-100",
		);
	});

	it("renders with the warning variant", () => {
		const { container } = render(
			<StatBox label="Total" value="10h" variant="warning" />,
		);
		expect(container.firstElementChild?.className).toContain(
			"border-amber-100",
		);
	});

	it("renders with the danger variant", () => {
		const { container } = render(
			<StatBox label="Total" value="10h" variant="danger" />,
		);
		expect(container.firstElementChild?.className).toContain("border-red-100");
	});

	it("renders with the purple variant", () => {
		const { container } = render(
			<StatBox label="Total" value="10h" variant="purple" />,
		);
		expect(container.firstElementChild?.className).toContain(
			"border-purple-100",
		);
	});

	it("renders subValue only when provided", () => {
		const { queryByText, rerender } = render(
			<StatBox label="Total" value="10h" />,
		);
		expect(queryByText("extra info")).toBeNull();

		rerender(<StatBox label="Total" value="10h" subValue="extra info" />);
		expect(queryByText("extra info")).not.toBeNull();
	});

	it("renders the icon", () => {
		const { getByTestId } = render(
			<StatBox
				label="Total"
				value="10h"
				icon={<svg data-testid="stat-icon" />}
			/>,
		);
		expect(getByTestId("stat-icon")).toBeInTheDocument();
	});

	it("merges custom className", () => {
		const { container } = render(
			<StatBox label="Total" value="10h" className="my-custom" />,
		);
		expect(container.firstElementChild?.className).toContain("my-custom");
	});
});
