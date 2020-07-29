import { render } from "@testing-library/svelte";
import App from "./player-ui.svelte";

test("renders compound player ui", () => {
    const { getByText } = render(App);
    const linkElement: HTMLElement = getByText(/Playlist/);
    expect(linkElement).toBeInTheDocument();
});