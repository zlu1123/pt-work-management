<template>
  <div>
    <Row class="margin-top-10">
      <i-col>
        <Card>
          <p slot="title" style="height: auto;">
            <Icon type="android-create"></Icon>企业{{
              disabled ? '详情' : updateFlag ? '信息修改' : '新增'
            }}
            <Button
              type="error"
              style="margin-left: 20px"
              @click="returnLastPage"
              >返回</Button
            >
          </p>

          <Row class="margin-top-10">
            <Form
              ref="merchInfoParam"
              :model="merchInfoParam"
              :rules="ruleValidate"
              :label-width="150"
            >
              <i-col span="24">
                <div>
                  <FormItem label="企业名称：" prop="merchName">
                    <Input
                      :disabled="disabled"
                      v-model="merchInfoParam.merchName"
                      style="width: 200px"
                    />
                  </FormItem>
                  <FormItem label="企业地址：" prop="merchAddr">
                    <Input
                      :disabled="disabled"
                      v-model="merchInfoParam.merchAddr"
                      style="width: 200px"
                      @on-focus="chooseAddr"
                    />
                  </FormItem>
                </div>
              </i-col>
              <i-col span="24" class="margin-top-10">
                <div>
                  <FormItem label="企业邮箱：" prop="merchEmail">
                    <Input
                      :disabled="disabled"
                      v-model="merchInfoParam.merchEmail"
                      style="width: 200px"
                      type="email"
                    />
                  </FormItem>
                  <FormItem label="企业电话：" prop="merchMobile">
                    <Input
                      :disabled="disabled"
                      v-model="merchInfoParam.merchMobile"
                      style="width: 200px"
                      type="tel"
                    />
                  </FormItem>
                </div>
              </i-col>
              <i-col span="24" class="margin-top-10">
                <FormItem label="企业说明：" prop="merchInfo">
                  <Input
                    :disabled="disabled"
                    v-model="merchInfoParam.merchInfo"
                    style="width: 200px"
                    placeholder="请输入企业说明"
                    maxlength="1000"
                    :autosize="{ minRows: 5, maxRows: 10 }"
                    show-word-limit
                    type="textarea"
                    class="width-800"
                  />
                </FormItem>
              </i-col>
              <FormItem label="请上传企业图片：" prop="merchImg">
                <i-col span="24" class="col-upload-lsg">
                  <lsg-upload
                    :imgUrl.sync="merchShowImg"
                    @getImgUrl="uploadImgMethod"
                    :uploadImg="updateFlag"
                    v-model="merchInfoParam.merchImg"
                  ></lsg-upload>
                </i-col>
              </FormItem>
            </Form>
            <div class="btn__col" style="margin-top: 20px;">
              <Poptip
                placement="top-start"
                confirm
                :title="popTitle"
                @on-ok="addMerchant"
                @on-cancel="cancel"
                v-if="!disabled"
              >
                <Button type="primary">{{
                  updateFlag ? '更新' : '新增'
                }}</Button>
              </Poptip>
            </div>
          </Row>
        </Card>
      </i-col>
    </Row>
    <address-map
      :model-show="showMap"
      @chooseMapLocation="chooseMapLocation"
      @modelChange="mapModelChange"
      :markerPosition.sync="merchLngLat"
      :address.sync="merchAddrName"
    ></address-map>
  </div>
</template>

<script>
import { enterpriseManageInsert, enterpriseReleaseUpdate } from '@/api/user'
import addressMap from '../components/amap/address-map.vue'
import lsgUpload from '../components/upload/lsg-upload.vue'
import config from '@/config'
import { mapGetters } from 'vuex'

