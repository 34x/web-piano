import { render } from "@testing-library/svelte";
import App from "./playlist-ui.svelte";

test("renders main app page", () => {
    const { getByText } = render(App);
    // const linkElement: HTMLElement = getByText(/Playlist/);
    // expect(linkElement).toBeInTheDocument();
});