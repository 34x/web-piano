/* src/app.svelte generated by Svelte v3.24.0 */
import {
	SvelteComponent,
	create_component,
	destroy_component,
	detach,
	element,
	init,
	insert,
	mount_component,
	noop,
	safe_not_equal,
	transition_in,
	transition_out
} from "/web-piano/web_modules/svelte/internal.js";

import PlayerUI from "/web-piano/bundle/compound-components/player-ui/player-ui.js";

function create_fragment(ctx) {
	let center;
	let playerui;
	let current;
	playerui = new PlayerUI({});

	return {
		c() {
			center = element("center");
			create_component(playerui.$$.fragment);
		},
		m(target, anchor) {
			insert(target, center, anchor);
			mount_component(playerui, center, null);
			current = true;
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(playerui.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(playerui.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(center);
			destroy_component(playerui);
		}
	};
}

class App extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment, safe_not_equal, {});
	}
}

export default App;