<template>
    <div class="login-content">
			<div class="container">
				<div class="row">
					<div class="col-md-6 col-lg-5 mx-auto">
						<div class="login-wrap">
							
							<div class="login-header">
								<h3>Selamat Datang</h3>
								<p>Silahkan Masukkan Email / NIP dan Password Anda</p>								
							</div>
							
							<!-- Login Form -->
							<b-form @submit.prevent="login">
								<div class="form-group group-img">
								<div class="group-img">
										<i class="feather-mail"></i>
										<b-form-input id="email" v-model="email" type="text" class="form-control" placeholder="Email / NIP" />
									</div>
								</div>
								<div class="form-group">
									<div class="pass-group group-img">
										<span class="lock-icon"><i class="feather-lock"></i></span>
											<b-form-input
												v-if="showPassword"
												id="password"
												v-model="password"
												type="text"
												class="form-control pass-input"
												placeholder="password"
										/>
										<b-form-input
											v-else v-model="password"
											type="password"
											class="form-control pass-input" placeholder="Password" />
										<span
											class="toggle-password"
											:class="{
											'feather-eye': showPassword,
											'feather-eye-off': !showPassword,
											}"
											@click="toggleShow"
										></span>
									</div>
								</div>
								<div class="row">
									<div class="col-md-6 col-sm-6">
										<label class="custom_check">
											<input type="checkbox" name="rememberme" class="rememberme">
											<span class="checkmark"></span>Ingat Saya?
										</label>
									</div>									
									<div class="col-md-6 col-sm-6">
										<div class="text-md-end">
											<router-link class="forgot-link" to="forgot-password">Lupa Password?</router-link>
										</div>
									</div>									
								</div>
								<b-button variant="primary w-100 login-btn" type="submit" :disabled="loading">
									<span v-if="!loading"><b><i-solar-login-3-outline /> Masuk</b></span>
									<span v-else><i-svg-spinners-bars-scale-middle />  Assalamualaikum...</span>
								</b-button>						
							</b-form>
							<!-- /Login Form -->
											
						</div>
					</div>
				</div>
				
			</div>
		</div>
</template>

<script>
	export default {
		data() {
		return {
			title: "Profile",
			title1: "User Profile",
				showPassword: false,
			email: null,
			password: null,
				title01: "Profile",
			title2: "User Profile",
				showPassword2: false,
			password2: null,
			loading: false,
			};
	},
	computed: {
		buttonLabel() {
			return this.showPassword ? "Hide" : "Show";
		},
	},
	created() {
		window.scrollTo(0,0)
    },
	methods: {
		toggleShow() {
			this.showPassword = !this.showPassword;
		},
		async login() {
    try {
		this.loading = true;

        const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/login', {
          email: this.email,
          password: this.password,
		  app_token: import.meta.env.VITE_APP_TOKEN_APP
        });
		
			if(response.data.success === true) {
				console.log(response.data.data.noid)

				localStorage.setItem('user',JSON.stringify(response.data.data))
				localStorage.setItem('token',response.data.data.token)

				this.$toast.fire({
					title: response.data.message,
					icon: 'success',
				})
				
				let searchParams = new URLSearchParams(window.location.search);

				if (searchParams.has("redirect")) {
					this.$router.push({ path: `${searchParams.get("redirect")}` });
				} else this.$router.push({ path: "/dashboard" });
			}else{
				this.$toast.fire({
					title: response.data.message,
					icon: 'error',
				})
			}
		} catch (error) {
			this.$toast.fire({
					title: error,
					icon: 'error',
				})
		} finally {
			this.loading = false;
		}
    },
	},
};
</script>