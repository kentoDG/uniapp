<template>
	<view class="page">
		<view class="section">
			<view class="detail-header">
				<view class="detail-title">{{detailData.title}}</view>
				<view class="detail-base-info">
					<view class="info-auth-date">
						<view class="info-auth">{{detailData.author}}</view>
						<view class="info-date">{{detailData.createTime}}</view>
					</view>
					<view class="store-star" @click="storeKnowledge">
						<view class="store">@</view>
						<view class="star">{{isStore?'取消收藏':'收藏'}}</view>
					</view>
				</view>
			</view>
			<view class="detail-content">
				<!-- <rich-text :nodes="editorContent"></rich-text> -->
				<view v-html="detailData.content"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import data from '@/data/cate/cate';
	import config from './config';
	import parseHtml from '@/common/html-parser';
	import mixin from '@/common/mixin';

	export default {
		mixins: [mixin, config],
		data() {
			return {
				knowledgeId: '',
				detailData: {},
				isStore: false
			}

		},
		computed: {
			editorContent() {
				return parseHtml(this.detailHtml);
			}
		},
		async onLoad(opeions) {
			console.log(opeions);
			this.knowledgeId = opeions.knowledgeId;
			this.getKnowledgeDetail()
		},


		methods: {
			async getKnowledgeDetail() {
				const [error, success] = await this.$httpRequest({
					url: "/api/knowledge/detail",
					data: {
						knowledgeId: this.knowledgeId
					},
					method: 'GET'
				})
				console.log('resres', error);
				console.log('resres', success);
				if (success && success.data.code == 0) {
					this.detailData = success.data.data;
					this.isStore = this.detailData.star;
				} else {
					console.log('dddddddddddddddddddd');
					uni.showToast({
						title: success.data.msg,
						icon: "none",
						duration: 2000,
						success: () => {}
					})
				}
			},
			async storeKnowledge() {
				let api = this.isStore ? '/api/knowledge/unStar' : '/api/knowledge/star'
				const [error, success] = await this.$httpRequest({
					url: api,
					data: {
						knowledgeId: this.knowledgeId
					},
					method: 'GET'
				})
				console.log('resres', error);
				console.log('resres', success);
				if (success && success.data.code == 0) {
					uni.showToast({
						title: success.data.msg,
						icon: "none",
						duration: 2000,
						success: () => {}
					})
					this.isStore = !this.isStore
				}
			}
		},
		onReachBottom() {
			console.log(555);
		}
	}
</script>

<style lang="scss" scoped>
	.section {
		margin-top: 25rpx;
		background-color: #FFFFFF;
		padding: 20rpx 40rpx;
	}

	.detail-header {}

	.detail-title {
		font-weight: bold;
	}

	.detail-base-info {
		margin-top: 10rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.info-auth {
		margin-right: 10rpx;
	}

	.info-auth-date {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.store-star {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.detail-content {
		margin-top: 10rpx;
	}
</style>
