<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import config from '@/admin.config.js'
	 
	export default {
		computed: {
			...mapGetters({
				isLogin: 'user/isLogin'
			})
		},
		onLaunch: function() {
			console.log('App Launch')
			const that = this;
			if (!this.isLogin) {
				uni.reLaunch({
					url: config.login.url
				})
			}
		},
		onPageNotFound(msg) {
			uni.redirectTo({
				url: config.error.url
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onError: function() {
			console.log('App Error')
		}
	}
</script>

<style lang="scss">
	uni-page-body,
	html,
	body {
		height: 100%;
		background-color: #f4f4f4;
	}
</style>
