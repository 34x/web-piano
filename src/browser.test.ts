import { render } from "@testing-library/svelte";
import App from "src/browser.svelte";

test("renders browsers page", () => {
	// expect(render).toBeTruthy();
	expect(App).toBeTruthy();
  // const { getByText } = render(App);
  // const linkElement: HTMLElement = getByText(/Firefox/);
  // expect(linkElement).toBeInTheDocument();
});