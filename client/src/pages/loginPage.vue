<template>
	<div class="login flex columns j-center a-center">
		<h1>login</h1>
		<p v-if="loginError">{{ loginError }}</p>
		<form
			@click="resetError"
			@submit.prevent="logUser()"
			class="flex columns"
		>
			<label for="username">username:</label>
			<input
				type="text"
				id="username"
				v-model="username"
				placeholder="username"
			/>
			<label for="password">password:</label>
			<input
				type="password"
				id="password"
				v-model="password"
				placeholder="password"
			/>
			<!-- <button class="pill-pad">Log in</button> -->
			<button
				class="log-in"
				@mousemove="recordPos"
				:style="{ backgroundImage: gradient }"
			>
				Log in
			</button>
		</form>
	</div>
</template>

<style lang="scss" scoped>
.login {
	max-width: 1210px;
	height: 82vh;
	top: 0;
	form {
		padding: 100px;
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
	.log-in {
		cursor: pointer;
		font-size: 16px !important;
		line-height: 20px !important;
		font-weight: 600 !important;
		border-radius: 8px !important;
		outline: none !important;
		padding: 14px 24px !important;
		margin-top: 15px;
		width: 100%;
		transition: box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s,
			-webkit-transform 0.1s ease 0s, transform 0.1s ease 0s !important;
		border: none !important;
		background-image: linear-gradient(
			circle at center center,
			rgb(255, 56, 92) 0%,
			rgb(230, 30, 77) 27.5%,
			rgb(227, 28, 95) 40%,
			rgb(215, 4, 102) 57.5%,
			rgb(189, 30, 89) 75%,
			rgb(189, 30, 89) 100%
		) !important;
		color: white;
	}
}
</style>

<script>
import { socketService } from "../services/socket.service";
export default {
	name: "Login",
	data() {
		return {
			username: "magic_jhonson",
			password: "123456",
			mouseX: 0,
			mouseY: 0,
		};
	},
	methods: {
		recordPos(ev) {
			const { layerX, layerY } = ev;
			this.mouseX = layerX;
			this.mouseY = layerY;
		},
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
		gradient() {
			return `radial-gradient(at ${this.mouseX}% 100%, rgb(255, 56, 92) 0%,rgb(230, 30, 77) 27.5%, rgb(227, 28, 95) 40%, rgb(215, 4, 102) 57.5%, rgb(189, 30, 89) 75%, rgb(189, 30, 89) 100%)`;
			// radial-gradient(circle at center center, rgb(255, 56, 92) 0%, rgb(230, 30, 77) 27.5%, rgb(227, 28, 95) 40%, rgb(215, 4, 102) 57.5%, rgb(189, 30, 89) 75%, rgb(189, 30, 89) 100%) !important
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