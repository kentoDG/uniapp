<template>
	<view class="page">
		<view class="header">
			<uni-search-bar v-if="activeIndex==0" 
							class="uni-search-bar"  
							v-model="searchValue"
							@confirm="search"
							@clear="clear"
							@cancel="cancel">
			</uni-search-bar>
			<k-tabs :type="tabList" v-model="activeIndex"></k-tabs>
		</view>
		<view style="height: 10rpx;background-color: #EEEEEE;"></view>
		<view class="page-content">
			<template v-if="activeIndex==0">
				<template v-for="(v, i) of list">
					<view class="list-item" :key="v.knowledgeId" @click="goDetail(v.knowledgeId)">
						<view class="item-title">{{v.title}}</view>
						<view class="item-content">
							<view v-html="v.content"></view>
						</view>
						<view class="item-date">{{v.date}}</view>
					</view>
				</template>
			</template>
			<template v-else>
				<view class="list-item" v-for="(v, i) of storeList" :key="v.knowledgeId">
					<view class="item-title">123{{v.title}}</view>
					<view class="item-content">
						<view v-html="v.content"></view>
					</view>
					<view class="item-date">{{v.date}}</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	import data from '@/data/cate/cate';
	import config from './config';
	import mixin from '@/common/mixin';
	export default {
		mixins: [config, mixin],
		data() {
			return {
				searchValue: '',
				activeIndex: 0,
				tabList: [{
						title: '知识',
						id: '0'
					},
					{
						title: '收藏',
						id: '1'
					}
				],
				list: [],
				storeList: []
			};
		},
		async onLoad() {
			this.getKnowledgeList();
			this.getStoreList();
		},

		methods: {
			async getKnowledgeList() {
				const self = this;
				const [error, success] = await this.$httpRequest({
					url: "/api/knowledge/list",
					data:{
						title:self.searchValue
					}
				})
				console.log('resres', error);
				console.log('resres', success);
				if (success && success.data.code == 0) {
					self.list = success.data.data;
				} else {
					uni.showToast({
						title: success.data.msg,
						icon: "none",
						duration: 2000,
						success: () => {}
					})
				}
			},
			async getStoreList() {
				const self = this;
				const [error, success] = await this.$httpRequest({
					url: "/api/knowledge/starList"
				})
				console.log('resres', error);
				console.log('resres', success);
				if (success && success.data.code == 0) {
					self.storeList = success.data.data;
				} else {
					uni.showToast({
						title: success.data.msg,
						icon: "none",
						duration: 2000,
						success: () => {}
					})
				}
			},
			goDetail(knowledgeId) {
				console.log(knowledgeId);
				uni.navigateTo({
					url: `/pages/knowledgeDetail/knowledgeDetail?knowledgeId=${knowledgeId}`
				})
			},
			search() {
				this.getKnowledgeList();
			},
			cancel() {
				this.searchValue="";
				this.getKnowledgeList();
			},
			clear() {
				this.searchValue="";
				this.getKnowledgeList();
			}
		},
		onReachBottom() {
			console.log(555);
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100%;
		// background-color: rgb(248, 248, 248)
		background-color: #FFFFFF;
	}

	.header {
		.uni-search-bar {
			background-color: #FFFFFF;
		}
	}

	.page-content {
		width: 100%;
		padding: 20rpx;
		box-sizing: border-box;
		margin-top: 20rpx;
		background-color: #FFFFFF;
	}

	.list-item {
		width: 690rpx;
		margin: 0 auto;
		border-bottom: 1rpx solid #dddddd;
		margin-bottom: 20rpx;
		padding-bottom: 20rpx;

		.item-title {
			width: 100%;
			box-sizing: border-box;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-weight: bold;
		}

		.item-content {
			height: 400rpx;
			overflow: hidden;
		}

		.item-date {
			color: #555555;
			font-sizse: 22rpx;
			margin-top: 15rpx;
		}
	}

	.uni-list {
		display: flex;
		flex-direction: column;
	}

	.item-body {
		// overflow: hidden;
		// text-overflow: ellipsis;
		// display: -webkit-box;
		// -webkit-line-clamp: 2;
		// line-clamp: 2;
		// -webkit-box-orient: vertical;
	}
</style>
