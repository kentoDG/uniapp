<template>
	<view class="page">
		<view class="section">
			<view class="list-item">
				<view class="label">头像</view>
				<view class="text" @tap="modifyHeadImg">
					<view class="tips">点击头像可修改</view>
					<view class="default-img" type="image" v-if="!imgUrl"></view>
					<img class="head-img" v-else :src="imgUrl"></img>
				</view>
				<view class="arrow-right">
					<uni-icons type="arrowright"></uni-icons>
				</view>
			</view>
			<view class="list-item">
				<view class="label">昵称</view>
				<view class="text" @tap="modifyNickname">{{nickName}}</view>
				<view class="arrow-right">
					<uni-icons type="arrowright"></uni-icons>
				</view>
			</view>
			<view class="list-item">
				<view class="label">性别</view>
				<view class="text">
					<radio-group @change="selectSex">
						<label class="radio" style="display: inline-block;">
							<radio value="1" :color="UNI_COLOR_MAIN" :checked="sex==1" style="transform: scale(0.5)" />男
						</label>
						<label class="radio" style="display: inline-block;">
							<radio value="0" :color="UNI_COLOR_MAIN" :checked="sex==0" style="transform: scale(0.5)" />女
						</label>
					</radio-group>
				</view>
			</view>
			<!-- <view class="list-item">
				<view class="label">出生年月日</view>
				<view class="text">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
				</view>
				<view class="arrow-right">
					<uni-icons type="arrowright"></uni-icons>
				</view>
			</view> -->
			<!-- <view class="list-item">
				<view class="label">地址</view>
				<view class="text">
					<picker class="pickerList" mode="multiSelector" :range="newProvinceDataList" :value="multiIndex"
						@change="pickerChange" @columnchange="pickerColumnchange">
						<view class="">{{select}}</view>
					</picker>
				</view>
				<view class="arrow-right">
					<uni-icons type="arrowright"></uni-icons>
				</view>
			</view> -->
			<view class="list-item">
				<view class="label">患者绑定</view>
				<view class="text" @tap="bindPatient">已绑定{{patientCount}}人</view>
				<view class="arrow-right">
					<uni-icons type="arrowright"></uni-icons>
				</view>
			</view>
			<view class="list-item">
				<view class="label">账号与安全</view>
				<view class="text" @tap="modifyPwd">密码管理</view>
				<view class="arrow-right">
					<uni-icons type="arrowright"></uni-icons>
				</view>
			</view>
		</view>
		<view class="footer-btn-con">
			<view class="foot-btn" @tap="submitForm">退出登录</view>
		</view>

	</view>
</template>

