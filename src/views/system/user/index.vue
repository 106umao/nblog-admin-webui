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

    </el-table>
  </div>
</template>

<script>
import { fetchList, update } from '@/api/system/user'

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
