<template>
	<view class="addcard-box">
		<view class="addcard">
			<view class="addcard-lable">
				请输入患者身份证号:
			</view>
			<view class="addcard-input">
				<input class="input" type="text" @input="paintcardid" />
			</view>
			
		</view>
		<view class="addcard">
			<view class="addcard-lable">
				请输入与患者关系:
			</view>
			<view class="addcard-input">
				
				<picker mode="selector" :range="selectorArry" @change="selectchang" :value="index">
					<view class="input selectorinput">{{selectorArry[index]}}</view>
				</picker>
				<!-- <input class="input" type="text" @input="relationshipset" /> -->
			</view>
			
		</view>
		<view class="addbtn-box">
			<view class="addcard-btnf">
				<button class="addcard-btn" size="mini" type="primary" @click="addpaint" >保存</button>
			</view>
			
			
		</view>
	</view>
	
</template>

<script>
	
	export default {
			data(){
				return{
					pcardid:"",
					relationship:"",
					selectorArry:[],
					sArry:[],
					index:0
				}
			},
			async onLoad() {
				this.getselects()
			},
			methods: {
				
			async addpaint(){
					//console.log(1111);
					//console.log('请求发起');
					if(!this.pcardid){
						uni.showToast({
							title:"请输入患者身份证号",
							icon: "none",
							duration: 2000,
							success: () => {}
						})
					}
					if(!this.relationship){
						uni.showToast({
							title:"请输入关系",
							icon: "none",
							duration: 2000,
							success: () => {}
						})
					}
					const [error, success] = await this.$httpRequest({
						url: "/api/patient/bindPatient",
						data: {
							identity:this.pcardid,
							relationship:this.relationship
						},
						method: 'POST'
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
					return ;
				},
				paintcardid(e){
					//console.log(e)
					this.pcardid= e.detail.value
				},
				// relationshipset(e){
				// 	this.relationship= e.detail.value
				// },
				async getselects(){
					const [error, success] = await this.$httpRequest({
						url: "/api/common/userPatientRelationship",
						data: {},
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
						for (let val in success.data.data) {
							console.log(val)
							this.selectorArry.push(success.data.data[val].dictValue)
						}
						this.sArry=success.data.data;
						this.relationship=this.sArry[0].dictValue;
						
					} else {
						uni.showToast({
							title: success.data.msg,
							icon: "none",
							duration: 2000,
							success: () => {}
						})
					}
				},
				selectchang(e){
					 this.index = e.target.value;
					
					this.relationship=this.sArry[e.target.value].dictValue;
					// console.log(this.relationship);
				}
			
			}
	}
</script>

<style>
	
	.addcard-box{
		position: absolute;
		top:0rpx;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.addcard{
		flex-direction: column;
		border-width: 2px;
		border-style: solid;
		border-color: #eeeeFF;
		margin: 30rpx;
		padding: 40rpx;
	}
	.addcard-lable{
		padding: 20rpx 0rpx;
	}
	.addcard-input{
		position: relative;
		padding: 10rpx 20rpx;
		z-index: 1;
		
		
	}
	.input {
		height: 100rpx;
		border-bottom: 1rpx solid #dddddd;
	}
	.selectorinput{
		line-height:100rpx ;
	}
	.addbtn-box{
		position: absolute;
		left: 0;
		right: 0;
		top:40rpx;
		bottom:0rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items:center; 
		
	}
	
	.addcard-btn{
		width: 160rpx;
		height: 60rpx;
		text-align: center;
	}
	
</style>
