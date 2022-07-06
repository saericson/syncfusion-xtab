export const state = () => ({
  parms: [],
  lobs: [
    { longName: 'Personal Property', shortName: 'PProp' },
    { longName: 'Personal Auto', shortName: 'PAuto' },
    { longName: 'Commercial Property', shortName: 'CProp' },
    { longName: 'Commercial Auto', shortName: 'CAuto' },
    { longName: 'Professional Liability', shortName: 'ProfLiab' },
    { longName: 'Workers Compensation', shortName: 'WC' },
    { longName: 'Products Liability', shortName: 'ProdLiab' },
    { longName: 'Medical Malpractice', shortName: 'MedMal' },
  ],
  lobRels: [
    { shortname: 'PProp', lrRel: 0.95, erRel: 1.05, cvRel: 1.2, prPct: 0.15 },
    { shortname: 'PAuto', lrRel: 1.0, erRel: 1.1, cvRel: 0.9, prPct: 0.25 },
    { shortname: 'CProp', lrRel: 0.9, erRel: 0.95, cvRel: 1.2, prPct: 0.15 },
    { shortname: 'CAuto', lrRel: 1.3, erRel: 1.15, cvRel: 0.9, prPct: 0.15 },
    { shortname: 'ProfLiab', lrRel: 1.08, erRel: 1, cvRel: 1.5, prPct: 0.1 },
    { shortname: 'WC', lrRel: 1.01, erRel: 0.9, cvRel: 1.2, prPct: 0.075 },
    {
      shortname: 'ProdLiab',
      lrRel: 1.1,
      erRel: 1.05,
      cvRel: 1.5,
      prPct: 0.075,
    },
    { shortname: 'MedMal', lrRel: 1.05, erRel: 1.05, cvRel: 1.2, prPct: 0.05 },
  ],
  buRels: [
    { shortname: 'NE_US', lrRel: 1.05, erRel: 1.05, cvRel: 1.2, prPct: 0.15 },
    { shortname: 'SE_US', lrRel: 1.2, erRel: 1.15, cvRel: 0.9, prPct: 0.1 },
    { shortname: 'CE_US', lrRel: 1.1, erRel: 0.95, cvRel: 1.2, prPct: 0.12 },
    { shortname: 'SW_US', lrRel: 0.9, erRel: 1.1, cvRel: 0.9, prPct: 0.15 },
    { shortname: 'NW_US', lrRel: 1.03, erRel: 0.9, cvRel: 1.5, prPct: 0.13 },
    { shortname: 'CAN', lrRel: 0.98, erRel: 1.0, cvRel: 1.2, prPct: 0.15 },
    { shortname: 'MEX', lrRel: 1.01, erRel: 1.075, cvRel: 1.5, prPct: 0.2 },
  ],
  bus: [
    { longName: 'North East US', shortName: 'NE_US' },
    { longName: 'South East US', shortName: 'SE_US' },
    { longName: 'Central US', shortName: 'CE_US' },
    { longName: 'South West US', shortName: 'SW_US' },
    { longName: 'North West US', shortName: 'NW_US' },
    { longName: 'Canada', shortName: 'CAN' },
    { longName: 'Mexico', shortName: 'MEX' },
  ],
  xTab: {
    row: 'bu',
    col: 'lob'
  }
})

export const mutations = {
  ADD_LOB(state, lob) {
    state.lobs.push(lob)
  },
  DROP_LOB(state, dLob) {
    state.lobs = state.lobs.map((e) => {
      if (e.lobName === dLob) {
        e.alive = false
      }
      return e
    })
  },
  ADD_BU(state, bu) {
    state.bus.push(bu)
  },
  DROP_BU(state, dBu) {
    state.bus = state.bus.map((e) => {
      if (e.lobName === dBu) {
        e.alive = false
      }
      return e
    })
  },
  SET_PARMS(state, parms) {
    state.parms = methods.arrayCopy(parms)
  },
  SET_BUS(state, bus) {
    state.bus = bus
  },
  SET_LOBS(state, lobs) {
    state.lobs = lobs
  },
  SET_XTAB(state, xtab) {
    state.xTab = Object.assign({}, xtab)
  },
  RENAME_BU(state, bu) {
    const idx = state.bus.findIndex((e) => e.longName === bu.item)
    const bus = state.bus
    bu = { longName: bu.longName, shortName: bu.shortName }
    bus[idx] = bu
    state.bus = bus
  },
  RENAME_LOB(state, lob) {
    const idx = state.lobs.findIndex((e) => e.longName === lob.item)
    const lobs = state.lobs
    lob = { longName: lob.longName, shortName: lob.shortName }
    lobs[idx] = lob
    state.lobs = lobs
  },
}

