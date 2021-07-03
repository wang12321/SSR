<template>
  <div class="cus-table">
    <el-table
      v-loading="page.loading"
      tooltip-effect="dark"
      header-row-class-name="table-header"
      size="small"
      :border="true"
      :data="page.list"
      style="width: 100%"
    >
      <el-table-column
        v-for="(col, i) in cols"
        :key="i"
        :prop="col.prop"
        :label="col.label"
      />
    </el-table>
    <el-pagination
      background
      layout="total, sizes, prev, pager, next"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="page.pageSize"
      :current-page="page.currPage"
      :total="page.totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'CusTable',
  props: {
    page: {
      type: Object, require: true
    },
    cols: {
      type: Array, require: true
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('dataChange', { page: 1, pageSize: val })
    },
    handleCurrentChange (val) {
      this.$emit('dataChange', { page: val, pageSize: this.page.pageSize })
    }
  }
}
</script>

<style scoped>
.cus-table {
  padding: 10px;
}
.cus-table .el-pagination {
  float: right;
  margin-top: 10px;
}
</style>

<style>
.cus-table .table-header {
  background: #ccc
}
</style>
