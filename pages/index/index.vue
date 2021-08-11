<template>
	<view class="page">
		 <uni-fab
					:horizontal="horizontal"
					:popMenu="false"
		            :vertical="vertical"
		            :direction="direction"
		            @fabClick="bindPatients"
		        ></uni-fab>
		<xg-list ref="page-list-ref" id="page-list" class="page-list" :show-scrollbar="false">
			<xg-list-item>
				<uni-grid :highlight="false" :show-border="false" :square="false" :column="2">
					<uni-grid-item>
						<!-- 秒杀活动 -->
						<!-- <view class="tool-addhz">

							<view class="tool-addhz-img" @click="bindPatients">
								<image src="../../static/index/add.png" mode="aspectFit"></image>


							</view>

							<view class="tool-addhz-title">
								<text>绑定患者</text>
							</view>
						</view> -->


					</uni-grid-item>
					<!-- <uni-grid-item>
						<view class="tool-addhz">
							<view class="tool-addhz-img">
								<image src="../../static/index/add.png" mode="aspectFit"></image>
							</view>
							<view class="tool-addhz-title">
								<text>扫码添加</text>
							</view>
						</view>
					</uni-grid-item> -->

				</uni-grid>
			</xg-list-item>
			<xg-list-item>
				<view class="product-tab-section">
					<view class="ProductsList">
						<view class="row" v-for="(tabProducts, tabIndex) in tabListProducts"
							@click="onpatientdetail(tabProducts.patientId)">
							<!-- style=" background-image: url(http://39.98.161.201:18989/profile/upload/2021/07/21/8ebfd134-3951-43ff-b3e2-578b99c73461.png);" -->

							<view class="image-content">

								<!-- <image style="width:90rpx;height: 90rpx;" mode="aspectFit" :src="tabProducts.photo"></image> -->
								<!-- <image style="width:90rpx;height: 90rpx;" mode="aspectFit" src="http://39.98.161.201:18989/profile/upload/2021/07/21/8ebfd134-3951-43ff-b3e2-578b99c73461.png"></image> -->
								<img class="img" :src="tabProducts.photo"></img>
							</view>

							<view class="image-title">
								<text class="pname">
									{{tabProducts.fullName}}
								</text>

							</view>
							<view class="image-button" @click.stop="deletePaint(tabProducts.patientId)">删除

							</view>


						</view>
					</view>




					<!-- </view> -->




				</view>
			</xg-list-item>
		</xg-list>
	</view>
</template>

