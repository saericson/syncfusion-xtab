<template>
  <div>
    <v-row >
      <v-col sm="12" md="6">
        <h5>Premium</h5>
        <pie-chart
          :id="`${sumBy}1`"
          :data-series="myArray"
          :x-fld="sumBy"
          y-fld="prem"
          title="Premiums"
        ></pie-chart>
      </v-col>
      <v-col sm="12" md="6">
        <h5>Loss</h5>
        <pie-chart
          :id="`${sumBy}2`"
          :data-series="myArray"
          :x-fld="sumBy"
          y-fld="loss"
          title="Losses"
        ></pie-chart>
      </v-col>
      <v-col sm="12" md="6">
        <h5>Expense</h5>
        <pie-chart
          :id="`${sumBy}3`"
          :data-series="myArray"
          :x-fld="sumBy"
          y-fld="exp"
          title="Expenses"
        ></pie-chart>
      </v-col>
      <v-col sm="12" md="6">
        <h5>Profitability</h5>
        <Stacked-Bar :id="`${sumBy}4`" :obj-data="myStacked"></Stacked-Bar>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'DashBoard1',
  props: {
    sumBy: {
      type: String,
      required: false,
      default: 'bu',
    },
    },
  data() {
    return {
      dataSeries:[],
    }
  },
  computed: {
    myArray() {
      return this.sumByFld(this.$store.state.simParms.parms, this.sumBy)
    },
    myStacked() {
      const series = this.myArray.map((e) => {
        return {
          name: e[this.sumBy],
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
  },

methods: {

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
