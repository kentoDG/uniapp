<template>
	<view class="page">
		<view class="section">
			<view class="login-title"></view>
			<view class="form">
				<view class="list-item">
					<view class="area-con">
						<navigator hover-class="none" open-type="navigate"
							url="/pages/address/country-choice?from=/pages/auth/login/login">
							<text class="country-text">{{countryAndCode}}</text>
							<uni-icons type="arrowdown"></uni-icons>
						</navigator>
					</view>
					<view class="input-con">
						<uni-easyinput type="number" :inputBorder="false" placeholder="请输入手机号"
							v-model="phone" />
					</view>

				</view>
				<view class="list-item">
					<view class="input-con">
						<uni-easyinput type="password" :inputBorder="false" placeholder="请输入密码" v-model="password" />
					</view>
				</view>
			</view>
			<view class="footer-btn-con">
				<view class="foot-btn" @click.stop="onLoginBtnTap">登录</view>
				<view class="register">
					<view class="code-login"  @click.stop="toCodeLogin">短信验证登录</view>
					<view class="register-new" @click.stop="toRegister">新用户注册</view>
				</view>
			</view>
		</view>
		<!-- <view class="login-title">输入手机号</view>
		<view class="border-bottom-solid-1 margin-side-xl margin-bottom-lg">
			<uni-forms ref="form" :border="true">
				<uni-forms-item name="phone">
					<view class="row-center-center">
						<navigator class="row-center-center" hover-class="none" open-type="navigate"
							url="/pages/address/country-choice?from=/pages/auth/login/login">
							<text class="country-text">{{countryAndCode}}</text>
							<uni-icons type="arrowdown"></uni-icons>
						</navigator>
						<uni-easyinput class="flex-1" type="number" :inputBorder="false" placeholder="请输入手机号"
							v-model="phone" />
					</view>
				</uni-forms-item>
				<uni-forms-item name="password">
					<uni-easyinput type="password" :inputBorder="false" placeholder="请输入密码" v-model="password" />
				</uni-forms-item>
			</uni-forms>
		</view>
		<view>
			<button class="border-radius-rect-circle  margin-side-xl" type="warn" @tap="onLoginBtnTap">
				<text class="font-size-lg">登录</text>
			</button>
		</view>
		<view class="row-between-center margin-side-xl margin-v-side-lg">
			<text class="font-size-lg text-color-greyblack"></text>
			<text class="font-size-lg text-color-greyblack" @tap="toRegister">注册</text>
		</view> -->
	</view>
</template>

<script>
	import mixin from '@/common/mixin';
	import {
		mapMutations
	} from 'vuex'
	export default {
		mixins: [mixin],
		data() {
			return {
				countryAndCode: '',
				phone: '',
				password: '',
				validateCode: ''
			};
		},
		computed: {
			isGetCaptchaBtnDisabled() {
				return this.phone.length === 0;
			},
			isLoginBtnDisabled() {
				return this.account.length === 0 || this.password.length === 0;
			}
		},
		onLoad(options) {
			const country = (options.country && JSON.parse(decodeURIComponent(options.country))) || {
				"area": "中国",
				"area_code": "+86",
				"pinyin": 'Z'
			};
			this.countryAndCode = country.area + '(' + country.area_code + ')';
		},

		methods: {
			async onLoginBtnTap() {
				const [error, success] = await this.$httpRequest({
					url: "/authorization/token",
					data: {
						loginName: this.phone,
						password: this.password,
						validateCode: 0
					},
					method: 'POST'
				})
				console.log('resres', error);
				console.log('resres', success);
				if (success && success.data.code == 0) {
					const token = success.data.token;
					uni.setStorageSync('token', token)
					uni.reLaunch({
						url: '/pages/index/index'
					})
				} else {
					uni.showToast({
						title: success.data.msg,
						icon: "none",
						duration: 2000,
						success: () => {}
					})
				}
			},

			async toRegister() {
				uni.navigateTo({
					url: '/pages/auth/register/register',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			async toCodeLogin(){
				uni.navigateTo({
					url: '/pages/auth/code-login/code-login',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}

		},
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100%;
	}

	.section {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.login-title {
		padding: 50rpx 0 20rpx;
		font-size: 30rpx;
	}

	.list-item {
		width: 686rpx;
		height: 90rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		padding: 10rpx;
		margin-bottom: 20rpx;

		.area-con {
			width: 180rpx;
			box-sizing: border-box;
			margin-right: 10rpx;
			overflow: hidden;
			/*超出部分隐藏*/
			white-space: nowrap;
			/*禁止换行*/
			text-overflow: ellipsis;
			/*省略号*/
		}

		.input-con {
			flex: 1;

			input {
				display: block;
				text-align: left;
				outline: none;
				border: none;
			}
		}
	}
	.footer-btn-con {
		width: 100%;
		// display: flex;
		// flex-direction: column;
		// align-items: center;
		.foot-btn {
			margin: 0 auto;
			margin-top: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background: $uni-bg-color-main;
			color: white;
			font-size: 36rpx;
			font-weight: 400;
			width: 686rpx;
			height: 88rpx;
			border-radius: 44rpx;
		}
		.register{
			width: 686rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			// text-align: right;
			font-size: 30rpx;
			padding-top: 20rpx;
			padding-right: 44rpx;
			padding-left: 44rpx;
		}
	}
	// .login-title {
	// 	width: 100%;
	// 	font-size: 28rpx;
	// 	margin: 40rpx 0 20rpx;
	// }

	.logo {
		width: 200rpx;
		height: 200rpx;
	}

	.country {
		padding: 0 10px;
	}

	.country-text {
		line-height: 2;
		font-size: 14px;
	}

	.line {
		flex: 1;
		width: 20rpx;
		height: 1px;
	}
</style>
