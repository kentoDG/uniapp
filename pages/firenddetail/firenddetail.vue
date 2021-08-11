<template>
	<view class="firend-detail-box">

		<view class="firend-detail f-header">
			<view class="f-left">
				<image class="f-left-image" src="../../static/mock/avatars/1.jpg" mode="heightFix"></image>
			</view>
			<view class="f-right">
				<text class="f-right-txtname">昵称：张卫军</text>
			</view>
		</view>
		<view class="firend-detail f-content">
			<view class="fcon-left">
				手机号
			</view>
			<view class="fcon-right">
				1384383838438
			</view>
		</view>
		<view class="firend-detail f-content">
			<view class="fcon-left">
				性别
			</view>
			<view class="fcon-right">
				女
			</view>
		</view>
		<view class="firend-detail f-content">
			<view class="fcon-left">
				所在地区
			</view>
			<view class="fcon-right">
				河南郑州
			</view>
		</view>
		<view class="firend-detail f-content">
			<view class="fcon-left">
				生日
			</view>
			<view class="fcon-right">
				1993-6-26
			</view>
		</view>
		<view class="firend-detail f-content f-arrow">
			<view class="fcon-left">
				权限
			</view>
			<view class="fcon-right" @click="firendaccess">
				管理员
				<view class="fir-arrow-right">

				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				firendDetail: {}
			}

		},
		methods: {
			async getFirendDetailList() {
				const [error, success] = await this.$httpRequest({
					url: "/api/user/update",
					data: {
						sex: this.sex
					},
					method: 'POST'
				})
				console.log('resres', error);
				console.log('resres', success);
				if (success && success.data.code == 0) {
					this.getuserinfo()

				} else {
					uni.showToast({
						title: success.data.msg,
						icon: "none",
						duration: 2000,
						success: () => {}
					})
				}
			},
			firendaccess() {
				uni.navigateTo({
					url: '/pages/accessmanage/accessmanage',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
				return;
			},
		}
	}
</script>

<style>
	.firend-detail-box {
		padding: 20rpx;
		border-radius: 20rpx;
		border-bottom-width: 2rpx;
		border-color: rgba(153, 153, 153, .5);
		border-style: solid;
		padding-bottom: 80rpx;
		margin: 10rpx 30rpx;


	}

	.firend-detail {
		display: flex;
		flex-direction: row;
	}


	.f-left {
		display: flex;
		flex: 1;

	}

	.f-left-image {
		height: 160rpx;
		width: 160rpx;
		border-radius: 80rpx;
	}

	.f-right {
		display: flex;
		flex: 4;
		/* justify-content: center; */
		/* white-space: center; */
		padding-left: 30rpx;
		align-items: center;
	}

	.f-right-txtname {
		font-weight: bold;
		font-size: 36rpx;
	}

	.f-content {
		padding-top: 20rpx;
	}

	.fcon-left {
		flex: 1;
		text-align: right;

	}

	.fcon-right {
		flex: 4;
		text-align: left;
		padding-left: 40rpx;
	}

	.f-arrow {
		position: relative;
	}

	.fir-arrow-right {
		position: absolute;
		right: 10rpx;
		top: 34rpx;
		width: 15rpx;
		height: 15rpx;
		border-top: 1rpx solid #666;
		border-right: 1rpx solid #666;
		transform: rotate(45deg);

	}
</style>
