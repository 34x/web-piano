<script>
    const browsers = [
        {name: 'Mozilla Firefox', link: 'https://www.mozilla.org/ru/firefox/'},
        {name: 'Chrome', link: 'https://www.google.com/chrome/'}
        ]
</script>

<center>
    <h2>К соажелнию наше приложожение работает только в браузерах Chrome и Mozilla Firefox</h2>
    <ul>
		{#each browsers as browser, index}
			<li>
				Скачать <a href={browser.link}>{browser.name}</a>
			</li>
		{/each}
    </ul>
</center>

<style>
    h2 {
        width: 50%;
    }
    ul {
        list-style: none;
        margin: 0px;
        padding: 0px;;
    }

    li {
        text-align: center;
        padding: 0.8em;
        border-bottom: 1px solid lightgray;
    }
</style>