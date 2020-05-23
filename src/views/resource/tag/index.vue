<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row size="medium " style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="380px" align="center" label="TagName">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="Actions"
        width="200"
      >
        <template slot-scope="{row}">
          <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteOne(row)" />
        </template></el-table-column>

    </el-table>
  </div>
</template>

<script>
import { fetchList, remove } from '@/api/resource/tag'

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
    async getList() {
      this.listLoading = true
      const { data } = await fetchList()
      this.list = data
      this.listLoading = false
    },
    async deleteOne(row) {
      const { code } = await remove(row)
      if (code === 200) {
        this.getList()
      } else {
        this.$message.error('service block')
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
