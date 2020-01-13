<template>
  <Modal
    title="选取地址"
    v-model="mapModel"
    width="900"
    @on-ok="confirmEditScope"
    @on-visible-change="modelChange"
    class-name="vertical-center-modal"
  >
    <div style="height: 500px">
      <el-amap vid="amapDemo" :center="center" :zoom="zoom" :events="events">
        <el-amap-marker
          vid="component-marker"
          :position="markerPosition"
        ></el-amap-marker>
      </el-amap>
      <div class="toolbar">
        position: [{{ lng }}, {{ lat }}] address: {{ address }}
      </div>
    </div>
  </Modal>
</template>

<script>
export default {
  props: {
    modelShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let self = this
    return {
      mapModel: self.modelShow,
      zoom: 12,
      center: [108.93977, 34.341574],
      markerPosition: [108.93977, 34.341574],
      address: '陕西省西安市未央区张家堡街道西安市城管执法局西安市人民政府',
      lng: 0,
      lat: 0,
      events: {
        click(e) {
          let { lng, lat } = e.lnglat
          self.lng = lng
          self.lat = lat
          self.markerPosition = [lng, lat]
          // 这里通过高德 SDK 完成。
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: 'all'
          })
          geocoder.getAddress([lng, lat], function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.regeocode) {
                self.address = result.regeocode.formattedAddress
                self.$nextTick()
              }
            }
          })
        }
      }
    }
  },

  methods: {
    confirmEditScope() {
      this.$emit('chooseMapLocation', {
        address: this.address,
        location: [this.lng, this.lat]
      })
    },
    modelChange(value) {
      this.$emit('modelChange', value)
    }
  },

  watch: {
    modelShow(val) {
      this.mapModel = val
    }
  }
}
</script>

<style></style>
