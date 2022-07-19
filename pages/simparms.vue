<template>
  <v-container :key="key">
    <ejs-grid
      id="app"
      ref="grid"
      :data-source="dataArr"
      :toolbar="toolbar"
      :toolbar-click="clickHandler"
      :edit-settings="editSettings"
      :action-begin="actionBegin"
      :action-complete="actionComplete"
    >
      <e-columns>
        <e-column
          v-for="(col, i) in cols"
          :key="i"
          :is-primary-key="col.key"
          :field="col.col"
          :header-text="col.head"
          :width="col.width"
          :text-align="col.align"
          :format="col.format"
        ></e-column>
      </e-columns>
    </ejs-grid>

    <v-card class="py-5 mb-5">
      <h5 class="mb-5">Bound dataSource ( = dataArr) Value</h5>
      <div>
        <pre>{{ JSON.stringify(dataArr, null, 2) }}</pre>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import Vue from 'vue'
import { GridPlugin, Edit, Toolbar } from '@syncfusion/ej2-vue-grids'
import { mapGetters } from 'vuex'

Vue.use(GridPlugin)

export default {
  name: 'GridTable',
  provide: {
    grid: [Toolbar, Edit],
  },
  data() {
    return {
      variable: 'prem',
      edits: [],
      dataArr: [],
      cols: [],
      toolbar: ['Edit', 'Update', 'Cancel'],
      editSettings: {
        allowEditing: true,
        allowAdding: false,
        allowDeleting: false,
        mode: 'Normal',
      },
    }
  },
  computed: {
    ...mapGetters('simParms', ['getXrow', 'getXcol', 'getXprem']),
    key() {
      return this.variable + this.getXrow
    },
  },
  created() {
    
  },
  beforeMount() {
    this.$store.dispatch('simParms/INIT_PARMS')
    
  },
  mounted(){
    this.gridRefresh()
  },
  methods: {
    gridRefresh() {
      this.initTable()
      this.dataArr = [...this.dataArr]
    },
    initTable() {
      let fmt = 'C0'
      switch (this.variable) {
        case 'prem':
          this.editSettings.allowEditing = true
          break
        default:
          this.editSettings.allowEditing = false
          fmt = 'C0'
      }
      this.dataArr = this.getCurrent()
      this.cols = this.makeColDefs(this.dataArr, fmt, this.getXrow)
    },
    getCurrent() {
      let res = []
      switch (this.variable) {
        case 'prem':
          res = this.arrayCopy(this.getXprem)
          break
        default:
          res = this.arrayCopy(this.getXprem)
      }
      return res
    },
    makeColDefs(data, fmt, rowCol) {
      const cols = Object.keys(data[0]).map((e) => {
        let key = false
        if (e === rowCol) {
          key = true
        } else key = false
        return {
          col: e,
          head: e,
          key,
          width: 40,
          format: fmt,
          align: 'Right',
        }
      })
      cols[0].align = 'Left'
      return cols
    },
    arrayCopy(arr) {
      return arr.map((e) => {
        let tmp = JSON.stringify(e)
        tmp = JSON.parse(tmp)
        return tmp
      })
    },
    clickHandler(args) {
      if (args.item.id === 'grid_toggle') {
        const gridIns = this.$refs.grid.ej2Instances
        if (gridIns.editSettings.mode === 'Normal') {
          alert('Dialog Edit Mode')
          gridIns.editSettings.mode = 'Dialog'
        } else if (gridIns.editSettings.mode === 'Dialog') {
          alert('Batch Edit Mode')
          gridIns.editSettings.mode = 'Batch'
        } else {
          alert('Normal Edit Mode')
          gridIns.editSettings.mode = 'Normal'
        }
      }
    },
    actionBegin(args) {
      if (args.requestType === 'beginedit') {
        if (args.rowIndex + 1 === this.dataArr.length) {
          args.cancel = true
          alert('You are not able to edit the Total row')
        }
      }
    },
    actionComplete(args) {
      switch (args.requestType) {
        case 'save':
          this.edits = this.xtabSaveEdit()
          break
        default:
      }
    },
    xtabSaveEdit() {
      const oldXtab = this.getCurrent(this.variable)
      const newXtab = this.dataArr
      const rows = this.getXrow
      const cols = Object.keys(newXtab[0]).filter((e) => e !== rows)
      const edits = newXtab.map((e, idx) => {
        const oldRow = oldXtab[idx]
        const tmp = cols.map((col) => {
          const tmp = {}
          tmp[rows] = e[rows]
          tmp[this.getXcol] = col
          tmp[this.variable] = e[col]
          tmp[this.variable + '_old'] = oldRow[col]
          tmp.chng = e[col] !== oldRow[col]
          tmp.total = col === 'Total'
          return tmp
        })
        return tmp // .filter(e => e.chng)
      })
      return edits
    },
  },
}
</script>
