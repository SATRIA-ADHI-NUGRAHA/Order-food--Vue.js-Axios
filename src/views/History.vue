<template>
  <div id="app">
    <div id="nav">
      <div class="container-fluit">
        <div class="row">
          <div class="col-lg-12 nopadding">
            <Navbarhis />
            <div class="row">
              <div class="col-lg-1 nopadding">
                <div class="menuhis">
                  <Menu />
                </div>
              </div>
              <div class="col-lg-11 nopadding">
                <div class="content-his">
                  <div class="row">
                    <div class="income col-lg-12">
                      <div class="row">
                        <div class="text-in">
                          <img src="../assets/img/orange.png" alt />
                          <p class="text1">
                            <b>Today’s Income</b>
                          </p>
                          <p class="text2">
                            <b>Rp. 1.000.000</b>
                          </p>
                          <p class="text3">
                            <b>+2% Yesterday</b>
                          </p>
                        </div>
                        <div class="text-in">
                          <img src="../assets/img/biru.png" alt />
                          <p class="text1">
                            <b>Orders</b>
                          </p>
                          <p class="text2">
                            <b>3.270</b>
                          </p>
                          <p class="text3">
                            <b>+5% Last Week</b>
                          </p>
                        </div>
                        <div class="text-in">
                          <img src="../assets/img/ungu.png" alt />
                          <p class="text1">
                            <b>This Year’s Income</b>
                          </p>
                          <p class="text2">
                            <b>Rp. 100.000.000.000</b>
                          </p>
                          <p class="text3">
                            <b>+10% Last Year</b>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="chart-svg col-lg-12">
                      <img src="../assets/svg/chart.svg" alt />
                    </div>
                    <div class="table-bg col-lg-12">
                      <div class="d-flex justify-content-between mb-3">
                        <div class="p-2" style="font-size: 25px;">
                          <b>Recent Order</b>
                        </div>
                        <div class="p-2">
                          <div class="dropdown">
                            <button
                              class="btn btn-secondary dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >Today</button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              <a class="dropdown-item" href="#">Week</a>
                              <a class="dropdown-item" href="#">Month</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">INVOICE</th>
                            <th scope="col">CASHIER</th>
                            <th scope="col">DATE</th>
                            <th scope="col">ORDERS</th>
                            <th scope="col">AMOUNT</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>#10928</td>
                            <td>Cashier 1</td>
                            <td>6 Oktober 2020</td>
                            <td>Ice Tea, Salad, Salmon</td>
                            <td>Rp. 120.000</td>
                          </tr>
                          <tr>
                            <td>#10929</td>
                            <td>Cashier 1</td>
                            <td>6 Oktober 2020</td>
                            <td>Salad, Salmon</td>
                            <td>Rp. 100.000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import Navbarhis from '../components/Navbarhis'
import Menu from '../components/Menu'
import axios from 'axios'

export default {
  data () {
    return {
      users: []
    }
  },
  components: {
    Navbarhis,
    Menu
  },
  methods: {
    fetchAPI () {
      axios
        .get('http://localhost:5000/product/getall')
        .then((response) => {
          this.users = response.data.data
          console.log(this.users)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
