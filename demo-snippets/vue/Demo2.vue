<template>
	<Page>
		<ActionBar>
			<NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
			<Label text="Demo 2" />
		</ActionBar>

		<StackLayout>
			<Label text="This is the second demo..." />
			<TextField phone="NG" :text="money" @textChange="onChange" />
		</StackLayout>
	</Page>
</template>

<script>
export default {
	data() {
		return {
			money: "",
		};
	},
	methods: {
		onChange({ value }) {
			this.money = value;
			console.log("Edit ", value);
		},
	},
};
</script>

<style lang="scss" scoped>
</style>