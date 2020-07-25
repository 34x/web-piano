import './controls-ui.css.proxy.js';
/* src/compound-components/player-ui/controls-ui.svelte generated by Svelte v3.24.0 */
import {
	SvelteComponent,
	append,
	attr,
	detach,
	element,
	init,
	insert,
	listen,
	noop,
	safe_not_equal
} from "/web-piano/web_modules/svelte/internal.js";

import { MidiPlayer, MidiPlayerState } from "/web-piano/bundle/compound-components/midi-player/index.js";
import { createEventDispatcher } from "/web-piano/web_modules/svelte.js";

function create_fragment(ctx) {
	let center;
	let img;
	let img_src_value;
	let mounted;
	let dispose;

	return {
		c() {
			center = element("center");
			img = element("img");
			if (img.src !== (img_src_value = /*buttonImage*/ ctx[0])) attr(img, "src", img_src_value);
			attr(img, "alt", "кнопка играть");
			attr(img, "class", "svelte-13qs7mt");
		},
		m(target, anchor) {
			insert(target, center, anchor);
			append(center, img);

			if (!mounted) {
				dispose = listen(img, "click", /*playBtnHandler*/ ctx[1]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*buttonImage*/ 1 && img.src !== (img_src_value = /*buttonImage*/ ctx[0])) {
				attr(img, "src", img_src_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(center);
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
			? value
			: new P(function (resolve) {
						resolve(value);
					});
		}

		return new (P || (P = Promise))(function (resolve, reject) {
				function fulfilled(value) {
					try {
						step(generator.next(value));
					} catch(e) {
						reject(e);
					}
				}

				function rejected(value) {
					try {
						step(generator["throw"](value));
					} catch(e) {
						reject(e);
					}
				}

				function step(result) {
					result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
				}

				step((generator = generator.apply(thisArg, _arguments || [])).next());
			});
	};

	let { fileInfo = undefined } = $$props;
	let { midiFileInfo = undefined } = $$props;
	const dispatch = createEventDispatcher();
	const player = new MidiPlayer();
	let playerState = player.getState();
	player.onStateChange(event => $$invalidate(4, playerState = event.state));

	function loadSongUrl(filename) {
		return __awaiter(this, void 0, void 0, function* () {
			yield player.loadUrl("/web-piano/midi/" + filename);
			$$invalidate(2, midiFileInfo = player.getInfo());
		});
	}

	function startNewSong(info) {
		if (info) {
			loadSongUrl(info.filename);
		}
	}

	
	

	function playBtnHandler() {
		if (player.getState() === MidiPlayerState.playing) {
			player.stop();
		} else {
			player.play();
		}
	}

	const getButtonImage = state => state === MidiPlayerState.playing
	? "./pause.png"
	: "./play.png";

	$$self.$set = $$props => {
		if ("fileInfo" in $$props) $$invalidate(3, fileInfo = $$props.fileInfo);
		if ("midiFileInfo" in $$props) $$invalidate(2, midiFileInfo = $$props.midiFileInfo);
	};

	let buttonImage;

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*fileInfo*/ 8) {
			$: {
				startNewSong(fileInfo);
			}
		}

		if ($$self.$$.dirty & /*midiFileInfo*/ 4) {
			$: {
				dispatch("midiChanched", midiFileInfo);
			}
		}

		if ($$self.$$.dirty & /*playerState*/ 16) {
			$: $$invalidate(0, buttonImage = getButtonImage(playerState));
		}
	};

	return [buttonImage, playBtnHandler, midiFileInfo, fileInfo];
}

class Controls_ui extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { fileInfo: 3, midiFileInfo: 2 });
	}
}

export default Controls_ui;