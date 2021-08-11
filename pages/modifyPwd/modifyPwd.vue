<template>
	<view class="page">
		<!-- <view class="modify-nickname-title">密码设置</view> -->
		<view class="section">
			<view class="label">请输入原始密码：</view>
			<view class="input-container">
				<input class="input" @input='oldPwdF' type="text" placeholder="请输入原始密码" />
			</view>
		</view>
		<view class="section">
			<view class="label">请输入新密码：</view>
			<view class="input-container">
				<input class="input" @input='newPwdF' type="text" placeholder="请输入新密码" />
			</view>
		</view>
		<view class="section">
			<view class="label">请再次输入密码：</view>
			<view class="input-container">
				<input class="input" @input='confirmPwdF' type="text" placeholder="请再次输入密码" />
			</view>
		</view>
		<view class="footer-btn-con">
			<view class="foot-btn" @tap="savePwd">保存</view>
		</view>
		<!-- <view class="saveNickName" @tap="savePwd">保存</view> -->

	</view>
</template>

<script>
	import mixin from '@/common/mixin';

	export default {
		mixins: [mixin],
		data() {
			return {
				oldPwd: '',
				newPwd: '',
				confirmPwd: ''
			}
		},
		computed: {},
		onLoad(options) {},
		methods: {
			oldPwdF(e) {
				this.oldPwd = e.detail.value;
			},
			newPwdF(e) {
				this.newPwd = e.detail.value;
			},
			confirmPwdF(e) {
				this.confirmPwd = e.detail.value;
			},
			checkParams() {
				return new Promise((resolve, reject) => {
					if (!this.oldPwd) {
						uni.showToast({
							title: '请输入密码',
							icon: "none",
							duration: 2000,
							success: () => {
								reject()
							}
						})
						return
					}
					if (!this.newPwd) {
						uni.showToast({
							title: '请输入新密码',
							icon: "none",
							duration: 2000,
							success: () => {
								reject()
							}
						})
						return
					}
					if (!this.confirmPwd) {
						uni.showToast({
							title: '请输入确认密码',
							icon: "none",
							duration: 2000,
							success: () => {
								reject()
							}
						})
						return
					}
					if (this.newPwd !== this.confirmPwd) {
						uni.showToast({
							title: '两次输入的密码不一致',
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
			savePwd() {
				console.log(this.oldPwd);
				console.log(this.newPwd);
				console.log(this.confirmPwd);
				this.checkParams().then(async (res) => {
					const [error, success] = await this.$httpRequest({
						url: "/api/user/resetPwd",
						data: {
							oldPassword: this.oldPwd,
							newPassword: this.newPwd
						},
						method: 'POST'
					})
					console.log('resres', error);
					console.log('resres', success);
					if (success && success.data.code == 0) {
						console.log('sssssssssssssssssssss');
						uni.switchTab({
							url: `/pages/user/user`
						})

					} else {
						uni.showToast({
							title: '请求失败',
							icon: "none",
							duration: 2000,
							success: () => {}
						})
					}
				})

			}
		}
	}
</script>

<style lang="scss">
	.page {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #FFFFFF;
		padding-top: 30rpx;
		box-sizing: border-box;
	}

	.modify-nickname-title {
		width: 692rpx;
		padding: 20rpx 0;
		font-size: 45rpx;
	}

	.section {
		width: 692rpx;
		height: 180rpx;
		background-color: #FFFFFF;
		padding: 20rpx 40rpx;
	}

	.label {
		font-size: 35rpx;
	}

	.input {
		height: 90rpx;
		border-bottom: 1rpx solid #dddddd;
	}

	.footer-btn-con {
		width: 750rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.saveNickName {
		width: 686rpx;
		height: 88rpx;
		border: 1rpx solid #dddddd;
		text-align: center;
		line-height: 88rpx;
		margin-top: 120rpx;
		font-size: 36rpx;
	}
	.footer-btn-con {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	
	.foot-btn {
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
</style>
