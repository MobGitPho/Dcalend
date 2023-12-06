<template>
    <div class="acceuil">
        <div class="brand"> CALENDRIER
        </div>
        <div class="linebrand">
        </div>
        <div class=" navbar">
            <div class="navl">
                <h4>SESSION DECEMBRE 2022</h4>
            </div>
            <div class="navcent">
                <h4>04 dec. 2022 - 19 janv. 2023</h4>
            </div>
            <div class="navr">
                <span>{{ TotalSom }} £</span><button @click="inscriptionF">
                    <RouterLink to="/Dcalend/">S'inscrire</RouterLink>
                </button>
            </div>

        </div>

        <div class=" row col-12 calend">
            <table>
                <tr>
                    <th>Horaire</th>
                    <th v-for="(hr, k) in allCours" :key="k"> {{ hr[0] }}</th>
                </tr>
                <tbody class="tbody">
                    <tr v-for="(hor, key) in uniqHor" :key="key">
                        <td class="horaire horairecol">
                            {{ hor }} H
                        </td>
                        <td class="horairecol" v-for="(ls, i) in allCours " :key="i">
                            <div id="btnline" v-for="(lss, li) in ls[1][hor]" :key="li"
                                :class="{ 'active': (Object.values(activCour).includes((`${lss.jour}-${key}-${li}`))) }"
                                @click="addCourChoix(lss, key, li, lss.jour)">
                                {{ lss.name }}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class=" aboutform">
            <div class="about">
                <div class="nousecrire">
                    <div class="nous">
                        NOUS
                    </div>
                    <div class="ecrire">
                        ECRIRE
                    </div>


                </div>
                <span>Envoyez-nous vos demandes</span>

            </div>
            <div class="form">
                <form @submit.prevent="">
                    <div class="Forminput">
                        <div class="inputbox">
                            <input type="text" name="Nom" placeholder="Nom">
                            <input type="email" name="Email" placeholder="Email">
                        </div>
                        <div class="inputbox">
                            <input type="text" name="Tel" placeholder="Telephone">
                            <input type="text" name="Sujet" placeholder="Sujet">
                        </div>
                        <textarea name="" id="" placeholder="Message"></textarea>

                    </div>
                    <div class="buttonsubmit">
                        <button @click="inscriptionF">Envoyer</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script  lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useCourStore } from '../stores/danse.js';
import axios from 'axios';

let coursDb: any = useCourStore()
let TotalSom: number =ref(0)
let activCour: any = ref([])
let allCours = coursDb.mesHoraires
let uniqHor = coursDb.uniqHoraire
let mesCours = coursDb.mesCours
TotalSom.value = coursDb.sommeTotal ? coursDb.sommeTotal : 0
activCour.value = coursDb.mesCoursActivChoix

onMounted(() => {
    axios
        .get("https://raw.githubusercontent.com/MobGitPho/Dcalendjson/main/coursDanse.json")
        .then(response => (coursDb.coursdb = response.data));
})
const addCourChoix = (cour: any, hor: number, cp: number, jour: number) => {
    mesCours = coursDb.addChoixDanse(cour, hor, cp, jour);
    activCour.value = coursDb.mesCoursActivChoix;
    TotalSom.value = coursDb.totalSomme(mesCours);

}
const inscriptionF = function () {
    localStorage.removeItem("coursChoix");
    localStorage.clear();
    activCour.value = coursDb.mesCoursActivChoix
    mesCours = coursDb.mesCours
}


/*export default {
    computed(){
        this.allCours.value = this.coursDb.mesHoraires
        console.log('AAZ',this.allCours);
    },
    setup() {

        const coursDb = useCourStore()
        const allCours = ref([])
        const uniqHor = ref([])
        const mesCours = ref([])
        let TotalSom = ref(0);
        let activCour = ref([])
        allCours.value = coursDb.mesHoraires
        uniqHor.value = coursDb.uniqHoraire
        mesCours.value = coursDb.mesCours
        TotalSom.value = coursDb.sommeTotal ? coursDb.sommeTotal : 0
        activCour.value = coursDb.mesCoursActivChoix
        const addCourChoix = function (cour, hor, cp, jour) {
            mesCours.value = coursDb.addChoixDanse(cour, hor, cp, jour)
            activCour.value = coursDb.mesCoursActivChoix
            TotalSom.value = coursDb.totalSomme(mesCours.value)

        }

        const inscriptionF = function () {
            localStorage.removeItem("coursChoix");
            localStorage.clear();
            activCour.value = coursDb.mesCoursActivChoix
            mesCours.value = coursDb.mesCours
        }

        return {
            coursDb,
            allCours,
            mesCours,
            addCourChoix,
            TotalSom,
            activCour,
            uniqHor,
            inscriptionF,
        }
    },
    async created() {
         try {
             const res = await axios.get(`coursDanse.json`);
              this.allCours = res.data;
             console.log('AllCours',Object.entries(this.allCours))
             
         } catch (error) {
             console.log('error',error);
         }
     },
}*/

