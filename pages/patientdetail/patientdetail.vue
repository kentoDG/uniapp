
<template>
	<view class="page">
		<!--顶部导航栏-->

		<view class="uni_tab_bar">
			<view class="uni_swiper_tab order_top">
				<block v-for="(tabBar,index) in tabBars" :key="index">
					<view class="swiper_tab_list" :class="{'active': tabIndex==tabBar.id}" @tap="toggleTab(tabBar.id)">
						{{tabBar.name}}
						<view class="swiper_tab_line">
						</view>
					</view>
				</block>
			</view>
		</view>
		<view class="patienceinfocard">
			<view class="patienceinfo-left">
				<view class="patienceinfo-name">
					<text>{{userinfo.fullName}}</text>

				</view>
				<view class="patienceinfo-id">
					身份证号：{{userinfo.identity}}
				</view>
				<view class="patienceinfo-about">
					地址：{{userinfo.deptName}}
				</view>
			</view>
			<view class="patienceinfo-right">

				<image @click="share" class="patienceinfo-right-img" src="../../static/patientdetail/camera.png"
					mode="aspectFit"></image>
			</view>
		</view>
		<view class="page-content" @scroll="scroll">
			<uni-list v-if="tabIndex==0">
				<view class="search-contianer">
					<tpl-search-bar cancelButton="none" :radius="10000" @confirm="search" v-model="searchValue"
						@clear="clearsearch" @cancel="cancel" />
				</view>
				<!-- <view class="history-search-title">
					<text>历史搜索:</text>
				</view>
				<view class="history-search-content">
					<view class="history-search-item" v-for="(v, i) of historySearchList" :key="v.id">
						<button type="default" size="mini">{{v.dec}}</button>
					</view>
				</view> -->
				<uni-list-item class="uni-list" direction="column" v-for="(v, i) of symptomlist" :key="v.symptomId">
					<!-- to="../knowledgeDetail/knowledgeDetail" -->
					<!-- 自定义 header -->
					<view class="symp-item-header" slot="header">
						{{v.name}}

						<!-- <view class="addtolog">
							
						</view> -->
						<view class="symptolog" @click="sympaddtolog(v.symptomId)">
							<image class="addlogimg" src="../../static/patientdetail/addlog.png" mode=""></image>添加到日志
						</view>
					</view>
					<!-- 自定义 body -->
					<view slot="body" class="symp-item-body" @click="toggoleShow(i)">{{v.reason? v.reason:"无原因描述"}}
					</view>

					<view slot="body" v-if="showtext==i" class="symp-item-bodydetail">
						<view class="">
							{{v.story}}
						</view>
						<view class="">
							{{v.nonDrugTreatment}}
						</view>
					</view>

				</uni-list-item>
			</uni-list>
			<uni-list v-if="tabIndex==1">
				<uni-list-item direction="column" v-for="(v, i) of storeList" :key="v.id">
					<view class="log-card" slot="header">
						<view class="log-leftimg">
							<image :src="v.avatar"></image>
							<!--  -->

						</view>
						<view class="log-rightstr">
							<view class="log-right-title">
								<view class="u-name">
									<text>{{v.userName}}</text>

								</view>
								<view class="u-Ctitle">
									{{v.title}}

								</view>
								<view class="lifetag">
									<image class="lifetag-img" src="../../static/patientdetail/tag.png" mode=""></image>
									{{v.diaryType}}
								</view>

							</view>
							<view class="log-right-txtcontent">
								<!-- <view v-html="v.content"></view> -->
								<view class="ql-container">  
								    <rich-text class="ql-editor" :nodes="v.content"></rich-text>  
								</view>
								<!-- {{v.content}}
								<view class="full-text">
									全文
								</view> -->
							</view>
							<view class="log-right-footer">
								<view class="log-right-footertime">
									{{v.createTime}}
								</view>
								<view class="log-right-footer-commenton">
									点赞<text class="log-thumbs-up" @click="thumbsUpadd(v.thumbsup)"> {{ v.thumbsup?v.thumbsup:0}}</text> 
								</view>
							</view>
						</view>

					</view>
				</uni-list-item>
			</uni-list>
			<uni-list v-if="tabIndex==2">
				<uni-list-item direction="column" v-for="(v, i) of friendsList" :key="v.id">
					<view class="friends-card" slot="header">
						<view class="friends-img">
							<!-- <image :src="v.avatar" mode="heightFix"></image> -->

							<!-- <image src="v.avatar" mode="heightFix"></image> -->
							<img class="friends-imgtag" :src="v.avatar"></img>
						</view>
						<view class="friends-content">
							<view class="friends-con-header">
								<view class="friends-name">
									<text>{{v.userName?v.userName:"暂无"}}</text>
									<!-- <text>撒旦发</text> -->

								</view>
								<view class="friends-phone">
									电话：{{v.phonenumber?v.phonenumber:"暂无"}}
								</view>
							</view>
							<view class="friends-con-footer">
								<view class="friends-footer-left">
									<view class="fir-come">
										关系：{{v.relationship}}
									</view>
									<view class="fir-come-time">
										<text>最近登陆 {{v.loginDate}}</text>

									</view>
								</view>
								<view class="friends-footer-right">
									<view class="friends-deatil-btn" @click="tofriendsdetail(v)">
										权限
									</view>

								</view>
							</view>

						</view>

					</view>

				</uni-list-item>
			</uni-list>
		</view>
		<!--弹出框-->
		<div class="popup" v-if="showModal" @touchmove.stop.prevent="moveStop">
			<div class="mask"></div>
			<div class="share">
				<view class="title">
					<view class="close" @tap="cancelclose">X</view>
					<view class="public" @tap="publishsubmit">发表</view>
				</view>
				<view class="input-con">
					<input class="input" type="text" @input="logsTitleInput" placeholder="一个词描述你的日志:比如日常,体重,饮食" />
				</view>
				<view class="textarea-con">
					<!-- <textarea class="textarea" @input="logtexarea" placeholder="详细说说把" /> -->
					<!-- <editor id="editor" class="ql-container" :placeholder="holder" @ready="onEditorReady"></editor> -->
					<!-- <button type="warn" @tap="undo">撤销</button> -->
					<view class='toolbar' @tap="format" style="height: 120px;overflow-y: auto;">
						<view :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="bold">
						</view>
						<view :class="formats.italic ? 'ql-active' : ''" class="iconfont icon-zitixieti"
							data-name="italic"></view>
						<view :class="formats.underline ? 'ql-active' : ''" class="iconfont icon-zitixiahuaxian"
							data-name="underline"></view>
						<view :class="formats.strike ? 'ql-active' : ''" class="iconfont icon-zitishanchuxian"
							data-name="strike"></view>
						<view :class="formats.align === 'left' ? 'ql-active' : ''" class="iconfont icon-zuoduiqi"
							data-name="align" data-value="left"></view>
						<view :class="formats.align === 'center' ? 'ql-active' : ''" class="iconfont icon-juzhongduiqi"
							data-name="align" data-value="center"></view>
						<view :class="formats.align === 'right' ? 'ql-active' : ''" class="iconfont icon-youduiqi"
							data-name="align" data-value="right"></view>
						<view :class="formats.align === 'justify' ? 'ql-active' : ''" class="iconfont icon-zuoyouduiqi"
							data-name="align" data-value="justify"></view>
						<view :class="formats.lineHeight ? 'ql-active' : ''" class="iconfont icon-line-height"
							data-name="lineHeight" data-value="2"></view>
						<view :class="formats.letterSpacing ? 'ql-active' : ''" class="iconfont icon-Character-Spacing"
							data-name="letterSpacing" data-value="2em"></view>
						<view :class="formats.marginTop ? 'ql-active' : ''" class="iconfont icon-722bianjiqi_duanqianju"
							data-name="marginTop" data-value="20px"></view>
						<view :class="formats.previewarginBottom ? 'ql-active' : ''"
							class="iconfont icon-723bianjiqi_duanhouju" data-name="marginBottom" data-value="20px">
						</view>
						<view class="iconfont icon-clearedformat" @tap="removeFormat"></view>
						<view :class="formats.fontFamily ? 'ql-active' : ''" class="iconfont icon-font"
							data-name="fontFamily" data-value="Pacifico"></view>
						<view :class="formats.fontSize === '24px' ? 'ql-active' : ''" class="iconfont icon-fontsize"
							data-name="fontSize" data-value="24px"></view>

						<view :class="formats.color === '#0000ff' ? 'ql-active' : ''" class="iconfont icon-text_color"
							data-name="color" data-value="#0000ff"></view>
						<view :class="formats.backgroundColor === '#00ff00' ? 'ql-active' : ''"
							class="iconfont icon-fontbgcolor" data-name="backgroundColor" data-value="#00ff00"></view>

						<view class="iconfont icon-date" @tap="insertDate"></view>
						<view class="iconfont icon--checklist" data-name="list" data-value="check"></view>
						<view :class="formats.list === 'ordered' ? 'ql-active' : ''" class="iconfont icon-youxupailie"
							data-name="list" data-value="ordered"></view>
						<view :class="formats.list === 'bullet' ? 'ql-active' : ''" class="iconfont icon-wuxupailie"
							data-name="list" data-value="bullet"></view>
						<view class="iconfont icon-undo" @tap="undo"></view>
						<view class="iconfont icon-redo" @tap="redo"></view>

						<view class="iconfont icon-outdent" data-name="indent" data-value="-1"></view>
						<view class="iconfont icon-indent" data-name="indent" data-value="+1"></view>
						<view class="iconfont icon-fengexian" @tap="insertDivider"></view>
						<view class="iconfont icon-charutupian" @tap="insertImage"></view>
						<view :class="formats.header === 1 ? 'ql-active' : ''" class="iconfont icon-format-header-1"
							data-name="header" :data-value="1"></view>
						<view :class="formats.script === 'sub' ? 'ql-active' : ''" class="iconfont icon-zitixiabiao"
							data-name="script" data-value="sub"></view>
						<view :class="formats.script === 'super' ? 'ql-active' : ''" class="iconfont icon-zitishangbiao"
							data-name="script" data-value="super"></view>
						<view class="iconfont icon-shanchu" @tap="clear"></view>
						<view :class="formats.direction === 'rtl' ? 'ql-active' : ''"
							class="iconfont icon-direction-rtl" data-name="direction" data-value="rtl"></view>

					</view>

					<view class="editor-wrapper">
						<editor id="editor" class="ql-container" placeholder="开始输入..." showImgSize showImgToolbar
							showImgResize @statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady">
						</editor>
					</view>
				</view>

				<view class="tag">
					<view class="tager-item" v-for="(v, i) of tagerItem" :key="v.id">
						<view class="tager-item-con" :class="{'iconactive':isChoose==v.id}"
							@click="activeIcon(v.id,v.title)">
							<image class="tager-item-img" src="../../static/patientdetail/bq.png" mode="widthFix">
							</image>{{v.title}}
						</view>
					</view>

				</view>

				<!-- <view class="upload-img-con">
					<view class="upload-title">最多添加9张图片</view>
					<view class="imgs-con">
						<view class="upload-img" v-for="(v, i) of imgs" :key="v">
							<image class="image" :src="v"></image>
						</view>
						<view class="add-img" @tap="chooseImg">+</view>
					</view>
				</view> -->
			</div>
		</div>
	</view>
