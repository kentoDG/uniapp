<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import config from '@/admin.config.js'
	
	export default {
		computed: {
			...mapGetters({
				isTokenValid: 'user/isTokenValid'
			})
		},
		onPageNotFound(msg) {
			uni.redirectTo({
				url: config.error.url
			})
		},
		onLaunch: function() {
			console.log('App Launch')
			console.log(this.isTokenValid)
			
			if (this.isTokenValid) {
				uni.redirectTo({
					url: config.login.url
				})
			}
			
			// #ifdef APP-PLUS
			// 一键登录预登陆，可以显著提高登录速度
			uni.preLogin({
				provider: 'univerify',
				success: (res) => {
					// 成功
					console.log("preLogin success: ", res);
				},
				fail: (res) => {
					// 失败
					console.log("preLogin fail res: ", res);
				}
			})
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onError:function(){
			console.log('App Error')
		}
	}
</script>

<style lang="scss">
	page{
		background-color: $page-bg-color;
	}

</style>
