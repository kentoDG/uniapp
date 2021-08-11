<template>
	<view class="sccess-manage">
		<view class="sccess-card" @click="setRole('admin')">
			<view class="sccess-left">
				<view class="sccess-title">
					<text>管理员</text>
				</view>
				<view class="sccess-txt">
					有编辑、删除等权限
				</view>
			</view>
			<view class="sccess-right">
				<label>
					<uni-icons type="checkmarkempty" v-if="role=='admin'"></uni-icons>
				</label>
			</view>
		</view>
		<view class="sccess-card" @click="setRole('operation')">
			<view class="sccess-left">
				<view class="sccess-title">
					<text>添加记录</text>
				</view>
				<view class="sccess-txt">
					可添加照片、文字、症状到患者的日志里
				</view>
			</view>
			<view class="sccess-right">
				<label>
					<uni-icons type="checkmarkempty"  v-if="role=='operation'"></uni-icons>
				</label>
			</view>
		</view>

		<view class="sccess-card" @click="setRole('readonly')">
			<view class="sccess-left">
				<view class="sccess-title">
					<text>查看</text>
				</view>
				<view class="sccess-txt">
					只能查看、添加评论
				</view>
			</view>
			<view class="sccess-right">
				<label>
					<uni-icons type="checkmarkempty" v-if="role=='readonly'"></uni-icons>
				</label>
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
				identity: '',
				relationship: '',
				role: 'admin',
				userId: ''
			}
		},
		computed: {},
		onLoad(options) {
			this.userId = options.userId;
			this.role=options.role;
		},
		methods: {
			async setRole(role) {
				this.role = role;
				const [error, success] = await this.$httpRequest({
					url: "/api/patient/relativesRole",
					data: {
						role: this.role,
						userId: this.userId
					},
					method: 'POST'
				})
				console.log('resres', error);
				console.log('resres', success);
				if (success && success.data.code == 0) {
					uni.showToast({
						title: '设置成功',
						icon: "none",
						duration: 2000,
						success: () => {}
					})
				} else {
					uni.showToast({
						title: '请求失败',
						icon: "none",
						duration: 2000,
						success: () => {}
					})
				}

			}
		}
	}
</script>

<style>
	.sccess-manage {
		padding: 20rpx;
	}

	.sccess-card {
		display: flex;
		flex-direction: row;
		background-color: #e6e6e6;
		height: 200rpx;
		margin-top: 30rpx;
	}

	.sccess-left {
		display: flex;
		flex: 5;
		justify-content: center;
		padding-left: 20rpx;
		flex-direction: column;
	}

	.sccess-right {
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;
	}

	.sccess-title,
	.sccess-txt {
		padding: 20rpx;
	}

	.sccess-title {
		text {
			font-weight: bold;
		}

	}

	.sccess-txt {
		color: #999999;
	}
</style>
