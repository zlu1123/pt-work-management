<template>
  <div>
    <Row :gutter="10">
      <i-col span="24">
        <Card>
          <p slot="title" style="height: auto;">
            <Icon type="navicon-round"></Icon>地址列表
            <Button
              type="primary"
              icon="md-add"
              style="margin-left: 20px;"
              @click="addAddress"
              >新增地址</Button
            >
            <Button
              type="error"
              icon="md-add"
              style="margin-left: 20px;"
              @click="delAddress"
              >删除当前地址</Button
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
          <Select
            v-model="area"
            style="width:200px;"
            label-in-value
            @on-change="changeArea"
          >
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
        <Form
          ref="addrContent"
          :model="addrContent"
          :rules="ruleValidate"
          :label-width="150"
        >
          <FormItem label="省或直辖市：" prop="province">
            <Input
              v-model="addrContent.province"
              placeholder="请输入省或直辖市"
              style="width: 200px"
            />
          </FormItem>
          <FormItem label="市：" prop="city">
            <Input
              v-model="addrContent.city"
              placeholder="请输入城市名称"
              style="width: 200px"
            />
          </FormItem>
          <FormItem label="县/区：" prop="area">
            <Input
              v-model="addrContent.area"
              placeholder="请输入区名称"
              style="width: 200px"
            />
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
import { addrQuery, addrMatn, addrDel } from '@/api/user'
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
      addAddrFlag: '0',
      allData: [],
      addrContent: {
        province: '',
        city: '',
        area: ''
      },
      ruleValidate: {
        province: [
          {
            required: true,
            message: '省或直辖市不能为空',
            trigger: 'blur'
          }
        ],
        city: [
          {
            required: true,
            message: '城市不能为空',
            trigger: 'blur'
          }
        ],
        area: [
          {
            required: true,
            message: '区名称不能为空',
            trigger: 'blur'
          }
        ]
      },
      provinceData: [],
      cityData: [],
      areaData: []
    }
  },
  mounted() {
    this.getAllAddr()
  },
  methods: {
    getAllAddr() {
      this.province = ''
      this.city = ''
      this.area = ''
      this.getAddressList()
    },
    handleReset(name) {
      this.$refs[name].resetFields()
    },
    delAddress() {
      if (!this.province) {
        return
      }
      if (!this.city) {
        return
      }
      this.$Modal.confirm({
        title: '提醒',
        content: `<p>确认删除当前地址吗？</p>`,
        loading: true,
        onOk: () => {
          addrDel({
            province: this.province,
            city: this.city,
            area: this.area
          }).then(res => {
            if (res && res.data.retCode === '00000') {
              this.$Modal.remove()
              this.$Message.info(`删除地址成功`)
              this.getAllAddr()
            }
          })
        }
      })
    },
    addAddrDes() {
      addrMatn(this.addrContent).then(res => {
        if (res && res.data.retCode) {
          this.showModel = false
          this.$Notice.success({
            title: '提醒',
            desc: '添加成功'
          })
          this.getAllAddr()
        } else {
          this.showModel = false
          this.$Notice.error({
            title: '提醒',
            desc: '添加失败'
          })
        }
        this.handleReset('addrContent')
      })
    },

    addAddress() {
      this.showModel = true
    },

    getAddressList() {
      let params = {}
      if (this.province) {
        params.province = this.province
      }
      if (this.city) {
        params.city = this.city
      }
      addrQuery(params).then(res => {
        if (res && res.data.retCode === '00000') {
          if (!this.province) {
            this.provinceData = res.data.data
            this.fixProvinceList()
          } else if (!this.city) {
            this.cityData = res.data.data
            this.fixCityList()
          } else if (!this.area) {
            this.areaData = res.data.data
            this.fixAreaList()
          }
        }
      })
    },

    fixProvinceList() {
      let provinceArray = this.uniqueData(this.provinceData, 'province')
      this.provinceList = provinceArray
      this.province = provinceArray[0].province
      this.getAddressList()
    },

    fixCityList() {
      let cityArray = this.uniqueData(this.cityData, 'city')
      if (cityArray.length > 0) {
        this.cityList = cityArray
        this.city = cityArray[0].city
        this.getAddressList()
      }
    },

    fixAreaList() {
      let areaArray = this.uniqueData(this.areaData, 'area')
      if (areaArray.length > 0) {
        this.areaList = areaArray
        this.area = areaArray[0].area
      }
    },

    changeProvince(item) {
      if (item && item.value) {
        this.province = item.value
        this.city = ''
        this.cityData = []
        this.area = ''
        this.areaData = []
        this.getAddressList()
      }
    },
    changeCity(item) {
      if (item && item.value) {
        this.city = item.value
        this.area = ''
        this.areaData = []
        this.getAddressList()
      }
    },
    changeArea(item) {
      if (item && item.value) {
        this.area = item.value
      }
    },
    uniqueData(arr, flag) {
      let result = arr
        .sort((a, b) => a[flag].localeCompare(b[flag]))
        .reduce((init, current) => {
          if (
            init.length === 0 ||
            init[init.length - 1][flag] !== current[flag]
          ) {
            init.push(current)
          }
          return init
        }, [])
      return result
    }
  }
}
</script>

<style></style>
