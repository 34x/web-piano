<script>
import {browsers} from 'src/components/browser'
</script>

<center>
    <h2>Unfortunately our app works only in the following browsers.</h2>
    <ul class="browsers-links">
		{#each browsers as browser, index}
			<li class="browsers-links__item">
				Download: <a href={browser.link}>{browser.name}</a>
			</li>
		{/each}
    </ul>
</center>

<style>
    h2 {
        width: 50%;
    }
    .browsers-links {
        list-style: none;
        margin: 0px;
        padding: 0px;;
    }
    .browsers-links__item {
        text-align: center;
        padding: 0.8em;
        border-bottom: 1px solid lightgray;
    }


</style>