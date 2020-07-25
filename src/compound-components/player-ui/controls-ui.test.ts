import { render } from "@testing-library/svelte";
import App from "./controls-ui.svelte";

test("renders controls-ui component", () => {
    const { getByText } = render(App);
    // const linkElement: HTMLElement = getByText(/play\.png/);
    // expect(linkElement).toBeInTheDocument();
});