export default {
  name: 'searchable-table',
  data() {
    return {
      merchCharge: '',
      merchAddr: '',
      merchAddrName:
        '陕西省西安市未央区张家堡街道西安市城管执法局西安市人民政府',
      merchName: '',
      merchEmail: '',
      merchMobile: '',
      disabled: false,
      updateFlag: false,
      popTitle: '您确认增加当前企业吗？',
      showMap: false,
      merchImg: '',
      merchShowImg: '',
      merchLngLat: [108.93977, 34.341574],
      merchInfo: '',
      merchInfoParam: {
        merchName: '',
        merchAddr: '',
        merchEmail: '',
        merchMobile: '',
        merchInfo: '',
        merchImg: ''
      },
      ruleValidate: {
        merchName: [
          {
            required: true,
            message: '企业名称不能为空',
            trigger: 'blur'
          }
        ],
        merchAddr: [
          {
            required: true,
            message: '企业地址不能为空',
            trigger: 'blur'
          }
        ],
        merchEmail: [
          {
            required: true,
            message: '企业邮箱不能为空',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '邮箱格式不正确',
            trigger: 'blur'
          }
        ],
        merchMobile: [
          {
            required: true,
            message: '企业电话不能为空',
            trigger: 'blur'
          }
        ],
        merchInfo: [
          {
            required: true,
            message: '企业说明不能为空',
            trigger: 'blur'
          }
        ],
        merchImg: [
          {
            required: true,
            message: '企业LOGO不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  components: {
    addressMap,
    lsgUpload
  },

  mounted() {
    const beforePageData = this.$route.query
    if (beforePageData && Object.keys(beforePageData).length > 0) {
      if (beforePageData.flag === 'detail') {
        this.disabled = true
      } else {
        this.updateFlag = true
        this.popTitle = '您确认更新当前企业信息吗？'
      }
      this.merchInfoParam.merchName = beforePageData.params.merchName
      this.merchInfoParam.merchImg = beforePageData.params.merchImg
      this.merchInfoParam.merchEmail = beforePageData.params.merchEmail
      this.merchInfoParam.merchMobile = beforePageData.params.merchMobile
      this.merchInfoParam.merchAddr = beforePageData.params.merchAddr
      this.merchInfoParam.merchInfo = beforePageData.params.merchInfo

      this.merchCharge = beforePageData.params.merchId
      this.merchShowImg = config.baseUrl.imgUrl + this.merchInfoParam.merchImg
      this.merchLngLat = beforePageData.params.merchLngLat.split(',')
      this.merchAddrName = beforePageData.params.merchAddr
    }
  },
  methods: {
    mapModelChange(value) {
      this.showMap = value
    },
    chooseMapLocation(item) {
      this.merchAddrName = item.address
      this.merchLngLat = item.location
      this.merchInfoParam.merchAddrName = item.address
      this.merchInfoParam.merchAddr = this.merchAddrName
    },
    uploadImgMethod(item) {
      this.merchInfoParam.merchImg = item
      this.merchShowImg = item ? config.baseUrl.imgUrl + item : ''
    },
    chooseAddr() {
      this.showMap = true
      this.merchInfoParam.merchAddr = this.merchAddrName
    },
    returnLastPage() {
      this.$router.go(-1)
    },
    addMerchant() {
      this.$refs.merchInfoParam.validate(valid => {
        if (valid) {
          if (this.updateFlag) {
            this.merchInfoParam.merchId = this.merchCharge
            this.merchInfoParam.merchLngLat = this.merchLngLat.join(',')
            // 更新
            enterpriseReleaseUpdate(this.merchInfoParam).then(res => {
              if (res.data && res.data.retCode === '00000') {
                this.$Notice.success({
                  title: '提醒',
                  desc: '企业信息更新成功'
                })
                this.$router.go(-1)
              } else {
                this.$Notice.error({
                  title: '提醒',
                  desc: '企业信息更新失败'
                })
              }
            })
          } else {
            this.merchInfoParam.merchLngLat = this.merchLngLat.join(',')
            // 新增
            enterpriseManageInsert(this.merchInfoParam).then(res => {
              if (res.data && res.data.retCode === '00000') {
                this.$Notice.success({
                  title: '提醒',
                  desc: '企业新增成功'
                })
                this.$router.go(-1)
              }
            })
          }
        } else {
          this.$Message.error('请按照规则输入')
        }
      })
    },
    cancel() {}
  },
  computed: {
    ...mapGetters(['getCookieToken'])
  }
}
</script>
<style lang="less" scoped>
.margin-top-10 {
  margin-top: 10px;
}
.btn__col {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
