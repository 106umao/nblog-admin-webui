<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">

      <el-table-column
        width="180px"
        fixed="left"
        align="center"
        label="Email"
      >
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="UserName">
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column width="500px" label="PassWord" align="center">
        <template slot-scope="{row}">
          <span>{{ row.password }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" label="Desc" align="center">
        <template slot-scope="{row}">
          <span>{{ row.desc }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Sex" width="80" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sex===1 ?'男':'女' }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Age" width="80" align="center">
        <template slot-scope="{row}">
          <span>{{ row.age }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" align="center" label="Avatar" width="110">
        <template slot-scope="{row}">
          <span>{{ row.avatar }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" align="center" label="Phone" width="200">
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" align="center" label="Ip" width="200">
        <template slot-scope="{row}">
          <span>{{ row.ip }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" align="center" label="JoinTime" width="200">
        <template slot-scope="{row}">
          <span>{{ formateDate(row.createTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" align="center" label="UpdateTime" width="200">
        <template slot-scope="{row}">
          <span>{{ formateDate(row.updateTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" fixed="right" align="center" label="Status" width="100">
        <template slot-scope="{row}">
          <span>{{ row.delete===1?'禁用':'正常' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        fixed="right"
        align="center"
        label="Disable"
        width="100"
      >
        <template slot-scope="{row}">
          <el-switch
            v-model="row.disable"
            active-color="#13ce66"
            @change="statusChange(row)"
          />
        </template>
      </el-table-column>
      <el-table-column fixed="right" class-name="status-col" align="center" label="Actions" width="200">
        <template slot-scope="{row}">
          <el-button-group>

            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="dispatchRoles(row)"
            >
              分配角色
            </el-button>
            <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteOne(row)">
              删除
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :destroy-on-close="true" title="分配角色" :visible.sync="dispatchRolesDialog" width="50%" :center="true">
      <el-checkbox v-model="checkAll" style="margin:0 40%" border :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;" />
      <el-checkbox-group v-model="checkedRoles" @change="checkedRolesChange">
        <el-checkbox v-for="role in roles" :key="role.id" size="mini" :label="role">{{ role.desc }}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dispatchRolesDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateUserRoles">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, update, remove, dispatchRoles } from '@/api/system/user'
import { fetchList as listRoles } from '@/api/system/role'

export default {
  name: 'InlineEditTable',
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
      dispatchRolesDialog: false,
      checkAll: false,
      checkedRoles: [],
      roles: [],
      currentModifiingUser: {},
      isIndeterminate: true,
      direction: 'ltr',
      adduser: false,
      list: null,
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
    async updateUserRoles() {
      this.currentModifiingUser.roles = this.checkedRoles
      const { code } = await dispatchRoles(this.currentModifiingUser)
      if (code === 200) {
        this.$message(
          {
            message: 'modify successed',
            type: 'success'
          }
        )
      } else {
        this.$message(
          {
            message: 'service block',
            type: 'error'
          }
        )
      }
    },
    handleCheckAllChange(val) {
      console.log(val)
      this.checkedRoles = val ? this.roles : []
      this.isIndeterminate = !this.isIndeterminate
    },
    checkedRolesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.roles.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.roles.length
      console.log(this.checkedRoles)
      console.log(value)
    },
    async dispatchRoles(row) {
      this.currentModifiingUser = row
      this.dispatchRolesDialog = true
      const { data } = await listRoles()
      this.roles = data
      // row.roles中的数据与api中获得的数据略微不同，需要进行过滤，不能注解给this.checkedRoles赋值，否则出现渲染bug
      this.roles.forEach(item => {
        row.roles.forEach(c => {
          if (c.id === item.id) {
            this.checkedRoles.push(item)
          }
        })
      })
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
      const { data } = await fetchList()
      console.log(data)
      const items = data
      this.list = items.map(v => {
        this.$set(v, 'disable', v.delete === 1) // https://vuejs.org/v2/guide/reactivity.html
        return v
      })
      this.listLoading = false
    },
    async deleteOne(row) {
      const { code } = await remove(row)
      if (code === 200) {
        this.getList()
        this.$message.success = 'the user has deleted'
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
