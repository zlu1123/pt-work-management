<template>
  <div>
    <Row :gutter="10">
      <i-col span="24">
        <Card>
          <p slot="title" style="height: auto;">
            <Icon type="navicon-round"></Icon>地址列表
            <Button
              type="error"
              icon="md-add"
              style="margin-left: 20px;"
              @click="addAddress"
              >新增地址</Button
            >
          </p>
        </Card>
      </i-col>
      <i-col span="8">
        <Card>
          <p slot="title" style="height: auto;">
            <Icon type="navicon-round"></Icon>省
          </p>
          <label>省/直辖市：</label>
          <Select
            v-model="province"
            style="width:200px;"
            label-in-value
            @on-change="changeProvince"
          >
            <Option
              v-for="item in provinceList"
              :value="item.province"
              :key="item.province"
              >{{ item.province }}</Option
            >
          </Select>
        </Card>
      </i-col>
      <i-col span="8">
        <Card>
          <p slot="title" style="height: auto;">
            <Icon type="navicon-round"></Icon>市
          </p>
          <label>市列表：</label>
          <Select
            v-model="city"
            style="width:200px;"
            label-in-value
            @on-change="changeCity"
          >
            <Option
              v-for="item in cityList"
              :value="item.city"
              :key="item.city"
              >{{ item.city }}</Option
            >
          </Select>
        </Card>
      </i-col>
      <i-col span="8">
        <Card>
          <p slot="title" style="height: auto;">
            <Icon type="navicon-round"></Icon>区
          </p>
          <label>区列表：</label>
          <Select v-model="area" style="width:200px;" label-in-value>
            <Option
              v-for="item in areaList"
              :value="item.area"
              :key="item.area"
              >{{ item.area }}</Option
            >
          </Select>
        </Card>
      </i-col>
    </Row>
    <Modal
      v-model="showModel"
      title="增加地址"
      :loading="loading"
      @on-ok="addAddrDes"
      @on-cancel="showModel = false"
    >
      <div class="margin-bottom-10">
        <Form>
          <FormItem label="Name" prop="name">
            <Input
              v-model="addrContent.province"
              placeholder="请输入内容"
              style="width: 100px"
            />
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
import { addrQuery, addrMatn } from '@/api/user'
export default {
  data() {
    return {
      province: '',
      provinceList: [],
      city: '',
      cityList: [],
      area: '',
      areaList: [],
      showModel: false,
      loading: true,
      addrContent: {},
      addAddrFlag: '0',
      allData: []
    }
  },
  mounted() {
    this.getAddressList()
    // addrDel({
    //   province: '河南'
    // }).then(res => {
    //   console.log(res)
    // })
  },
  methods: {
    addAddrDes() {
      if (!this.addrContent) {
        this.$Message.error({
          content: '输入内容不能为空'
        })
        return
      }
      addrMatn(this.addrContent).then(res => {
        if (res && res.data.retCode) {
          this.showModel = false
          this.$Notice.success({
            title: '提醒',
            desc: '添加成功'
          })
        } else {
          this.showModel = false
          this.$Notice.error({
            title: '提醒',
            desc: '添加失败'
          })
        }
      })
    },
    addAddress() {
      this.showModel = true
      this.addAddrFlag = '1'
    },
    addCity() {
      this.showModel = true
      this.addAddrFlag = '2'
    },
    addArea() {
      this.showModel = true
      this.addAddrFlag = '3'
    },
    getAddressList() {
      addrQuery().then(res => {
        if (res && res.data.retCode === '00000') {
          this.fixProvinceList(res.data.data)
          this.allData = res.data.data
        }
      })
    },

    fixProvinceList(data) {
      let provinceArray = []
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if (provinceArray.length === 0) {
            provinceArray.push(data[i])
          }
          for (let j = 0; j < provinceArray.length; j++) {
            if (data[i].province !== provinceArray[j].province) {
              provinceArray.push(data[i])
            }
          }
        }
      }
      this.provinceList = provinceArray
      this.province = provinceArray[0].province
      this.fixCityList(data, this.province)
    },

    fixCityList(data, province) {
      let cityArray = []
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].province === province) {
            if (cityArray.length === 0) {
              cityArray.push(data[i])
              for (let j = 0; j < cityArray.length; j++) {
                if (data[i].city !== cityArray[j].city) {
                  cityArray.push(data[i])
                }
              }
            }
          }
        }
      }
      this.cityList = cityArray
      this.city = cityArray[0].city
      this.fixAreaList(data, province, this.city)
    },

    fixAreaList(data, province, city) {
      let areaArray = []
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].province === province && data[i].city === city) {
            if (areaArray.length === 0) {
              areaArray.push(data[i])
              for (let j = 0; j < areaArray.length; j++) {
                if (data[i].area !== areaArray[j].area) {
                  areaArray.push(data[i])
                }
              }
            }
          }
        }
      }
      this.areaList = areaArray
      this.area = areaArray[0].area
    },

    changeProvince(item) {
      if (item && item.value) {
        this.province = item.value
        this.fixCityList(this.allData, item.value)
      }
    },
    changeCity(item) {
      if (item && item.value) {
        this.city = item.value
        this.fixCityList(this.allData, this.province, item.value)
      }
    }
  }
}
</script>

<style></style>
