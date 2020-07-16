<script>
	import { MidiPlayer } from './midi';

	const player = new MidiPlayer();
	let isPlay = false;
	let imgSrc = './play.png';
	
	function playBtnHandler() {
		if(isPlay) {
			player.stop();
			isPlay = false;
			imgSrc = './play.png';
		} else {
			player.play();
			isPlay = true;
			imgSrc = './pause.png';
		}
	}
</script>

<h1>web-piano</h1>
<img on:click={playBtnHandler} src={imgSrc} alt="кнопка играть">

	<style>
		img {
			width: 40px;
			height: 40px;
			cursor: pointer;
	}
	</style>