export const actions = {
  INIT_PARMS(context) {
    if (context.state.parms.length === 0) {
      const parms = context.getters.initParms
      context.commit('SET_PARMS', parms)
    }
  },
  NEW_PARMS(context) {
    const parms = context.getters.getParms
    context.commit('SET_PARMS', parms)
  },
}

export const getters = {
  initParms: (state) => {
    const parms = []
    state.bus.map((b, i) => {
      const br = Math.min(i, state.buRels.length - 1)
      const buRels = state.buRels[br]
      state.lobs.map((l, j) => {
        const lr = Math.min(j, state.lobRels.length - 1)
        const lobRels = state.lobRels[lr]
        const temp = {}
        temp.key = i * 1000 + j
        temp.alive = true
        temp.buName = b.longName
        temp.bu = b.shortName
        temp.lobName = l.longName
        temp.lob = l.shortName
        temp.prem = Math.round(1000000 * buRels.prPct * lobRels.prPct)
        temp.er = Math.round(100 * 0.32 * buRels.erRel * lobRels.erRel) / 100
        temp.lr = Math.round(100 * 0.65 * buRels.lrRel * lobRels.lrRel) / 100
        temp.cv = Math.round(100 * 0.5 * buRels.cvRel * lobRels.cvRel) / 100
        temp.dist = 'LogNormal'
        temp.cf = j + 1
        temp.cfwt = Math.round(100 * 0.4 * buRels.lrRel * lobRels.lrRel) / 100
        parms.push(temp)
        return null
      })
      return null
    })
    return parms
  },
  getUnused: (state) => {
    const parms = []
    const key = state.parms.map((e) => e.key)
    for (let b = 0; b < state.bus.length; b++) {
      for (let l = 0; l < state.lobs.length; l++) {
        const temp = {}
        temp.key = b * 1000 + l
        temp.buName = state.bus[b].longName
        temp.bu = state.bus[b].shortName
        temp.lobName = state.lobs[l].longName
        temp.lob = state.lobs[l].shortName
        const incl =
          state.bus[b].alive && state.lobs[l].alive && !key.includes(temp.key)
        if (incl) parms.push(temp)
      }
    }
    return parms
  },
  getParms: (state) => {
    return state.parms
  },
  getXrow: (state) => {
    return state.xTab.row
  },
  getXcol: (state) => {
    return state.xTab.col
  },
  getXprem: (state) => {
    let arr = methods.crossTab(state, state.xTab.row, state.xTab.col, 'prem')
    arr = methods.sumCols(arr, state.xTab.row)
    arr = methods.sumRecs(arr, state.xTab.row)
    return arr
  },
  getXpremDist: (state) => {
    let arr = methods.crossTab(state, state.xTab.row, state.xTab.col, 'prem')
    arr = methods.sumCols(arr, state.xTab.row)
    arr = methods.sumRecs(arr, state.xTab.row)
    arr = methods.rowDist(arr,state.xTab.row)
    return arr
  },
  getXloss: (state) => {
    let arr = methods.crossTab(state, state.xTab.row, state.xTab.col, 'lr')
    const pr = methods.crossTab(state, state.xTab.row, state.xTab.col, 'prem')
    arr = methods.opCrossTabs(arr,pr,state.xTab.row,'multiply')
    arr = methods.sumCols(arr, state.xTab.row)
    arr = methods.sumRecs(arr, state.xTab.row)
    return arr
  },
  getXexp: (state) => {
    let arr = methods.crossTab(state, state.xTab.row, state.xTab.col, 'er')
    const pr = methods.crossTab(state, state.xTab.row, state.xTab.col, 'prem')
    arr = methods.opCrossTabs(arr,pr,state.xTab.row,'multiply')
    arr = methods.sumCols(arr, state.xTab.row)
    arr = methods.sumRecs(arr, state.xTab.row)
    return arr
  },
  getXlr: (state) => {
    const a = getters.getXloss(state)
    const b = getters.getXprem(state)
    const arr = methods.opCrossTabs(a,b,state.xTab.row,'divide')
    return arr
  },
  getXer: (state) => {
    const a = getters.getXexp(state)
    const b = getters.getXprem(state)
    const arr = methods.opCrossTabs(a,b,state.xTab.row,'divide')
    return arr
  },
  getXcr: (state) => {
    const a = getters.getXlr(state)
    const b = getters.getXer(state)
    const arr = methods.opCrossTabs(a,b,state.xTab.row,'add')
    return arr
  },
  getXcv: (state) => {
    const arr = methods.crossTab(state, state.xTab.row, state.xTab.col, 'cv')
    return arr
  },
  getXsd: (state) => {
    const a = methods.crossTab(state, state.xTab.row, state.xTab.col, 'prem')
    const b = methods.crossTab(state, state.xTab.row, state.xTab.col, 'lr')
    const c = methods.crossTab(state, state.xTab.row, state.xTab.col, 'cv')
    let arr = methods.opCrossTabs(a,b,state.xTab.row,'multiply')
    arr = methods.opCrossTabs(arr,c ,state.xTab.row,'multiply')
    return arr
  },
  getXcf: (state) => {
    const arr = methods.crossTab(state, state.xTab.row, state.xTab.col, 'cf')
    return arr
  },
  getXcfwt: (state) => {
    const arr = methods.crossTab(state, state.xTab.row, state.xTab.col, 'cfwt')
    return arr
  },
}

