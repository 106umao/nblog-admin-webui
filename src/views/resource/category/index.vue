<template>
  <div class="app-container">
    <div style="margin-bottom:20px">
      <el-button type="primary" @click="isShowDrawer=!isShowDrawer">添加分类</el-button>
      <el-drawer
        ref="drawer"
        :before-close="handleClose"
        :visible.sync="isShowDrawer"
        direction="ltr"
        custom-class="demo-drawer"
      >
        <div style="width:95%">
          <el-form ref="addFormRef" :model="addForm" label-width="80px">
            <el-form-item label="类别名">
              <el-input v-model="addForm.name" />
            </el-form-item>
            <el-form-item label="父分类">
              <el-select v-model="addForm.parentId" placeholder="选择一个父类（可不选）">
                <template v-for="category in list">
                  <el-option :key="category.id" :label="category.name" :value="category.id" />
                </template>
              </el-select>
            </el-form-item>

            <el-form-item label="描述">
              <el-input v-model="addForm.desc" type="textarea" :rows="4" />
            </el-form-item>
            <el-form-item>
              <el-button v-if="!isedit" type="primary" :loading="loadding" @click="onSubmit($refs)">{{ loadding ? '提交中 ...' : '立即创建' }}</el-button>
              <el-button v-if="isedit" type="primary" :loading="loadding" @click="onSubmit($refs)">{{ loadding ? '提交中 ...' : '修改' }}</el-button>
              <el-button @click="ref.drawer.closeDrawer()">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-drawer>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column
        align="center"
        fixed="left"
        label="ID"
        width="80"
      >
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        fixed="left"
        align="center"
        label="Name"
      >
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="400px" align="center" label="Desc">
        <template slot-scope="{row}">
          <span>{{ row.desc }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="ParentId" align="center">
        <template slot-scope="{row}">
          <span>{{ row.parentId===null?'无': row.parentId }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" align="center" label="CreateTime" width="200">
        <template slot-scope="{row}">
          <span>{{ formateDate(row.createTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" align="center" label="UpdateTime" width="200">
        <template slot-scope="{row}">
          <span>{{ formateDate(row.updateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        label="Actions"
        width="200"
      >
        <template slot-scope="{row}">
          <el-button-group>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="edit(row)"
            >
              Edit
            </el-button>
            <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteOne(row)" />
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList, update, create, remove } from '@/api/resource/category'

export default {
  name: 'Category',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      isedit: false,
      loadding: false,
      isShowDrawer: false,
      addForm: {

      },
      direction: 'ltr',
      adduser: false,
      list: [],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleClose(ref) {
      this.addForm = {}
      this.loadding = false
      this.isedit = false
      ref()
    },
    async edit(row) {
      this.addForm = row
      this.isedit = true
      this.isShowDrawer = true
    },
    async deleteOne(row) {
      const { code } = await remove(row)
      if (code === 200) {
        this.getList()
      } else {
        this.$message.error('service block')
      }
    },
    async onSubmit(ref) {
      this.loadding = true
      let res = null
      if (this.isedit === true) {
        res = await update(this.addForm)
        this.isedit = false
      } else {
        res = await create(this.addForm)
      }
      const { code } = res

      if (code === 200) {
        this.getList()
        this.$message.success = 'add success'
      } else {
        this.$message.error = 'service block'
      }
      setTimeout(() => {
        this.addForm = {}
        this.loadding = false
        ref.drawer.closeDrawer()
      }, 1000)
    },
    async statusChange(row) {
      const { code, msg } = await update({
        id: row.id,
        delete: row.delete === 1 ? 0 : 1
      })
      console.log(msg)
      if (code === 200) {
        row.delete = row.delete === 1 ? 0 : 1
      } else {
        this.$message.error('service block')
      }
    },
    formateDate(date) {
      let str = ''
      str = date[0] + '-' + date[1] + '-' + date[2]
      return str
    },
    async getList() {
      this.listLoading = true
      const { data, code } = await fetchList()
      if (code === 200) {
        this.list = data
        this.listLoading = false
      } else {
        this.$message.error = 'service block'
      }
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
