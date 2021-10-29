<template>
	<Page>
		<ActionBar>
			<NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
			<Label text="Demo 1" />
		</ActionBar>

		<StackLayout>
			<Label text="The version is:" />
			<TextField currency="NGN" :text="money" @textChange="onChange" />
		</StackLayout>
	</Page>
</template>

<script>
export default {
	data() {
		return {
			money: 0,
		};
	},
	methods: {
		onChange({value}) {
			this.money = value;
			console.log("Edit ", value);
		},
	},
};
</script>

<style lang="scss" scoped></style>