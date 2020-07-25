import { render } from "@testing-library/svelte";
import App from "src/app.svelte";

test("renders main app page", () => {
    const { getByText } = render(App);
    const linkElement: HTMLElement = getByText(/Playlist/);
    expect(linkElement).toBeInTheDocument();
});