<style>
</style>

<page>
    <actionBar title="Svelte Demo" />
    <scrollView>
        <stackLayout>
            {#each demos as demo}
                <button
                    text={demo.name}
                    on:tap={() => {
                        goToDemo(demo.component);
                    }} />
            {/each}
        </stackLayout>
    </scrollView>
</page>

<script lang="typescript">
    import { navigate } from 'svelte-native';
    import { onMount } from 'svelte';
    import { demos } from '../../demo-snippets/svelte/install';
    function goToDemo(component) {
        navigate({
            page: component,
            animated: true,
            transition: {
                name: 'slideLeft',
                duration: 200,
                curve: 'ease'
            }
        });
    }
    onMount(() => {
        if (demoRedirect) {
            const Demo = demos.find(({ path }) => path === demoRedirect);
            if (Demo) {
                setTimeout(() => {
                    navigate({
                        page: Demo.component,
                        animated: false
                    });
                }, 0);
            }
        }
    });
</script>