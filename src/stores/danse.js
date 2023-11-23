import { defineStore } from 'pinia'
import coursDance from './coursDanse.json'

export const useCourStore = defineStore('cours', {
  state: () => ({
    coursdb: coursDance,
    fd: localStorage.getItem('coursdb') ? JSON.parse(localStorage.getItem('coursdb')) : [],
    courChoix: localStorage.getItem('coursChoix')
      ? JSON.parse(localStorage.getItem('coursChoix'))
      : []
  }),
  persist: {
    key: 'storeDanse',
    storage: localStorage
  },
  actions: {
    addChoixDanse(tab, hor, courpos, jr) {
      let resultadd = []
      let choix = {
        ...tab,
        horc: hor,
        idci: courpos,
        jour: jr,
        idu: `${jr}-${hor}-${courpos}`,
        jh: `${jr}-${hor}`,
        activ: 1,
        totprice: tab.price
      }
      let fndidjh = this.courChoix.find((p) => p.jh == choix.jh)

      //console.log('fndidj', fndidjh)

      if (fndidjh != undefined) {
        // Cours deja select donc on verifie son idc jr-hr
        let fndidudel = this.courChoix.find((p) => p.idu == fndidjh.idu)
        //console.log('fndidcudel', fndidudel)
        if (fndidudel != undefined) {
          // verif si c'est le mëm cour
          let del = this.courChoix.find((p) => p.idu == fndidudel.idu)
          let posdel = this.courChoix.indexOf(del)
          if (del.idu === choix.idu) {
            this.courChoix.splice(posdel, 1)
          } else {
            this.courChoix.splice(posdel, 1)
            this.courChoix.push(choix)
          }
          localStorage.setItem('coursChoix', JSON.stringify(this.courChoix))
          resultadd = JSON.parse(localStorage.getItem('coursChoix'))
        } else {
          //console.log(404)
        }
      } else {
        this.courChoix.push(choix)

        localStorage.setItem('coursChoix', JSON.stringify(this.courChoix))
        resultadd = JSON.parse(localStorage.getItem('coursChoix'))
      }

      return resultadd
    },

    mesCoursChoix(act) {
      this.courChoix = localStorage.getItem('coursChoix')
        ? JSON.parse(localStorage.getItem('coursChoix'))
        : []
      let active = act

      return !active
    },
    totalSomme(pan) {
      let TotalSom = 0
      pan.forEach((value) => {
        TotalSom += value.totprice
      })

      return TotalSom
    }
  },

  getters: {
    mesHoraires: (state) => {
      state.fd = state.coursdb
      let fnd = []
      fnd = Object.entries(state.fd)
      return fnd
    },
    uniqHoraire: (state) => {
      state.fd = Object.entries(state.coursdb)
      let fnd = []
      let res = []
      fnd = state.fd
      let nb = state.fd.length
      fnd.forEach((el) => {
        for (let index = 0; index < nb; index++) {
          fnd = el[1]
        }
        res = Object.keys(fnd)
      })
      //console.log('uniqHoraire', res)
      return res
    },

    NbCourChoice(state) {
      return state.courChoix.length ? state.courChoix.length : 0
    },
    mesCours: (state) => {
      state.courChoix = localStorage.getItem('coursChoix')
        ? JSON.parse(localStorage.getItem('coursChoix'))
        : []

      return state.courChoix
    },
    mesCoursActivChoix(state) {
      state.courChoix = localStorage.getItem('coursChoix')
        ? JSON.parse(localStorage.getItem('coursChoix'))
        : []
      let fnd = state.courChoix.filter((p) => p.activ == 1)
      const dataToReturn = fnd.map((item) => item.idu)

      return dataToReturn
    },
    sommeTotal: (state) => {
      state.courChoix = localStorage.getItem('coursChoix')
        ? JSON.parse(localStorage.getItem('coursChoix'))
        : []
      let TotalSom = 0
      state.courChoix.forEach((value) => {
        TotalSom += value.totprice
      })
      return TotalSom
    }
  }
})
