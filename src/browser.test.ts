import { render } from "@testing-library/svelte";
import App from "src/browser.svelte";
import { browsers } from 'src/components/browser';

test("renders browsers page", () => {
  	const { getByText } = render(App);
  	const linkElement: HTMLElement = getByText(/Firefox/);
  	expect(linkElement).toBeInTheDocument();
});