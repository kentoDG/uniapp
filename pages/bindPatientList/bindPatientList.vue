<template>
	<view class="page">
		<view class="section">
			<view class="list-item" v-for="(v, i) of patientList" :key="v.id">
				<view class="item-left">
					<view class="img-con">
						<img class="head-img" :src="v.photo"></img>
					</view>
					<view class="patient-name">{{v.fullName}}</view>
				</view>
				<view class="item-right" @click="unbindPatient(v.id)">删除</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				patientList: []
			}
		},
		computed: {},
		onLoad(options) {
			this.getBindPatientList()
		},
		methods: {
			async getBindPatientList() {
				const [error, success] = await this.$httpRequest({
					url: "/api/patient/list"
				})
				console.log('resres', error);
				console.log('resres', success);
				if (success && success.data.code == 0) {
					console.log('sssssssssssssssssssss');
					this.patientList = success.data.data;


				} else {
					uni.showToast({
						title: '请求失败',
						icon: "none",
						duration: 2000,
						success: () => {}
					})
				}
			},
			async unbindPatient(id) {
				const [error, success] = await this.$httpRequest({
					url: "/api/patient/unBindPatient",
					data: {
						patientId: id
					}
				})
				console.log('resres', error);
				console.log('resres', success);
				if (success && success.data.code == 0) {
					this.getBindPatientList()
				} else {
					uni.showToast({
						title: '请求失败',
						icon: "none",
						duration: 2000,
						success: () => {}
					})
				}
			}
		},
		onReachBottom() {
			console.log("我已经滚动到底部了")
		}
		
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100%;
		background-color: #FFFFFF;
	}

	.section {
		// display: flex;
		// flex-direction: column;
		// align-items: center;
		// height: 100%;
		background-color: #FFFFFF;
		padding: 10rpx 30rpx;
		// padding: 40rpx 30rpx;
		// border-top: 1rpx solid #dddddd;
	}

	.list-item {
		height: 180rpx;
		border: 1rpx solid #dddddd;
		box-sizing: border-box;
		margin-bottom: 20rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;
		border-radius: 20rpx;

		.item-left {
			display: flex;
			flex-direction: row;
			align-items: center;

			.img-con {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;

				.head-img {
					display: block;
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}
			}

			.patient-name {
				font-size: 18rpx;
				font-weight: blod;
				margin-left: 20rpx;
			}
		}

		.item-right {
			width: 120rpx;
			height: 60rpx;
			border-radius: 30rpx;
			text-align: center;
			line-height: 60rpx;
			// border: 1rpx solid #dddddd;
			background-color: $uni-bg-color-main;
			font-size: 30rpx;
			color: #FFFFFF;
		}
	}
</style>
