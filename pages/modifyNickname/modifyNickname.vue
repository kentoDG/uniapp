<template>
	<view class="page">
		<view class="section">
			<!-- <view class="modify-nickname-title">昵称修改</view> -->
			<uni-card class="uni-card" title="请输入新的昵称" :isFull="true" :isShadow="true">
				<input class="input" @input='modifyNickname' type="text" :value="newNickName" />
			</uni-card>
			<view class="footer-btn-con">
				<view class="foot-btn" @tap="editNickName">保存</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mixin from '@/common/mixin';
	export default {
		mixins: [mixin],
		data() {
			return {
				newNickName: ''
			}
		},
		computed: {},
		onLoad(options) {

		},
		methods: {
			async editNickName() {
				if (!this.newNickName) {
					uni.showToast({
						title: "请输入昵称",
						icon: "none",
						duration: 2000,
						success: () => {}
					})
					return
				}

				const [error, success] = await this.$httpRequest({
					url: "/api/user/update",
					data: {
						userName: this.newNickName
					},
					method: 'post'
				})
				if (success && success.data.code == 0) {
					uni.showToast({
						title: success.data.msg,
						icon: "none",
						duration: 2000,
						success: () => {}
					})
					this.newNickName=""
				} else {
					uni.showToast({
						title: success.data.msg,
						icon: "none",
						duration: 2000,
						success: () => {}
					})
				}
				return;
			},
			modifyNickname(e) {
				this.newNickName = e.detail.value;
			},

		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100%;
	}

	.section {
		padding: 40rpx 32rpx;
	}

	.modify-nickname-title {
		padding: 25rpx 0;
		font-size: 30rpx;
	}

	.input {
		height: 90rpx;
		border-bottom: 2rpx solid #EEEEEE;
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
		background: #34A2DA;
		color: white;
		font-size: 36rpx;
		font-weight: 400;
		width: 686rpx;
		height: 88rpx;
		border-radius: 44rpx;
	}
</style>
