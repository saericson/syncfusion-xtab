<template>
  <div>
    <v-divider class="my-5"></v-divider>
    <h3 class="my-5">By Business Unit</h3>
    <v-row>
      <v-col sm="12" md="6">
        <h5>Premium</h5>
        <pie-chart
          :id="1"
          :data-series="myArray1"
          x-fld="bu"
          y-fld="prem"
          title="Premiums"
        ></pie-chart>
      </v-col>
      <v-col sm="12" md="6">
        <h5>Loss</h5>
        <pie-chart
          :id="2"
          :data-series="myArray1"
          x-fld="bu"
          y-fld="loss"
          title="Losses"
        ></pie-chart>
      </v-col>
      <v-col sm="12" md="6">
        <h5>Expense</h5>
        <pie-chart
          :id="3"
          :data-series="myArray1"
          x-fld="bu"
          y-fld="exp"
          title="Expenses"
        ></pie-chart>
      </v-col>
      <v-col sm="12" md="6">
        <h5>Profitability</h5>
        <Stacked-Bar :id="1" :obj-data="myStacked1"></Stacked-Bar>
      </v-col>
    </v-row>

    <v-divider class="my-5"></v-divider>
    <h3 class="my-5">By Line of Business</h3>
    <v-row>
      <v-col sm="12" md="6">
        <h5>Premium</h5>
        <pie-chart
          :id="5"
          :data-series="myArray2"
          x-fld="lob"
          y-fld="prem"
          title="Premiums"
        ></pie-chart>
      </v-col>
      <v-col sm="12" md="6">
        <h5>Loss</h5>
        <pie-chart
          :id="6"
          :data-series="myArray2"
          x-fld="lob"
          y-fld="loss"
          title="Losses"
        ></pie-chart>
      </v-col>
      <v-col sm="12" md="6">
        <h5>Expense</h5>
        <pie-chart
          :id="7"
          :data-series="myArray2"
          x-fld="lob"
          y-fld="exp"
          title="Expenses"
        ></pie-chart>
      </v-col>
      <v-col sm="12" md="6">
        <h5>Profitability</h5>
        <Stacked-Bar :id="2" :obj-data="myStacked2"></Stacked-Bar>
      </v-col>
    </v-row>

    <v-divider class="my-5"></v-divider>
    <h3 class="my-5">BU x LOB Cross-tabs</h3>
    <v-row>
      <v-col sm="12">
        <h5>Premium</h5>
        <Grid-Table :table="crossTab1"></Grid-Table>
      </v-col>
    </v-row>

    <v-row>
      <v-col sm="12">
        <h5>Loss Ratio</h5>
        <Grid-Table :table="crossTab2"></Grid-Table>
      </v-col>
    </v-row>

    <v-divider class="my-5"></v-divider>

    <v-row>
      <v-col class="text-center">
        <v-expansion-panels accordion>
          <v-expansion-panel>
            <v-expansion-panel-header> crossTab1 </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="control-section">
                <pre>{{ JSON.stringify(crossTab2, null, 2) }}</pre>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'DashBoard4',
  props: {
    dataSeries: {
      type: Array,
      required: true,
      default() {
        return [
          { x: 'Argentina', y: 505370, r: '50%' },
          { x: 'Belgium', y: 551500, r: '70%' },
          { x: 'Cuba', y: 312685, r: '84%' },
          { x: 'Dominican Republic', y: 350000, r: '97%' },
          { x: 'Egypt', y: 301000, r: '84%' },
          { x: 'Kazakhstan', y: 300000, r: '70%' },
          { x: 'Somalia', y: 357022, r: '90%' },
        ]
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    myArray1() {
      return this.sumByFld(this.dataSeries, this.xTab.row)
    },
    myArray2() {
      return this.sumByFld(this.dataSeries, this.xTab.col)
    },
    myStacked1() {
      const series = this.myArray1.map((e) => {
        return {
          name: e.bu,
          er: e.er,
          lr: Math.min(e.lr, 1 - e.er),
          pr: this.pos(1 - (e.er + e.lr)),
          def: this.neg(1 - (e.er + e.lr)),
        }
      })
      const cols = [
        { x: 'name', y: 'er', name: 'ER' },
        { x: 'name', y: 'lr', name: 'LR' },
        { x: 'name', y: 'pr', name: 'PR' },
        { x: 'name', y: 'def', name: 'DR' },
      ]
      const meta = {
        type: 'StackingColumn',
        title: 'Profitability',
        yaxis: 'Percent of Premium',
        interval: 0.2,
        labelFmt: 'P',
        valueType: 'Category',
        // eslint-disable-next-line no-template-curly-in-string
        format: '<b>${point.y} </b>',
        marker: {
          dataLabel: {
            visible: true,
            position: 'Top',
            font: { fontWeight: '500', color: '#ffffff' },
          },
        },
        palettes: [
          '#01579B',
          '#FF9100',
          '#FF6D00',
          '#43A047',
          '#1B5E20',
          '#E53935',
          '#D50000',
        ],
      }
      return { meta, cols, series }
    },
    myStacked2() {
      const series = this.myArray2.map((e) => {
        return {
          name: e.lob,
          er: e.er,
          lr: Math.min(e.lr, 1 - e.er),
          pr: this.pos(1 - (e.er + e.lr)),
          def: this.neg(1 - (e.er + e.lr)),
        }
      })
      const cols = [
        { x: 'name', y: 'er', name: 'Expense' },
        { x: 'name', y: 'lr', name: 'Loss' },
        { x: 'name', y: 'pr', name: 'Profit' },
        { x: 'name', y: 'def', name: 'Deficit' },
      ]
      const meta = {
        type: 'StackingColumn',
        title: 'Profitability',
        yaxis: 'Percent of Premium',
        interval: 0.2,
        labelFmt: 'P',
        valueType: 'Category',
        // eslint-disable-next-line no-template-curly-in-string
        format: '<b>${point.y} </b>',

        marker: {
          dataLabel: {
            visible: true,
            position: 'Top',
            font: { fontWeight: '500', color: '#ffffff' },
          },
        },
        palettes: [
          '#01579B',
          '#FF9100',
          '#FF6D00',
          '#43A047',
          '#1B5E20',
          '#E53935',
          '#D50000',
        ],
      }
      return { meta, cols, series }
    },
    crossTab1() {
      return this.crossTabSeries(this.xTab.row, this.xTab.col, 'prem', 'C0')
    },
    crossTab2() {
      return this.crossTabSeries(this.xTab.row, this.xTab.col, 'lr', 'P0')
    },
  },
  mounted() {},
  methods: {
    crossTabSeries(row, col, val, fmt) {
      const data = this.crossTab(this.dataSeries, row, col, val)
      const cols = Object.keys(data[0]).map((e) => {
        return {
          col: e,
          head: e,
          width: 40,
          format: fmt,
          align: 'Right',
        }
      })
      cols[0].align = 'Left'
      return { data, cols }
    },
    arrayCopy(arr) {
      let temp = arr.map((e, idx) => Object.assign({ idx }, e))
      temp = temp.map((e) => {
        delete e.idx
        return e
      })
      return temp
    },
    uniqueItems(arr, fld) {
      arr = this.arrayCopy(arr)
      let uniqueArr = arr.map((e) => e[fld])
      uniqueArr = [...new Set(uniqueArr)]
      return uniqueArr
    },
    sumByFld(arr, fld) {
      // sub-totals by fld in array of objects
      const out = []
      const unique = this.uniqueItems(arr, fld)
      unique.forEach((item) => {
        const tmp = this.sum(arr.filter((e) => e[fld] === item))
        tmp[fld] = item
        out.push(tmp)
      })
      return out
    },
    sum(arr) {
      // sums specific properties in array of record objects
      const tmp = {}
      tmp.prem = arr.map((e) => e.prem).reduce((a, b) => a + b, 0)
      tmp.loss = Math.round(
        arr.map((e) => e.prem * e.lr).reduce((a, b) => a + b, 0)
      )
      tmp.exp = Math.round(
        arr.map((e) => e.prem * e.er).reduce((a, b) => a + b, 0)
      )
      tmp.lr = Math.round((10000 * tmp.loss) / tmp.prem) / 10000
      tmp.er = Math.round((10000 * tmp.exp) / tmp.prem) / 10000
      return tmp
    },
    crossTab(arr, rows, cols, value) {
      // create cross-tabulation matrix of value
      // matrix has rows defined by rows and columns defined by cols
      // assumes no duplicate records ==> no summing is needed!!
      // arr=this.arrayCopy(arr) // --> may not be needed
      const uniqRows = this.uniqueItems(arr, rows)
      const uniqCols = this.uniqueItems(arr, cols)
      const res = []
      uniqRows.forEach((row) => {
        const tabRow = {}
        tabRow[rows] = row
        uniqCols.forEach((col) => {
          tabRow[col] = arr.filter(
            (e) => e[rows] === row && e[cols] === col
          )[0][value]
        })
        res.push(tabRow)
      })
      return res
    },
    flip(flds, arr) {
      const res = {}
      arr.forEach((e) => {
        const yName = e[flds.x1] + '-' + e[flds.x2]
        res[yName] = e[flds.y]
      })
      res.x = flds.newX
      return res
    },
    pos(val) {
      if (val >= 0) {
        return val
      } else return 0
    },
    neg(val) {
      if (val < 0) {
        return -val
      } else return 0
    },
  },
}
</script>

<style></style>
