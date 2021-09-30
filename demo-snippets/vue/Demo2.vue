<template>
	<Page>
		<ActionBar>
			<NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
			<Label text="Demo 2" />
		</ActionBar>

		<StackLayout>
			<Label text="This is the second demo..." />
			<TextField text="+23408064088402" mask="+234 (0000) 000 0000" />
		</StackLayout>
	</Page>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>