<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="380px" align="center" label="Content">
        <template slot-scope="{row}">
          <span>{{ row.content }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="CommentId">
        <template slot-scope="{row}">
          <span>{{ row.commentId }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="FromUserId">
        <template slot-scope="{row}">
          <span>{{ row.fromUserId }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" label="ToUserId" align="center">
        <template slot-scope="{row}">
          <span>{{ row.toUserId }}</span>
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

      <el-table-column fixed="right" class-name="status-col" align="center" label="Actions" width="200">
        <template slot-scope="{row}">
          <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteOne(row)" />
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { fetchList, remove } from '@/api/resource/reply'

export default {
  name: 'Reply',
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