<script>
	import cityData from '@/data/user/cityData';
	const util = require('@/common/helper.js')
	import mixin from '@/common/mixin';
	import $ from '@/common/jquery.js'
	export default {
		mixins: [mixin],
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				imgBaseUrl: process.uniEnv.baseUrl,
				imgUrl: 'https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/logo_redBlue-0a7c20fcaa.png',
				nickName: 'KentoMomota',
				sex: 0,
				patientCount: 0,
				date: currentDate,
				newProvinceDataList: [
					[],
					[],
					[]
				],
				oldpProvinceDataList: cityData,
				multiIndex: [0, 0, 0],
				select: '选择省市区'
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onLoad(options) {
			// this.init();
			// this.getuserinfo();
		},
		onShow() {
			this.init();
			this.getuserinfo();
		},
		methods: {
			async init() {
				//初始化省市区数据
				for (let i = 0; i < this.oldpProvinceDataList.length; i++) {
					this.newProvinceDataList[0].push(this.oldpProvinceDataList[i].name);
				}
				for (let i = 0; i < this.oldpProvinceDataList[0].city.length; i++) {
					this.newProvinceDataList[1].push(this.oldpProvinceDataList[0].city[i].name);
				}
				for (let i = 0; i < this.oldpProvinceDataList[0].city[0].area.length; i++) {
					this.newProvinceDataList[2].push(this.oldpProvinceDataList[0].city[0].area[i]);
				}
			},
			/**
			 * 获取个人中心信息
			 */
			async getuserinfo() {
				const [error, success] = await this.$httpRequest({
					url: "/api/user/info",
					data: {},
					method: 'get'
				})
				if (success && success.data.code == 0) {
					this.imgUrl = success.data.data.avatar;
					this.nickName = success.data.data.userName;
					this.sex = Number(success.data.data.sex);
					this.patientCount = success.data.data.patientCount
				} else {
					uni.showToast({
						title: success.data.msg,
						icon: "none",
						duration: 2000,
						success: () => {}
					})
				}
			},
			/**
			 * 修改头像
			 */
			async modifyHeadImg() {
				const self = this;
				const [error, filePath] = await util.awaitWrap(this.chooseImage());
				if (filePath) {
					const [err, reslut] = await this.$uploadFile({
						url: '/api/common/apiUpload',
						filePath
					});
					console.log(reslut);
					if (err) {
						uni.showToast({
							title: '请求错误，请联系管理员',
							icon: "none",
							duration: 2000,
							success: () => {}
						})
						return;
					}
					this.imgUrl = reslut;
					const [error, success] = await this.$httpRequest({
						url: "/api/user/update",
						data: {
							avatar: this.imgUrl
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
				}
			},
			async chooseImage() {
				return new Promise((reslove, reject) => {
					uni.chooseImage({
						count: 1,
						sourceType: ['camera', 'album'],
						sizeType: ['original', 'compressed'],
						success: (res) => {
							reslove(res.tempFilePaths[0]);
						}
					})
				})
			},
			modifyNickname() {
				uni.navigateTo({
					url: `/pages/modifyNickname/modifyNickname`
				})
			},
			async selectSex(e) {
				this.sex = e.detail.value;
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
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			// 省市区确认事件
			pickerChange(e) {
				this.multiIndex = e.detail.value;
				this.select =
					`${this.newProvinceDataList[0][this.multiIndex[0]]}--${this.newProvinceDataList[1][this.multiIndex[1]]}--${this.newProvinceDataList[2][this.multiIndex[2]]}`
			},
			pickerColumnchange(e) {
				// 第几列滑动
				// console.log(e.detail.column);
				// 第几列滑动的下标
				// console.log(e.detail.value)
				// 第一列滑动
				if (e.detail.column === 0) {
					this.multiIndex[0] = e.detail.value
					// console.log('第一列滑动');
					// this.newProvinceDataList[1] = [];
					this.newProvinceDataList[1] = this.oldpProvinceDataList[this.multiIndex[0]].city.map((item, index) => {
						// console.log(item)
						return item.name
					})
					// console.log(this.multiIndex)
					if (this.oldpProvinceDataList[this.multiIndex[0]].city.length === 1) {
						this.newProvinceDataList[2] = this.oldpProvinceDataList[this.multiIndex[0]].city[0].area.map((item,
							index) => {
							// console.log(item)
							return item
						})
					} else {
						this.newProvinceDataList[2] = this.oldpProvinceDataList[this.multiIndex[0]].city[this.multiIndex[
							1]].area.map((item, index) => {
							// console.log(item)
							return item
						})
					}
					// 第一列滑动  第二列 和第三列 都变为第一个
					this.multiIndex.splice(1, 1, 0)
					this.multiIndex.splice(2, 1, 0)
				}
				// 第二列滑动
				if (e.detail.column === 1) {
					this.multiIndex[1] = e.detail.value
					// console.log('第二列滑动');
					// console.log(this.multiIndex)
					this.newProvinceDataList[2] = this.oldpProvinceDataList[this.multiIndex[0]].city[this.multiIndex[1]]
						.area.map((item, index) => {
							// console.log(item)
							return item
						})
					// 第二列 滑动 第三列 变成第一个
					this.multiIndex.splice(2, 1, 0)
				}
				// 第三列滑动
				if (e.detail.column === 2) {
					this.multiIndex[2] = e.detail.value
					// console.log('第三列滑动')
					// console.log(this.multiIndex)
				}
			},
			modifyPwd() {
				uni.navigateTo({
					url: `/pages/modifyPwd/modifyPwd`
				})
			},
			bindPatient() {
				uni.navigateTo({
					url: `/pages/bindPatientList/bindPatientList`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				})
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			submitForm(form) {
				uni.clearStorage();
				uni.reLaunch({
					url: '/pages/auth/login/login'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100%;
		background-color: $uni-bg-color;
	}

	.section {
		padding: 10rpx 32rpx;
	}

	.list-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		height: 90rpx;
		border-bottom: 2rpx solid #EEEEEE;
		position: relative;
		line-height: 90rpx;
	}

	.label {
		font-size: 30rpx;
		width: 180rpx;
	}

	.text {
		flex: 1;
		align-items: flex-end;
		padding-right: 40rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		font-size: 30rpx;
	}

	.tips {
		font-size: 18rpx;
		margin-right: 20rpx;
		color: $uni-color-title;
	}

	.head-img {
		display: block;
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
	}

	.default-img {
		display: block;
		width: 60rpx;
		height: 60rpx;
		background-color: #555555;
		border-radius: 50%;
	}

	.arrow-right {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
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
