import { render } from "@testing-library/svelte";
import App from "./app.svelte";

test("renders learn svelte link", () => {
  const { getByText } = render(App);
  const linkElement: HTMLElement = getByText(/Playlist/);
  expect(linkElement).toBeInTheDocument();
});