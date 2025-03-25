<script lang="ts">
	import { onMount } from 'svelte';

	let { data } = $props();

	onMount(() => {
		let a = document.createElement('a');

		document.body.append(a);

		a.download = 'file.txt';

		let blob = new Blob([data.data], {
			type: 'text/plain'
		});

		a.href = URL.createObjectURL(blob);

		a.click();

		a.remove();
	});
</script>

{#if data}
	<pre style="opacity: 0">
        {data.data}
    </pre>
{/if}