</template>

<script>
	import data from '@/data/cate/cate';
	import config from './config';
	import mixin from '@/common/mixin';
	//import "./editor-icon.css";
	

	export default {
		mixins: [config, mixin],
		data() {
			return {
				patientId: "", //界面跳转传参
				showModal: false,
				showtext: -1,
				userinfo: {},
				searchValue: "",
				isChoose: -1,

				titleCurrentIndex: 0,
				cateTabTitles: [],
				cates: [],

				imgs: [],
				chooseTag: "",
				logsTvalue: "",
				logtexareaval: "",

				tabIndex: 0, //选中标签栏的序列
				tabBars: [{
						name: '症状知识库',
						id: '0'
					},
					{
						name: '日志',
						id: '1'
					},
					{
						name: '亲友',
						id: '2'
					}
				],
				//症状知识库
				symptomlist: [],
				//
				storeList: [],
				//亲友列表
				friendsList: [],
				historySearchList: [{
						dec: "水肿",
						id: 0
					},
					{
						dec: "水肿",
						id: 1
					},
					{
						dec: "水肿",
						id: 2
					},
				],
				imageValue: [],

				//标签列表
				tagerItem: [{
						iconUrl: "../../static/patientdetail/bq.png",
						title: "日志记录",
						id: 1

					},
					{
						iconUrl: "../../static/patientdetail/bq.png",
						title: "体重记录",
						id: 2

					},
					{
						iconUrl: "../../static/patientdetail/bq.png",
						title: "饮食记录",
						id: 3

					},
					{
						iconUrl: "../../static/patientdetail/bq.png",
						title: "症状记录",
						id: 4

					},


				],
				//富文本编辑器
				// placeholder:"详细说说把",
				holder: '详细说说把',
				readOnly: false,
				formats: {}

			};
		},
		async onLoad(options) {
			//console.log(options)
			this.patientId = options.patientId;
			//var param = JSON.parse(options.index);
			//const catesPromise = data.cates();
			//const cateTabTitlesPromise = data.cateTabTitles();

			//this.cateTabTitles = await cateTabTitlesPromise;
			//this.cates = await catesPromise;


		},
		onShow() {
			this.centeruserinfo();

			this.getsymptomList();
			if (this.tabIndex == 2) {
				this.initlfirendList()
			}
		},

		// #ifndef MP-WEIXIN
		onNavigationBarButtonTap(e) {
			const index = e.index;

			//点击导航栏消息按钮
			if (1 === index) {
				uni.navigateTo({
					url: '/pages/message/list',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
				return;
			}
		},
		// #endif

		methods: {
			chooseImg() {
				uni.chooseImage({
					count: 3,
					sourceType: ['album'],
					sizeType: ['original', 'compressed'],
					success: (res) => {
						this.imgs = res.tempFilePaths;
					}
				})
			},
			share: function() {
				this.showModal = true;
				// uni.showToast({
				// 	title: "侧搜集措施侧记",
				// 	icon: "none",
				// 	duration: 20000,
				// 	success: () => {}
				// })
			},
			cancelclose: function() {
				setTimeout(() => {
					this.showModal = false;
				}, 600)


			},
			cateTitleTap(index) {
				this.titleCurrentIndex = index;
			},
			toggleTab(index) {
				this.tabIndex = index;
				console.log("tabindex", index);
				if (index == 1) {
					this.initlogList();
				}
				if (index == 2) {
					this.initlfirendList()
				}
			},
			scroll() {
				console.log(12);
			},
			goDetail(e, id) {
				console.log(e);
				console.log(id);
			},
			//跳转亲友权限
			tofriendsdetail(item) {
				//console.log("11111")
				uni.navigateTo({
					url: `/pages/accessmanage/accessmanage?userId=${item.userId}&role=${item.role}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
				return;
			},
			moveStop() {},
			open() {
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.popup.open('top')
			},
			async getsymptomList() {
				const [error, success] = await this.$httpRequest({
					url: "/api/symptom/list",
					data: {
						name: ""
					},
					method: 'GET'
				})

				if (success && success.data.code == 0) {
					this.symptomlist = success.data.data;

				} else {
					uni.showToast({
						title: success.data.msg,
						icon: "none",
						duration: 2000,
						success: () => {}
					})
				}


			},
			toggoleShow(index) {
				// if(this.showtext){
				// 	this.showtext=false;
				// }else{
				// 	this.showtext=true;
				// }
				this.showtext = index
			},

			//中间用户信息
			async centeruserinfo(symptomId) {
				//console.log(this.patientId)
				const [error, success] = await this.$httpRequest({
					url: "/api/patient/list",
					data: {
						//symptomId:symptomId,
						patientId: this.patientId
					},
					method: 'get'
				})
				//console.log('resres', error);
				//console.log('resres', success);
				if (success && success.data.code == 0) {
					// uni.showToast({
					// 	title: success.data.msg,
					// 	icon: "none",
					// 	duration: 2000,
					// 	success: () => {}
					// })
					this.userinfo = success.data.data[0]

				} else {
					uni.showToast({
						title: success.data.msg,
						icon: "none",
						duration: 2000,
						success: () => {}
					})
				}

			},

			//添加到我的日志
			async sympaddtolog(symptomId) {
				console.log(this.patientId)
				const [error, success] = await this.$httpRequest({
					url: "/api/symptom/addLog",
					data: {
						symptomId: symptomId,
						patientId: this.patientId
					},
					method: 'post'
				})
				//console.log('resres', error);
				//console.log('resres', success);
				if (success && success.data.code == 0) {
					uni.showToast({
						title: success.data.msg,
						icon: "none",
						duration: 2000,
						success: () => {}
					})

				} else {
					uni.showToast({
						title: success.data.msg,
						icon: "none",
						duration: 2000,
						success: () => {}
					})
				}

			},
			//加载日志列表
			async initlogList(symptomId) {
				//console.log(this.patientId)
				const [error, success] = await this.$httpRequest({
					url: "/api/lifeDiary/list",
					data: {
						//symptomId:symptomId,
						//patientId:this.patientId
					},
					method: 'get'
				})
				//console.log('resres', error);
				//console.log('resres', success);
				if (success && success.data.code == 0) {
					// uni.showToast({
					// 	title: success.data.msg,
					// 	icon: "none",
					// 	duration: 2000,
					// 	success: () => {}
					// })
					this.storeList = success.data.data;

				} else {
					uni.showToast({
						title: success.data.msg,
						icon: "none",
						duration: 2000,
						success: () => {}
					})
				}

			},

			//加载亲友列表
			async initlfirendList(symptomId) {
				//console.log(this.patientId)
				const [error, success] = await this.$httpRequest({
					url: "/api/patient/relatives",
					data: {
						//symptomId:symptomId,
						patientId: this.patientId
					},
					method: 'get'
				})

				if (success && success.data.code == 0) {
					this.friendsList = success.data.data;

				} else {
					uni.showToast({
						title: success.data.msg,
						icon: "none",
						duration: 2000,
						success: () => {}
					})
				}

			},
			async search() {
				const [error, success] = await this.$httpRequest({
					url: "/api/symptom/list",
					data: {
						name: this.searchValue.value
					},
					method: 'get'
				})

				if (success && success.data.code == 0) {
					this.symptomlist = success.data.data;
					if (this.symptomlist.length <= 0) {
						uni.showToast({
							title: success.data.msg,
							icon: "none",
							duration: 2000,
							success: () => {}
						})
					}

				} else {
					uni.showToast({
						title: success.data.msg,
						icon: "none",
						duration: 2000,
						success: () => {}
					})
				}

			},
			cancel() {
				console.log(this.searchValue);
			},
			clearsearch() {
				this.searchValue = '';
			},
			activeIcon(id, title) {
				this.isChoose = id;
				this.chooseTag = title;
			},
			logsTitleInput(e) {
				this.logsTvalue = e.detail.value;
			},
			// logtexarea(e) {
			// 	this.logtexareaval = e.detail.value
			// },
			//点赞
			thumbsUpadd(){
				//添加一个点赞
				//v.thumbsup
			},
			//发表
			async publishsubmit() {
				var that=this;


				this.editorCtx.getContents({
					success: function(data) {
						//console.log("获取值", data);
						that.logtexareaval = data.html;
					}
				})
				if (!this.logsTvalue) {
					console.log("请输入标题")
					uni.showToast({
						title: "请输入标题",
						icon: "none",
						duration: 2000,
						success: () => {}
					})
					return;
				}
				if (!this.chooseTag) {
					console.log("请选择日志类型")
					uni.showToast({
						title: "请选择日志类型",
						icon: "none",
						duration: 2000,
						success: () => {}
					})
					return;
				}
				if (!this.logtexareaval) {
					uni.showToast({
						title: "请填写日志内容",
						icon: "none",
						duration: 2000,
						success: () => {}
					})
					return;
				}
				const [error, success] = await this.$httpRequest({
					url: "/api/lifeDiary/insert",
					data: {
						patientId: this.patientId,
						title: this.logsTvalue,
						diaryType: this.chooseTag,
						content: this.logtexareaval
					},
					method: 'post'
				})

				if (success && success.data.code == 0) {
					//this.friendsList= success.data.data;
					uni.showToast({
						title: success.data.msg,
						icon: "none",
						duration: 2000,
						success: () => {}
					})
					this.showModal = false;
					this.initlogList();
				} else {
					uni.showToast({
						title: success.data.msg,
						icon: "none",
						duration: 2000,
						success: () => {}
					})
				}






			},
			//富文本编辑器
			readOnlyChange() {
				this.readOnly = !this.readOnly
			},
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
			},
			undo() {
				this.editorCtx.undo()
			},
			redo() {
				this.editorCtx.redo()
			},
			format(e) {
				let {
					name,
					value
				} = e.target.dataset
				if (!name) return
				// console.log('format', name, value)
				this.editorCtx.format(name, value)

			},
			onStatusChange(e) {
				const formats = e.detail
				this.formats = formats
				console.log(e.detail);
			},
			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						console.log('insert divider success')
					}
				})
			},
			clear() {
				this.editorCtx.clear({
					success: function(res) {
						console.log("clear success")
					}
				})
			},
			removeFormat() {
				this.editorCtx.removeFormat()
			},
			insertDate() {
				const date = new Date()
				const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
				this.editorCtx.insertText({
					text: formatDate
				})
			},
			insertImage() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.editorCtx.insertImage({
							src: res.tempFilePaths[0],
							alt: '图像',
							success: function() {
								console.log('insert image success')
								console.log(res.tempFilePaths[0])
								console.log(res)
								
							}
						})
					}
				})
			}

		},
		onReachBottom() {
			console.log(555);
		},
		//文件上传组件
		// 获取上传状态
		select(e) {
			console.log('选择文件：', e)
		},
		// 获取上传进度
		progress(e) {
			console.log('上传进度：', e)
		},

		// 上传成功
		success(e) {
			console.log('上传成功')
		},

		// 上传失败
		fail(e) {
			console.log('上传失败：', e)
		},

	}
</script>

<style lang="scss" scoped>
	@import url("./editor-icon.css");
	.page {}

	.header {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
	}

	.search-contianer {
		height: 84rpx;
		padding: 10rpx 20rpx;
		background-color: #FFFFFF;
	}

	.order_top {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		background-color: #FFFFFF;
	}

	.swiper_tab_list {
		color: #888888;
		font-weight: bold;
	}

	.uni_tab_bar {
		height: 84rpx;
	}

	.uni_tab_bar .active {
		color: #FEDE33;
		margin-top: 17rpx;
		background-color: #FFFFFF;
	}

	.active .swiper_tab_line {
		border-bottom: 4rpx solid #FEDE33;
		width: 50rpx;
		margin: auto;
		margin-top: 17rpx;
		background-color: #0B9C13;
	}

	.uni_swiper_tab {
		border-bottom: 2rpx solid #eeeeee;
		margin-bottom: 15rpx;
	}

	.order_centext {
		height: 800rpx;
		position: fixed;
		top: 160rpx;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #8A6DE9;
		margin-left: 15rpx;
		margin-right: 15rpx;
	}

	.uni-list {
		// display: flex;
		// flex-direction: column;
	}

	// 
	.symp-item-header {
		// display: flex;
		// flex: 1;
		position: relative;
		width: 100%;
		font-weight: bold;
		padding: 10rpx 0rpx;

	}

	.symptolog {
		position: absolute;
		right: 5rpx;
		top: 0;
		font-size: 32rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
		color: #db9510;

		.addlogimg {
			width: 42rpx;
			height: 42rpx;
			vertical-align: middle;
			margin-right: 6rpx;
		}
	}

	.symp-item-body {
		// text-overflow: -o-ellipsis-lastline;
		// overflow: hidden;
		// text-overflow: ellipsis;
		// display: -webkit-box;
		// -webkit-line-clamp: 2;
		//line-clamp: 2;
		// -webkit-box-orient: vertical;
		// display: flex;
		// flex: 1;
		width: 100%;
		color: #999;
		min-height: 200rpx;
		padding: 5rpx;
	}

	.item-body {
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.patienceinfocard {
		top: 0rpx;
		height: 300rpx;
		display: flex;
		flex-direction: row;
		background-color: rgba($color: #000000, $alpha: 0.4);
		color: #FFFFFF;
		padding: 10rpx;
	}

	.patienceinfo-left {
		display: flex;
		flex: 5;
		flex-direction: column;
	}

	.patienceinfo-right {
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;
	}

	.patienceinfo-right-img {
		width: 80rpx;
		height: 80rpx;
	}

	.patienceinfo-name,
	.patienceinfo-id,
	.patienceinfo-about,
		{
		display: flex;
		flex: 1;
		padding-left: 20rpx;
	}

	.patienceinfo-name text {
		font-weight: bold;
		padding: 20rpx 0;

	}

	.history-search-content {
		display: flex;
		flex-direction: row;
	}

	.history-search-item {
		display: flex;
		flex: 1;
		margin: 10rpx;
	}

	.log-leftimg image {
		width: 80rpx;
		height: 80rpx;
		border-radius: 30rpx;

	}

	// 日志的样式
	.log-card {
		display: flex;
		flex-direction: row;
	}

	.log-leftimg {
		display: flex;
		flex: 1;
		justify-content: end;
	}

	.log-rightstr {
		display: flex;
		flex: 5;
		flex-direction: column;

	}

	.log-right-title {
		position: relative;
		display: flex;
		flex-direction: row;
	}

	.u-name {

		padding: 10rpx 0;
	}

	.u-name text {
		font-weight: bold;
		flex: 1;

	}

	.lifetag {
		position: absolute;
		right: 0;
		top: 0;
		border-color: #333333;
		border-width: 2rpx;
		border-style: solid;
		padding: 4rpx 8rpx;
		border-radius: 8rpx;
		font-size: 24rpx;

		.lifetag-img {
			width: 30rpx;
			height: 30rpx;
			vertical-align: middle;
		}
	}

	.u-Ctitle {

		color: #999999;
		flex: 5;
		word-break: break-all;
		/* 换行 */
		// white-space:nowrap; 
		padding-left: 20rpx;
		padding-top: 10rpx;
	}


	.log-right-footer {
		display: flex;
		flex-direction: row;
		padding: 10rpx 0rpx;
	}

	.log-right-footertime {
		display: flex;
		flex: 3;
	}

	.log-right-footer-commenton {
		display: flex;
		flex: 1;
		text-align: right;
		color: #FEDE33;
		.log-thumbs-up{
			padding-left: 8rpx;
		}
	}

	.log-right-txtcontent {
		position: relative;
		
	}

	.full-text {
		color: #06A688;
		position: absolute;
		bottom: 0px;
		right: 0;
	}

	// 亲友列表
	.friends-card {
		display: flex;
		flex-direction: row;
		height: 200rpx;
	}

	.friends-content {
		display: flex;
		flex: 3;
		flex-direction: column;
	}

	.friends-con-header {
		display: flex;
		flex-direction: row;
		padding: 10rpx 0rpx;
	}

	.friends-img {
		display: flex;
		flex: 1;

		.friends-imgtag {
			width: 120rpx;
			height: 120rpx;
		}

	}



	.friends-name {
		display: flex;
		flex: 1;

	}

	.friends-name text {
		font-weight: bold;
		// font-size: 40rpx;
	}

	.friends-phone {
		display: flex;
		flex: 3;
		color: #999999;

	}



	.friends-img image {
		height: 200rpx;
		border-radius: 20rpx;
	}



	.friends-con-footer {
		display: flex;
		flex-direction: row;
	}

	.friends-footer-left {
		display: flex;
		flex: 3;
		flex-direction: column;
	}

	.friends-footer-right {
		display: flex;
		flex: 1;

		align-items: center;
	}

	.fir-come,
	.fir-come-time {
		color: #999;
		padding: 10rpx;
	}

	.fir-come-time text {
		font-size: 28rpx;
	}

	.friends-deatil-btn {
		border-color: rgb(204, 190, 151);
		border-width: 1px;
		border-style: solid;
		color: rgb(204, 190, 151);
		border-radius: 15px;
		text-align: center;
		padding: 5rpx 20rpx;

	}

	// 弹窗
	.popup {
		.mask {
			position: fixed;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			background: rgba(0, 0, 0, 0.5);
			z-index: 20;
		}

		.share {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			height: 1200rpx;
			background: #ffffff;
			z-index: 21;
			border-top-left-radius: 25rpx;
			border-top-right-radius: 25rpx;

			.title {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx 20rpx;

				.close {
					width: 80rpx;
					height: 40rpx;
					font-size: 28rpx;
				}

				.public {
					width: 80rpx;
					height: 40rpx;
					font-size: 28rpx;
					color: #F0AD4E;
				}
			}

			.input {
				height: 80rpx;
				border-bottom: 1rpx solid #F0AD4E;
				padding: 0 10rpx;
				font-size: 18rpx;
			}

			.textarea-con {
				// .textarea {
				// 	width: 100%;
				// 	height: 500rpx;
				// 	font-size: 18rpx;
				// 	padding: 20rpx;

				// }
				.editor-wrapper{
					width: 100%;
					height: 600rpx;
				}
				
			}

			.tag {
				width: 100%;
				height: 200rpx;

				.tager-item {
					width: 33%;
					display: inline-block;
					text-align: center;
					margin-top: 10rpx;

					.tager-item-con {
						border-color: #333333;
						border-width: 2rpx;
						border-style: solid;
						padding: 4rpx 8rpx;
						border-radius: 8rpx;
						display: inline-block;

						.tager-item-img {
							width: 32rpx;
							height: 32rpx;
							vertical-align: middle;
							margin-right: 6rpx;
						}
					}

					.iconactive {
						border-color: #F0AD4E;
						color: #F0AD4E;
					}
				}
			}

			.upload-img-con {
				padding: 20rpx;

				.upload-title {
					font-size: 18rpx;
				}

				.imgs-con {
					display: flex;
					flex-direction: row;
					align-items: center;
					flex-wrap: wrap;
					padding-top: 20rpx;
				}

				.upload-img {
					width: 120rpx;
					height: 120rpx;
					margin-right: 10rpx;

					.image {
						display: block;
						width: 120rpx;
						height: 120rpx;
					}

				}

				.add-img {
					width: 120rpx;
					height: 120rpx;
					border: 2rpx dashed #dddddd;
					text-align: center;
					line-height: 120rpx;
					border-radius: 10rpx;
				}
			}
		}
	}

	// 富文本
	.iconfont {
		display: inline-block;
		padding: 8px 8px;
		width: 24px;
		height: 24px;
		cursor: pointer;
		font-size: 20px;
	}

	.toolbar {
		box-sizing: border-box;
		border-bottom: 0;
		font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
	}


	.ql-container {
		box-sizing: border-box;
		padding: 12px 15px;
		width: 100%;
		min-height: 30vh;
		height: 100%;
		margin-top: 20px;
		font-size: 16px;
		line-height: 1.5;
	}

	.ql-active {
		color: #06c;
	}
</style>