<script>
	import data from '@/data/index/index';
	import config from './config';



	import mixin from '@/common/mixin';


	export default {
		mixins: [

			config,
			mixin
		],
		data() {
			return {
				navBarBg: '',
				productTabHeight: 0,
				//产品列表tab
				currentTabIndex: 0,
				tabTitles: [], //动态增添loadMoreStatus、page属性
				tabListProducts: [],

				slideshows: [], //轮播图
				banner: '', //横幅广告
				cateNavs: [], //分类导航
				seckillProducts: [],
				liveProducts: [],
				specialOfferProducts: [],
				groupBuyProducts: [],
				horizontal:'right',
				vertical:'bottom',
				direction:'horizontal',
				content:[{
					text:'绑定患者',
					active:true
				}]
			}
		},
		onShow() {
			this.loadTabProducts();
		},

		async onLoad() {
			// this.getMovieImg();
			const navBarBgPromise = data.navBarBg();
			const slideshowsPromise = data.slideshows();
			const bannerPromise = data.banner();
			const cateNavsPromise = data.cateNavs();
			const seckillProductsPromise = data.seckillProducts();
			const liveProductsPromise = data.liveProducts();
			const specialOfferProductsPromise = data.specialOfferProducts();
			const groupBuyProductsPromise = data.groupBuyProducts();

			const tabTitlesPromise = data.tabTitles();



			this.tabTitles = await tabTitlesPromise;

			this.groupBuyProducts = await groupBuyProductsPromise;
			this.specialOfferProducts = await specialOfferProductsPromise;
			this.liveProducts = await liveProductsPromise;
			this.seckillProducts = await seckillProductsPromise;
			this.cateNavs = await cateNavsPromise;
			this.banner = await bannerPromise;
			this.slideshows = await slideshowsPromise;
			this.navBarBg = await navBarBgPromise;


			//初始化产品列表tab
			//this.tabListProducts = new Array(this.tabTitles.length);
			//this.loadTabProducts();

			//设置滚动嵌套顶部距离
			this.$nextTick(function() {
				setTimeout(() => {
					// this.setPageHeaderHeight();
				}, 500);
			})
		},

		// #ifndef APP-NVUE
		onPageScroll(e) {
			// this.setTabScrollRef(this.currentTabIndex);
		},
		// #endif

		methods: {
			async getMovieImg() { //测试接口
				const res = await this.$httpRequest({
					url: "/api/douban"
				})
			},
			onNavBarGearTap() {

			},
			//绑定患者
			bindPatients() {
				uni.navigateTo({
					url: '/pages/addpatinet/bindpatient',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
				return;
			},
			onpatientdetail(patientId) {
				uni.navigateTo({
					url: '/pages/patientdetail/patientdetail?patientId=' + patientId,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});

				return;
			},
			onNavBarButtonTap(e) {
				const type = e.type;
				if ('chat' === type) {
					uni.navigateTo({
						url: '/pages/message/list',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
					return;
				}

				if ('scan' === type) {
					console.log('扫一扫');
					return;
				}
			},

			setTabScrollRef(tabIndex = 0) {
				// #ifdef APP-NVUE
				const args = {
					id: 'page-list',
					headerHeight: this.pageHeaderHeight,
				};
				// #endif
				// #ifndef APP-NVUE
				const args = {
					id: '_root',
					headerHeight: this.pageHeaderHeight,
				};
				// #endif

				this.$refs['product-tab-page-ref'][tabIndex].setScrollRef(args);
			},


			async loadTabProducts(index = 0) {
				/*this.$set(this.tabTitles[index], 'loadMoreStatus', 'loading');

				this.tabTitles[index].page = typeof this.tabTitles[index].page === 'number' ? this.tabTitles[index]
					.page : 0;

				const cate_id = this.tabTitles[index].cate_id;

				const products = await data.tabProducts(cate_id, this.tabTitles[index].page);

				if (!this.tabListProducts[index]) {
					this.$set(this.tabListProducts, index, products);
				} else {
					this.$set(this.tabListProducts, index, this.tabListProducts[index].concat(products));
				}

				++this.tabTitles[index].page;

				this.$nextTick(function() {
					this.$set(this.tabTitles[index], 'loadMoreStatus', 'more');
				})*/
				//console.log('请求发起');
				const [error, success] = await this.$httpRequest({
					url: "/api/patient/list",
					data: {},
					method: 'GET'
				})
				//console.log('resres', error);
				//console.log('resres', success);
				if (success && success.data.code == 0) {
					this.tabListProducts = success.data.data;

				} else {
					uni.showToast({
						title: success.data.msg,
						icon: "none",
						duration: 2000,
						success: () => {}
					})
				}

			},

			productTabTitleTap(index) {
				this.currentTabIndex = index;
			},

			productTabSwiperChange(e) {
				const index = e.detail.current;
				this.currentTabIndex = index;

				this.setTabScrollRef(index);

				this.loadTabProducts(index);
			},


			// #ifdef APP-NVUE
			onLoadmore(e) {
				this.loadTabProducts(this.currentTabIndex);
			},
			// #endif

			// #ifndef APP-NVUE
			onScrolltolower(e) {
				this.loadTabProducts(this.currentTabIndex);
			},
			// #endif

			async deletePaint(id) {
				console.log('请求发起');
				const [error, success] = await this.$httpRequest({
					url: "/api/patient/unBindPatient",
					data: {
						patientId: id
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
					this.loadTabProducts();
				} else {
					uni.showToast({
						title: success.data.msg,
						icon: "none",
						duration: 2000,
						success: () => {}
					})
				}

			}
		},
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100%;
		background-color: #FFFFFF;
	}

	.row {
		display: flex;
		align-items: center;
		height: 80px;
		border-width: 2px;
		border-style: solid;
		border-color: #eeeeFF;
		//background-color: #00AAFF;
		margin: 10px;
		padding: 10px;
	}

	.image-content {
		flex: 1;
		text-align: center;

		// justify-content: center;
		// align-items: center;
		.img {
			display: block;
			width: 90rpx;
			height: 90rpx;
		}
	}

	.image-content image {
		width: 100%;
		border-radius: 50%;
	}

	.image-title {
		flex: 3;
		justify-content: center;
		padding-left: 15px;
	}

	.image-title .pname {
		font-weight: bold;
	}

	.image-button {
		width: 120rpx;
		height: 60rpx;
		border-radius: 30rpx;
		text-align: center;
		line-height: 60rpx;
		font-size: 30rpx;
		flex: 1;
		justify-content: center;
		background-color: $uni-bg-color-main;
		color: #FFFFFF;
	}

	.ProductsList {
		// height: 800px;
	}

	.tool-addhz {
		display: flex;

		flex-direction: column;

	}


	.tool-addhz-img {
		flex: 1;
		justify-content: center;
		flex-direction: row;
		height: 200rpx;
		text-align: center;

	}

	.tool-addhz-img image {
		// flex: 1;
		// justify-content: center;
		height: 100rpx;
		width: 100rpx;

	}

	.tool-addhz-title {
		flex: 1;
		justify-content: center;
		flex-direction: row;
		padding: 10rpx 0;
		text-align: center;
	}

	.tool-addhz-img text {
		flex: 1;
		justify-content: center;
	}

	// .item {
	// 	flex: 1;
	// 	justify-content: center;
	// 	align-items: center;
	// 	border-width: 1;
	// 	border-style: solid;
	// 	border-color: #FFFFFF;
	// 	background-color: #00AAFF;
	// }
</style>