const methods = {
  uniqueItems(arr, fld) {
    let uniqueArr = arr.map((e) => e[fld])
    uniqueArr = [...new Set(uniqueArr)]
    return uniqueArr
  },
  arrayCopy(arr) {
    return arr.map((e) => Object.assign({},e))
  },
  crossTab(state, rows, cols, value) {
    const uniqRows = methods.uniqueItems(state.parms, rows)
    const uniqCols = methods.uniqueItems(state.parms, cols)
    const res = []
    uniqRows.forEach((row) => {
      const tabRow = {}
      tabRow[rows] = row
      uniqCols.forEach((col) => {
          tabRow[col] = state.parms.filter(
            (e) => e[rows] === row && e[cols] === col
          )[0][value]
      })
      res.push(tabRow)
    })
    return res
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
  opCrossTabs(a, b, rowCol, op) {
    const cols = Object.keys(a[0]).filter((col) => col !== rowCol)
    const tmp = a.map((e, idx) => {
      cols.forEach((col) => {
        switch (op) {
          case 'add':
            e[col] = e[col] + b[idx][col]
            break
          case 'subtract':
            e[col] = e[col] - b[idx][col]
            break
          case 'divide':
            e[col] = e[col] / Math.max(0.01, b[idx][col])
            break
          case 'multiply':
            e[col] = e[col] * b[idx][col]
            break
          default:
            e[col] = -1
        }
      })
      return e
    })
    return tmp
  },
  rowDist(a, rowCol) {
    const cols = Object.keys(a[0]).filter((col) => col !== rowCol)
    const tmp = a.map((e) => {
      cols.forEach((col) => {
        e[col] = e[col] / e.Total
      })
      return e
    })
    return tmp
  },
  sumRecs(arr, col) {
    // sums all cols of all records
    // except rowCol
    const tmp = this.objArrDelKey(arr, col)
    const cols = Object.keys(tmp[0])
    const total = tmp.reduce((prev, cur) => {
      const ret = {}
      cols.forEach((col) => {
        ret[col] = prev[col] + cur[col]
      })
      return ret
    })
    total[col] = 'Total'
    arr.push(total)
    return arr
  },
  sumCols(arr, rowCol) {
    // adds a total column to an array arr
    arr = arr.map((e) => {
      e.Total = this.sumRec(e, rowCol)
      return e
    })
    return arr
  },
  sumRec(rec, rowCol) {
    // sums all columns of a record
    // rowCol is not included
    const cols = Object.keys(rec).filter((col) => col !== rowCol)
    const total = cols.map((e) => rec[e]).reduce((prev, cur) => prev + cur)
    return total
  },
  objArrDelKey(arr, key) {
    arr = this.arrayCopy(arr)
    arr.forEach((obj) => delete obj[key])
    return arr
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
}
