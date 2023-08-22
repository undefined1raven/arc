<script lang="ts">
	import Label from '../../components/common/Label.svelte';
	import globalStyle from '../../stores/globalStyles';
</script>

<Label text="xx" color={$globalStyle.activeMono} />
