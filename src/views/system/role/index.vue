<template>
  <div class="app-container">

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="380px" align="center" label="RoleName">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="380px" align="center" label="Desc">
        <template slot-scope="{row}">
          <span>{{ row.desc }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" align="center" label="Disable" width="300px">
        <template slot-scope="{row}">
          <el-switch
            v-model="row.delete"
            active-color="#13ce66"
            @change="statusChange(row)"
          />
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { fetchList, update } from '@/api/system/role'

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
        disable: row.disable === 1 ? 0 : 1
      })
      console.log(msg)
      if (code === 200) {
        row.disable = row.disable === 1 ? 0 : 1
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
      const items = data
      this.list = items.map(v => {
        this.$set(v, 'delete', v.disable === 1)
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
