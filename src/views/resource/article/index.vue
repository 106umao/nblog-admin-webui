<template>
  <div class="app-container">
    <el-dialog
      :title="nowTitle"
      :visible.sync="isShowArticleDetail"
      width="70%"
      center
    >
      <span>{{ nowArticle }}</span>

    </el-dialog>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="PublishTime">
        <template slot-scope="{row}">
          <span>{{ formateDate(row.createTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="UpdateTime">
        <template slot-scope="{row}">
          <span>{{ formateDate(row.updateTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="Author">
        <template slot-scope="{row}">
          <span>{{ row.userId }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="Category">
        <template slot-scope="{row}">
          <span>{{ row.category }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="Views">
        <template slot-scope="{row}">
          <span>{{ row.views }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" align="center" label="Title">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.title" class="edit-input" size="small" />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              cancel
            </el-button>
          </template>
          <span v-else>{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" fixed="right" align="center" label="Content">
        <template slot-scope="{row}">
          <el-button type="text" size="mini" @click="showDetail(row)">阅览</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" fixed="right" label="Actions" width="150">
        <template slot-scope="{row}">
          <el-button-group>
            <el-button
              v-if="row.edit"
              type="success"
              size="small"
              icon="el-icon-circle-check-outline"
              @click="confirmEdit(row)"
            >
              Ok
            </el-button>
            <el-button
              v-else
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="row.edit=!row.edit"
            >
              Edit
            </el-button>
            <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteArticle(row)" />
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList, remove } from '@/api/resource/article'

export default {
  name: 'Article',
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
      isShowArticleDetail: false,
      nowArticle: '',
      nowTitle: '',
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
  methods: { formateDate(date) {
    let str = ''
    str = date[0] + '-' + date[1] + '-' + date[2]
    return str
  },
  deleteArticle(row) {
    remove(row)
  },
  showDetail(row) {
    this.nowArticle = row.content
    this.isShowArticleDetail = true
    this.nowTitle = row.title
  },
  async getList() {
    this.listLoading = true
    const { data } = await fetchList()
    const items = data
    console.log(data)
    this.list = items.map(v => {
      this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
      v.originalTitle = v.title //  will be used when user click the cancel botton
      return v
    })
    this.listLoading = false
  },
  cancelEdit(row) {
    row.title = row.originalTitle
    row.edit = false
    this.$message({
      message: 'The title has been restored to the original value',
      type: 'warning'
    })
  },
  confirmEdit(row) {
    row.edit = false
    row.originalTitle = row.title
    this.$message({
      message: 'The title has been edited',
      type: 'success'
    })
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
