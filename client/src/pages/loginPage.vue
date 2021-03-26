<template>
	<div class="login flex columns j-center a-center">
		<h1>login</h1>
		<p v-if="loginError">{{ loginError }}</p>
		<form
			@click="resetError"
			@submit.prevent="logUser()"
			class="flex columns"
		>
			<input type="text" v-model="username" placeholder="username" />
			<input type="password" v-model="password" placeholder="password" />
			<button class="pill-pad">Log in</button>
		</form>
	</div>
</template>

<style lang="scss" scoped>
.login {
	border: 1px solid #dddddd;
	form {
		padding: 10px;
		border: 1px solid #dddddd;
		input,
		button {
			margin-bottom: 10px;
			border-bottom: 1px solid #dddddd;
		}
		button {
			cursor: pointer;
			outline: none;
			&:hover {
				filter: brightness(85%);
			}
		}
	}
}
</style>

<script>
export default {
	name: "Login",
	data() {
		return {
			username: "",
			password: "",
		};
	},
	methods: {
		async logUser() {
			try {
				const { username, password } = this;
				console.log({ username, password });

				const loginRes = await this.$store.dispatch({
					type: "user/login",
					user: { username, password },
				});

				if (this.loginError) {
					console.log({ error });
					this.resetError();
					return;
				}

				this.$router.push("/");
			} catch (error) {
				console.log(
					"🚀 ~ file: loginPage.vue ~ line 50 ~ logUser ~ error",
					error
				);
			}
		},
		resetError() {
			this.$store.commit({ type: "user/setError", error: "" });
		},
	},
	computed: {
		loginError() {
			return this.$store.getters["user/error"];
		},
	},
	created() {
		this.$store.commit({
			type: "toggleHeroImage",
			toggleShow: false,
		});
	},
};
</script>