</script>

<style lang="scss" scoped>
.acceuil {
    background-color: white;
}

.brand {
    text-align: center;
    font-size: 2em;
    font-weight: bold;
    margin-bottom: 2%;
}

.linebrand {
    width: 10%;
    //border-top: 1px solid black;
}

.navbar {
    width: 100%;
    height: auto;
    background-color: rgb(252, 246, 246);
    display: inline-flex;
    justify-content: space-between;
    padding: 10px;

    .navl {
        float: left;
        text-decoration: none;
        font-size: 1em;
        text-align: center;

        h4 {
            padding: 5px;
            text-decoration-color: rgba(0, 0, 0, 0.9);
            font-weight: bold;
        }

    }

    .navcent {
        font-size: 1em;
        text-align: center;

        h4 {
            padding: 5px;
            text-decoration-color: rgba(0, 0, 0, 0.9);
            font-weight: bold;
        }
    }

    .navr {
        span {
            font-size: 1.0em;
            font-weight: bold;
            font-family: Arial, Helvetica, sans-serif;
        }

        button {
            display: flex;
            justify-content: center;
            align-content: center;
            width: auto;
            border-radius: 5px;
            border: none;
            padding: 10px;
            font-size: 1em;
            background-color: rgba(#09023f, 0.9);
            color: rgba(#f3f2f2, 1.0);
            cursor: pointer;

            a {
                text-decoration: none;
                color: rgba(#f3f2f2, 1.0);
                cursor: pointer;
            }
        }
    }

}

.calend {
    width: 100%;
    height: auto;
    margin-bottom: 1.5%;

    table {
        width: 100%;
        height: auto;
        border: 1px solid gray;
        border-spacing: 1px;
        border-spacing: 0px;

        th {
            width: 12.5%;
            background-color: rgba(#09023f, 0.9);
            color: rgba(#ffff, 0.9);
            border: 1px gray;
            border: 1px solid white;
            padding: 10px;
        }

        .tbody {
            border: 1px solid gray;
            border-spacing: 1px;
            cursor: pointer;

            tr {
                width: auto;
                height: auto;
                border-spacing: 1px;
                border: 1px solid gray;
                padding: 15px;

                .horaire {
                    width: 10%;
                    text-align: center;
                }

                .horairecol {
                    cursor: pointer;
                    color: black;
                    font-size: 1em;
                    text-align: center;
                    padding: 5px;
                    width: auto;
                    height: auto;
                    border: 1px solid gray;
                    //padding: 10px;


                    #btnline {
                        display: grid;
                        justify-items: center;
                        justify-content: center;
                        border: 1px solid black;
                        background-color: white;
                        margin-bottom: 5px;
                        width: 100%;
                        height: auto;
                        cursor: pointer;
                        color: black;
                        //padding: 5px;
                        padding-top: 10px;
                        padding-bottom: 10px;
                        padding-left: 10px;
                        padding-right: 10px;

                        &.active {
                            background-color: #fd0c2c;
                            color: rgba(255, 255, 255, 1);
                            text-decoration: none;
                            font-size: 1.2em;
                            font-weight: bold;

                        }
                    }



                }

            }
        }

    }

}

.aboutform {
    width: 100%;
    height: 200px;
    padding: 0%;
    display: -webkit-inline-box;
    justify-content: center;
    align-content: center;

    .about {
        width: 34%;
        height: 200px;
        background-color: #3d3196;
        //border: 1px solid black;
        margin-right: 1%;
        color: white;
        text-align: center;

        //display: grid;
        //justify-content: center;
        //align-content: center;
        .nousecrire {
            margin-top: 10%;
            height: auto;
            width: auto;
            //border: 1px solid red;

            display: flex;
            justify-content: center;

            .nous {
                margin-right: 10px;
                padding-bottom: 10px;
                border-bottom: 1px solid white;
                height: auto;

            }
        }

        span {
            margin-top: 10%;
            margin-bottom: 20%;
            display: flex;
            justify-content: center;
            font-size: 1em;
        }

    }

    .form {
        width: 64%;
        height: auto;
        background-color: #a1a1a3;
        //border: 1px solid black;
        padding: 10px;

        .Forminput {
            margin-left: 5%;

            .inputbox {
                display: flex;
                align-content: center;

                input[type=text],
                select {
                    width: 45%;
                    padding: 5px;
                    border: 1px solid #ccc;
                    box-sizing: border-box;
                    margin-top: 6px;
                    margin-bottom: 6px;
                    margin-right: 5%;
                    resize: vertical;
                }



            }

            textarea {
                width: 95%;
                padding: 5px;
                border: 1px solid #ccc;
                box-sizing: border-box;
                margin-top: 6px;
                margin-bottom: 6px;
                //margin-right: 5%;
                resize: vertical;
            }

            input[type=email] {
                width: 45%;
                padding: 5px;
                border: 1px solid #ccc;
                box-sizing: border-box;
                margin-top: 6px;
                margin-bottom: 6px;
                resize: vertical;
            }

        }

        .buttonsubmit {
            margin-top: 10px;
            //margin-bottom: 5%;
            margin-left: 5%;

            button {
                width: auto;
                border: none;
                padding: 7px;
                font-size: 1em;
                background-color: rgba(#e00909, 0.9);
                color: rgba(#f3f2f2, 1.0);
                cursor: pointer;

            }
        }
    }
}

@media screen and (max-width: 425px) {

    .calend {
        overflow-x: scroll;
    }

    .aboutform {
        width: 100%;
        height: 200px;
        padding: 0%;
        display: -webkit-inline-box;
        justify-content: center;
        align-content: center;

        .about {
            width: 34%;
            height: 200px;
            background-color: #3d3196;
            //border: 1px solid black;
            margin-right: 1%;
            color: white;
            text-align: center;

            //display: grid;
            //justify-content: center;
            //align-content: center;
            .nousecrire {
                margin-top: 10%;
                height: auto;
                width: auto;
                //border: 1px solid red;

                display: grid;
                justify-content: center;

                .nous {
                    margin-right: 10px;
                    margin-bottom: 5px;
                    padding-bottom: 2px;
                    border-bottom: 1px solid white;
                    height: auto;

                }
            }

            span {
                margin-top: 10%;
                margin-bottom: 20%;
                display: flex;
                justify-content: center;
                font-size: 1em;
            }

        }

        .form {
            width: 64%;
            height: auto;
            background-color: #a1a1a3;
            //border: 1px solid black;
            padding: 10px;

            .Forminput {
                margin-left: 5%;

                .inputbox {
                    display: flex;
                    align-content: center;

                    input[type=text],
                    select {
                        width: 45%;
                        padding: 5px;
                        border: 1px solid #ccc;
                        box-sizing: border-box;
                        margin-top: 6px;
                        margin-bottom: 6px;
                        margin-right: 5%;
                        resize: vertical;
                    }



                }

                textarea {
                    width: 95%;
                    padding: 5px;
                    border: 1px solid #ccc;
                    box-sizing: border-box;
                    margin-top: 6px;
                    margin-bottom: 6px;
                    //margin-right: 5%;
                    resize: vertical;
                }

                input[type=email] {
                    width: 45%;
                    padding: 5px;
                    border: 1px solid #ccc;
                    box-sizing: border-box;
                    margin-top: 6px;
                    margin-bottom: 6px;
                    resize: vertical;
                }

            }

            .buttonsubmit {
                margin-top: 10px;
                //margin-bottom: 5%;
                margin-left: 5%;

                button {
                    width: auto;
                    border: none;
                    padding: 7px;
                    font-size: 1em;
                    background-color: rgba(#e00909, 0.9);
                    color: rgba(#f3f2f2, 1.0);
                    cursor: pointer;

                }
            }
        }
    }

}
</style>