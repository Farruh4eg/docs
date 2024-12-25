<script lang='ts'>
    let {data} = $props();

</script>
{#if data}
    <pre>
        {data.data}
    </pre>
{/if}