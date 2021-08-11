<template>
	<view class="content">
		<view class="login_from">
			<view class="login_from_input">
				<view class="login_from_name">手机号</view>
				<view class="login_from_fun">
					<input type="number" @input="modifyPhone" placeholder="请输入手机号码">
				</view>
			</view>
			<view class="login_from_input">
				<view class="login_from_name">验证码</view>
				<view class="login_from_fun">
					<input style="width: 40%; text-align: left" type="digit" @input="modifyValidateCode" maxlength="6"
						placeholder="验证码">
					<text class="getyzm" v-if="yzmbotshou" @click="getyzm">获取验证码</text>
					<text class="getyzm" style="color: #888;" v-if="yzmbothide">{{times}}秒后重新获取</text>
				</view>
			</view>
			<view class="foot-btn" @click="denglu">登录</view>
		</view>
	</view>
</template>

<script>
	import mixin from '@/common/mixin';
	let interval = null;
	export default {
		mixins: [mixin],
		data: function() {
			return {
				phone: '',
				validateCode: '',
				times: 60,
				yzmbotshou: true,
				yzmbothide: false
			}
		},
		methods: {
			modifyPhone(e) {
				this.phone = e.detail.value
			},
			modifyValidateCode(e) {
				this.validateCode = e.detail.value;
			},
			async getyzm() {
				if (!this.phone) {
					uni.showToast({
						title: '请输入手机号',
						icon: "none",
						duration: 2000,
						success: () => {}
					})
					return
				}
				const [error, res] = await this.$httpRequest({
					url: `/authorization/smsCode/${this.phone}`
				})

				if (error || res && res.data.code !== 0) {
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 2000,
						success: () => {}
					})
					return
				}
				this.cutdown()
			},
			cutdown() {
				var num = 60;
				this.yzmbotshou = false,
					this.yzmbothide = true
				interval = setInterval(() => {
					--this.times
				}, 1000)
				setTimeout(() => {
					clearInterval(interval)
					this.yzmbotshou = true,
						this.yzmbothide = false,
						this.times = num
				}, 60000)
			},
			checkParams() {
				return new Promise((resolve, reject) => {
					if (!this.phone) {
						uni.showToast({
							title: '请输入手机号',
							icon: "none",
							duration: 2000,
							success: () => {
								reject()
							}
						})
						return
					}
					resolve('success')
				})
			},
			async denglu() {
				const self = this;
				this.checkParams().then(async (v) => {
					const [error, res] = await this.$httpRequest({
						url: `/authorization/token`,
						data: {
							loginName: self.phone,
							validateCode: self.validateCode
						},
						method: 'POST'
					})
					if (res && res.data.code == 0) {
						const token = res.data.token;
						uni.setStorageSync('token', token)
						uni.reLaunch({
							url: '/pages/index/index',
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
					} else if (res && res.data.code != 0) {
						uni.showToast({
							title: res.data.msg,
							icon: "none",
							duration: 2000,
							success: () => {}
						})
						return
					}
				})
			}
		},
		onHide() {
			// clearInterval(interval)
		},
		onUnload() {
			clearInterval(interval)
		}
	}
</script>

<style lang="scss">
	.page {
		background: #fff;
	}

	.logo {
		width: 200rpx;
		height: 200rpx;
	}

	.register-btn-list {
		margin-top: 150rpx;

	}

	.fillbg {
		/* background-color: #FFFFFF; */
		width: 692rpx;
		margin: 0 auto;
	}

	.fill-intitle {

		text-align: center;
		margin-top: 40rpx;

		text {
			font-size: 60rpx;
			font-weight: bold;
		}
	}

	.uplogo-txt {
		color: #999999;
	}

	.sex-box {
		text-align: center;

		.text {
			display: inline-block;

			.radio {
				width: 200rpx;
			}

		}
	}

	.login_img {
		width: 100%;
		height: auto;
		margin-top: 90upx;
	}

	.login_img image {
		width: 170upx;
		height: 170upx;
		display: block;
		margin: 0px auto;
		border-radius: 50%;
	}

	.login_from {
		width: 100%;
		height: auto;
		box-sizing: border-box;
		padding: 10rpx 30rpx;
	}

	.login_from_input {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px #eee solid;
		padding: 40upx 0px;
		margin: 0px auto;
	}

	.login_from_name {
		width: 25%;
	}

	.login_from_fun {
		width: 80%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}

	.login_from_fun input {
		width: 100%;
		text-align: left;
		font-size: 14px;
	}


	.login_from_dl {
		width: 100%;
		height: 50px;
		line-height: 50px;
		margin-top: 150upx;
	}

	.login_from_dl {
		width: 100%;
		height: 50px;
		line-height: 50px;
		background: $uni-bg-color-main;
		color: #fff;
		border-radius: 50px;
		
	}
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
		width: 100%;
		height: 88rpx;
		border-radius: 44rpx;
	}

	.logo_xieyi {
		width: 100%;
		height: 40px;
		line-height: 40px;
		display: flex;
		flex-direction: row;
		margin-top: 30upx;
		align-items: center;
		color: #444;
		font-size: 14px;
		justify-content: center;
	}

	.logo_xieyi label {
		font-size: 18px;
		margin-right: 1%;
	}

	.cuIcon-squarecheckfill {
		color: #FF3B00;
	}

	.logo_text text {
		color: #FF3B00;
	}

	.getyzm {
		width: 60%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		color: #FF3B00;
	}

	.cuicon {
		font-size: 18px;
	}
</style>
