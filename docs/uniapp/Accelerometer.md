---
title: 小程序实现加速度计数据可视化
date: 2022-2-14
sidebar: 'auto'
categories:
 - 小程序
tags:
 - 图表
 - 可视化
---


![2022-02-25 222649.gif](https://cdn.nlark.com/yuque/0/2022/gif/21949136/1645802720155-d5c405aa-c35b-444c-b18a-41571502879a.gif#clientId=uaec1390a-9646-4&crop=0&crop=0&crop=1&crop=1&from=ui&height=386&id=uf779a0a8&margin=%5Bobject%20Object%5D&name=2022-02-25%20222649.gif&originHeight=960&originWidth=540&originalType=binary&ratio=1&rotation=0&showTitle=false&size=2106421&status=done&style=none&taskId=u9c3d5977-6f96-468b-b815-966090d7a92&title=&width=217)
## ​Situation
1. 毕设课题里有个环节收集离心泵的振动信号
2. 看到有个"电梯小工具"的小程序利用手机自带的加速度计来评定电梯运行质量  
因此，我想到做一个“负载振动收集器”的页面作为"pumptools"里面的一个功能。
## Task
具体功能如上图所示

- 可以显示加速度大小的变化
- 可以切换三个轴位的数据
- 还可以导出三个轴位的具体数据（未完成）
- 显示各个轴位最大值
## Action

- 原料
   - 插件：uchart
   - 环境：HBuilder
   - API：
      - uni.offAccelerometerChange
      - uni.onAccelerometerChange
      - uni.startAccelerometer
      - uni.stopAccelerometer
      - 详细调用方法查看：[https://uniapp.dcloud.io/api/system/accelerometer](https://uniapp.dcloud.io/api/system/accelerometer)
- 实现：由父子组件构成，toolsAzd为子组件，主要实现收集三轴位加速度数据，实现图表渲染，向外传递加速度最大值。父组件主要由6个按钮和最大值显示构成，负责控制渲染哪个轴位的数据到图表上。
### toolsAzdChart子组件代码实现
- qiun-data-charts组件，uchart组件，主要讲下:opts="{yAxis:{data:[{tofix:3}]},color:lineColor}"选项，其中yAxis:{data:[{tofix:3}]}代表y轴坐标保留3位小数，采集到的加速数据都是带小数显示的，如果不设置这个选项，当某段时间振动信号比较平稳时候，例如在0左右波动，会导致y轴纵坐标全部显示0。其中color:lineColor，表示图表的线以何种颜色渲染图表，选项是绑定了data里的linecolor,用户点击radio选项，会改变data中的linecolor，因此可以使得不同轴位的数据以不同颜色进行渲染
```vue
<template>
	<view>
		<view class="charts-box">
			<qiun-data-charts type="line" :chartData="chartData" background="none" :ontouch="true"
				:opts="{yAxis:{data:[{tofix:3}]},color:lineColor}" :animation="false" />
		</view>
	</view>
</template>
```

- 调试的时候可以开启一个定时器，配合Math.random()来mock加速度数据
- 在mounted()钩子函数中开启加速度监听
```vue
mounted() {
			uni.startAccelerometer({
				interval: 'normal', //normal200ms/次  game20ms/次  ui60ms/次 
				success: e => {
					console.log("startAccelerometer调用成功");
				},
				fail: e => {
					console.log("startAccelerometer调用失败")
				}
			});
			this.start()
		},
```

- 父组件中有start和stop按钮，因此子组件也相应的有两个对应的methods，分别为start和stop，其中start函数触发后开始接受加速度数据，其中有个定时器，对应每隔多少秒渲染一次图表，stop函数主要用于停止加速度监听，并清空定时器。
```javascript
start() {
				let that = this;
				//clearInterval(this.timer1);
				//this.timer1 = null;
				clearInterval(this.timer2);
				this.timer2 = null;
				uni.onAccelerometerChange((res)=> {
					  that.tempArrayx.push(res.x)
					  that.tempArrayy.push(res.y)
					  that.tempArrayz.push(res.z)
				}); 
				//开发时，可以使用定时器+Math.random()在电脑端mock加速度数据
				 /* this.timer1 = setInterval(() => {
					that.tempArrayx.push(Math.random() * 0.1)
					that.tempArrayy.push(Math.random() * 0.1)
					that.tempArrayz.push(Math.random() * 0.1)
				}, 200); */ 
				//
				this.timer2 = setInterval(function() {
					that.setUchart(true)
				}, 1001);
			},		
```
```javascript
stop() {
				/* clearInterval(this.timer1);
				this.timer1 = null; */
				uni.offAccelerometerChange({
					success: e => {
						console.log("offAccelerometerChange调用成功");
					},
					fail: e => {
						console.log("失败")
					}
				})
				clearInterval(this.timer2);
				this.timer2 = null;
			},
```

- setUchart()，渲染图表函数，满足两个条件，既可以被start中的定时器调用，又可以在定时器清空后被watch调用，在setUchart()中需要一次性拼接好待渲染的新数据到一个数组中。
```javascript
setUchart(e){
				this.funcGetData()
				let dt = new Array()
				let {dx,dy,dz}=this.funcGetData()
				for (let i = 0; i < dx.length; i++) {
					dt[i] = i;
				}
				while(dx.length>100){
					dx.shift()
					dt.shift()
				}
				while(dz.length>100){
					dz.shift()
				}
				while(dy.length>100){
					dy.shift()
				}
				if(e){
					this.newMax.x=this.findMax(dx)
					this.newMax.y=this.findMax(dy)
					this.newMax.z=this.findMax(dz)		
					this.oldMax.x=this.oldMax.x>this.newMax.x?this.oldMax.x:this.newMax.x
					this.oldMax.y=this.oldMax.y>this.newMax.y?this.oldMax.y:this.newMax.y
					this.oldMax.z=this.oldMax.z>this.newMax.z?this.oldMax.z:this.newMax.z
				}
				if (this.radio_value == "Z") {
					this.chartData.categories = dt
					this.chartData.series[0].data = dz
				} else if (this.radio_value == "Y") {
					this.chartData.categories = dt
					this.chartData.series[0].data = dy
				} else {
					this.chartData.categories = dt
					this.chartData.series[0].data = dz
				}
			},
```

- findMax()函数使用reduce寻找最新的最大值
```javascript
	findMax(aArray){
			  return  aArray.reduce((pre,curr)=>Math.max(pre,curr))
			}
```

- watch，监听radio中的值，然后动态改变uchart中折线的颜色，改变当前渲染的三轴位数据，监听最大值，并通过自定义事件发送出去
```javascript
watch: {
			//监听radio中的值，然后动态改变uchart中color
			radio_value: {
				handler(newValue, oldValue) {
					switch (newValue) {
					  case 'X':
							this.lineColor[0]="#FF1493"
							this.setUchart(false)
							break;
					  case 'Y':
							  this.lineColor[0]="#1890FF"
							  this.setUchart(false)
							  break;
					  case 'Z':
							 this.lineColor[0]="#91CB74"
							 this.setUchart(false)
							 break;
					  default:
					  console.log('default');
					}
				},
				//uchart首次挂载就监听一次 oldValue=undefine
				immediate:true
			},
			//监听最大值变化，然后通过自定义事件发送出去
		 	oldMax: {
				handler(newValue, oldValue){
					this.$emit('maxPost',oldValue)
					
				},
				deep:true
			}
		}
```

- 完整代码实现
```javascript
<template>
	<view>
		<view class="charts-box">
			<qiun-data-charts type="line" :chartData="chartData" background="none" :ontouch="true"
				:opts="{yAxis:{data:[{tofix:3}]},color:lineColor}" :animation="false" />
		</view>
	</view>
	
	
</template>

<script>
	export default {
		name: "toosA_zd_chart",
		props: ["radio_value"],
		data() {
			return {
				chartData: {
					categories: [],
					series: [{
						name: "轴向-加速度",
						data: [],
					}, ],
				},
				//折线颜色
				lineColor: ["#FF1493"],
				//全部加速度记在这数组,不能直接操作这3个数组！
				tempArrayx: [],
				tempArrayy: [],
				tempArrayz: [],
				//定时器
				timer1: null,
				timer2: null,
				//最大值和最小值
				oldMax:{
					x:0.01,
					y:0.01,
					z:0.01
				},
				newMax:{
					x:0.06,
					y:0.06,
					z:0.06
				},
			};

		},
		
		mounted() {
			uni.startAccelerometer({
				interval: 'normal', //normal200ms/次  game20ms/次  ui60ms/次 
				success: e => {
					console.log("startAccelerometer调用成功");
				},
				fail: e => {
					console.log("失败")
				}
			});
		
			this.start()
		},
		beforeDestroy() {
			this.stop();
		},
		methods: {
			stop() {
				/* clearInterval(this.timer1);
				this.timer1 = null; */
				uni.offAccelerometerChange({
					success: e => {
						console.log("offAccelerometerChange调用成功");
					},
					fail: e => {
						console.log("失败")
					}
				})
				clearInterval(this.timer2);
				this.timer2 = null;
			},
			start() {
				let that = this;
				clearInterval(this.timer1);
				this.timer1 = null;
				clearInterval(this.timer2);
				this.timer2 = null;
				uni.onAccelerometerChange((res)=> {
					  that.tempArrayx.push(res.x)
					  that.tempArrayy.push(res.y)
					  that.tempArrayz.push(res.z)
				}); 


				//开发时，可以使用定时器+Math.random()在电脑端mock加速度数据
				 /* this.timer1 = setInterval(() => {
					that.tempArrayx.push(Math.random() * 0.1)
					that.tempArrayy.push(Math.random() * 0.1)
					that.tempArrayz.push(Math.random() * 0.1)
				}, 200); */ 
				//
				
				this.timer2 = setInterval(function() {
					that.setUchart(true)
				}, 1001);
				
			},
			//funcGetData,截取当前加速度数据和对应时间数据
			funcGetData(){
				let v = new Array(100).fill(0)
				//此处为深拷贝
				let dx = v.concat(this.tempArrayx)
				let dy = v.concat(this.tempArrayy)
				let dz = v.concat(this.tempArrayz)
				return {
					dx,
					dy,
					dz
				}
			},
			 setUchart(e){
				this.funcGetData()
				let dt = new Array()
				let {dx,dy,dz}=this.funcGetData()
				for (let i = 0; i < dx.length; i++) {
					dt[i] = i;
				}
				while(dx.length>100){
					dx.shift()
					dt.shift()
				}
				while(dz.length>100){
					dz.shift()
				}
				while(dy.length>100){
					dy.shift()
				}
				
				if(e){
					this.newMax.x=this.findMax(dx)
					this.newMax.y=this.findMax(dy)
					this.newMax.z=this.findMax(dz)
					this.oldMax.x=this.oldMax.x>this.newMax.x?this.oldMax.x:this.newMax.x
					this.oldMax.y=this.oldMax.y>this.newMax.y?this.oldMax.y:this.newMax.y
					this.oldMax.z=this.oldMax.z>this.newMax.z?this.oldMax.z:this.newMax.z
					//this.memolength=dx.length
				}

				if (this.radio_value == "Z") {
					this.chartData.categories = dt
					this.chartData.series[0].data = dz
				
				} else if (this.radio_value == "Y") {
					this.chartData.categories = dt
					this.chartData.series[0].data = dy
				} else {
					this.chartData.categories = dt
					this.chartData.series[0].data = dz

				}
			},
			//最大值最小值函数
			findMax(aArray){
			  return  aArray.reduce((pre,curr)=>Math.max(pre,curr))
			}
			
		},
		/* computed:{
			maxX:function(){
				
			}
		}, */
		watch: {
			//监听radio中的值，然后动态改变uchart中color
			radio_value: {
				handler(newValue, oldValue) {
					switch (newValue) {
					  case 'X':
							this.lineColor[0]="#FF1493"
							this.setUchart(false)
							break;
					  case 'Y':
							  this.lineColor[0]="#1890FF"
							  this.setUchart(false)
							  break;
					  case 'Z':
							 this.lineColor[0]="#91CB74"
							 this.setUchart(false)
							 break;
					  default:
					  console.log('default');
					}
				},
				//uchart首次挂载就监听一次 oldValue=undefine
				immediate:true
			},
			//监听最大值变化，然后通过自定义时间发送出去
		 	oldMax: {
				handler(newValue, oldValue){
					this.$emit('maxPost',oldValue)
					
				},
				deep:true
			}
		}
	}
</script>

<style>
	.charts-box {
		width: 98vw;
		height: 75vh;
	}
</style>

```
### toolsAzd父组件代码实现（完整）
```vue
<template>
	<view class="containerZd" >
		<view class="zdImg" v-if="!no">

			<image src="../../../assets/temp/w.jpeg">
			</image>


		</view>
		<view v-if="!no">
			<ol>
				<li>本功能依靠手机自带的三轴加速度传感器来实现，具体轴位方向见上示意图。</li>
				<li>采样频率有5Hz,16Hz,50Hz可选。</li>
				<li>导出数据仅在云端保留一天，尽快下载</li>
			</ol>
		</view>
		<!-- 加速度图表组件-->

		<toolsAzdChart :radio_value="whichRadio" @maxPost="maxPost" ref="toolsA_zd_childa" v-if="no"></toolsAzdChart>

		<!--最大加速度，模块-->
		<view class="maxpanel">
			<view v-show="whichRadio=='X'&&no" class="maxpanelx">
				X轴最大加速度：{{max.x.toFixed(2)}}
			</view>
			<view v-show="whichRadio=='Y'&&no" class="maxpanely">
				Y轴最大加速度：{{max.y.toFixed(2)}}
			</view>
			<view v-show="whichRadio=='Z'&&no" class="maxpanelz">
				Z轴最大加速度：{{max.z.toFixed(2)}}
			</view>
		</view>
		<view class="btngroup">
			<view class="radioview">
				<radio-group @change="radioChange">
					<radio v-for="(item,index) in radioItems" :value="item.radiovalue" :checked="item.checked">
						{{item.radiovalue}}轴
					</radio>
				</radio-group>
			</view>
			<view class="btn">
				<button type="primary" @click="startAcc" :disabled="startOrStop">start</button>
				<button type="warn" @click="stopAcc" :disabled="!startOrStop">stop</button>
				<button @click="downAcc">导出</button>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				no: false,
				radioItems: [{
						radiovalue: "X",
						checked: "true"
					},
					{
						radiovalue: "Y"
					},
					{
						radiovalue: "Z"
					}
				],
				whichRadio: "X",
				//禁用start和stop按钮
				startOrStop: false,
				//chart中的最大值
				max: {
					x: 0,
					y: 0,
					z: 0
				}
			};
		},


		methods: {
			//接受toolsAzdChart子组件中的最大值，取绝对值，再赋值给本页面data
			maxPost(e) {
				this.max.x = e.x >= 0 ? e.x : -e.x
				this.max.y = e.y >= 0 ? e.y : -e.y
				this.max.z = e.z >= 0 ? e.z : -e.z
			},
			startAcc() {
				this.startOrStop = !this.startOrStop
				if (!this.no) {
					this.no = true
				} else {
					this.$refs.toolsA_zd_childa.start()
				}
			},
			stopAcc() {
				this.startOrStop = !this.startOrStop
				this.$refs.toolsA_zd_childa.stop()

			},
			radioChange(e) {
				//whichRadio传递到图表组件内部
				this.whichRadio = e.detail.value
			}
		}
	};
</script>

<style>
	.containerZd {
		padding-bottom: 5rpx;
		font-size: 29rpx;
		color: #808080;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
	.btngroup {
		text-align: center;
		padding-bottom: 25rpx;
	}
	radio {
		margin: 15rpx 42rpx;
		padding-bottom: 15rpx;
	}
	.btn {
		padding: 10rpx;
		display: flex;
	}
	.zdImg image {
		padding: 30rpx;
		display: block;
		margin: 0 auto;
		width: 620rpx;
		height: 800rpx;
		margin-bottom: 30rpx;
	}
	.maxpanel {
		text-align: center;
		font-size: 39rpx;
		color: #DD524D;
	}
	.maxpanel .maxpanely {
		color: #1890FF;
	}
	.maxpanel .maxpanelz {
		color: #91CB74;
	}
</style>
```
## Result

- watch如果要监听对象内部值的变化，需要开启deep：true，而监听数组不需要开启，但是watch无法监听数组的两种变化：
   - 利用索引直接设置数组项，如oldValue为nums=[1,2,3]，现在设置newValue为nums[0]=4，这中变化是watch监听不到的，即使开启deep：true也不行
   - 修改数组长度，watch也是监听不到的
- 其中setUchart函数，满足两个条件，既可以被定时器调用，又可以在定时器清空后被watch中radio的改变调用，这样可以节省代码量，让函数可以多次复用。内部寻找最新加速度最大值的功能，如果是watch中radio的改变则不需要调用，如果是定时器则需要的调用。那么可以在两者调用setUchart的时候分别往里传入true和false，setUchart据此判断是否调用寻找最新加速度最大值的功能
