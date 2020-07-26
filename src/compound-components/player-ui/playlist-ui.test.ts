import { render } from "@testing-library/svelte";
import App from "./playlist-ui.svelte";

test("renders main app page", () => {
    const { getByText } = render(App);
    expect(getByText(/Adele - Someone Like You/)).toBeInTheDocument();
    expect(getByText(/Billy Joel - Piano Man/)).toBeInTheDocument();
    expect(getByText(/Fur Elise/)).toBeInTheDocument();
    expect(getByText(/Pixies - Where Is My Mind/)).toBeInTheDocument();
});