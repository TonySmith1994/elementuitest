<template>
	<div id="app">
		<img src="./assets/logo.png">
		<div>
			<el-container style="height: 500px; border: 1px solid #eee;">
				<el-aside>
					<el-scrollbar style="height: 100%;width: 100%;">
						<el-tree :data="data" :props="{children: 'children',label: 'label'}" accordion @node-click="handleNodeClick">
						</el-tree>
					</el-scrollbar>
				</el-aside>

<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
  <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-location">北京市工程咨询公司</i>
      <span slot="title">导航一</span>
    </template>
    <el-menu-item-group>
      <span slot="title">分组一</span>
      <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="分组2">
      <el-menu-item index="1-3">选项3</el-menu-item>
    </el-menu-item-group>
    <el-submenu index="1-4">
      <span slot="title">选项4</span>
      <el-menu-item index="1-4-1">选项1</el-menu-item>
    </el-submenu>
  </el-submenu>



</el-menu>

</el-main>
			</el-container>
			<el-button @click="startHacking">Start</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				data: [{
					label: '一级 1',
					children: [{
						label: '二级 1-1',
						children: [{
							label: '三级 1-1-1'
						}]
					}]
				}],
				 isCollapse: true
			}
		},
		methods: {
			startHacking() {
				this.$notify({
					title: 'It works!',
					type: 'success',
					message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
					duration: 5000
				})
			},
			handleNodeClick(data) {
				console.log(data);
			},
			getData() {
				this.$http.get('/wcm/app/trsGetBPMData.jsp?deptId=0&type=1').then(response => {
					console.log(response.data);
					listToTree(response.data);
					const obj = listToTree(response.data.jsonArray);
					this.data = obj;
				}, response => {
					console.log("error");
				});
			}
		},
		created() {
			this.getData();
		}
	}


	// 将一个扁平化的对象数组，转化为树形结构
	// 现在有一个对象组成的数组，每个元素有id属性和parent_id属性，根据其id属性和parent_id属性，将其转换为树结构的对象

	function listToTree(list) {
		console.time('构造树形时间：');
		var map = {},
			node, tree = [],
			i;
		for (i = 0; i < list.length; i++) {
			list[i].label = list[i].title;
			map[list[i].id] = list[i];
			list[i].children = [];
		}
		for (i = 0; i < list.length; i += 1) {
			list[i].label = list[i].title;
			node = list[i];
			if (node.parent_id !== '0') {
				map[node.parent_id].children.push(node);
			} else {
				tree.push(node);
			}
		}
		console.timeEnd('构造树形时间：');
		return tree;
	}
</script>

<style>
	#app {
		font-family: Helvetica, sans-serif;
		text-align: center;
	}

	.el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		border-radius: 4px;
	}

	.bg-purple-dark {
		background: #99a9bf;
	}

	.bg-purple {
		background: #d3dce6;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}

	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}

	.el-scrollbar__wrap {
		overflow-x: hidden;
	}

	  .el-menu--collapse {
	      width: 364px;
	  }
</style>
