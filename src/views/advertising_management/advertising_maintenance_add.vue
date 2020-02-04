<template>
  <div>
    <Row class="mar-top-10">
      <i-col>
        <Card>
          <p slot="title"><Icon type="android-create"></Icon>新增轮播图</p>
          <Row>
            <i-col :span="12">
              <label>请输入轮播图顺序：</label>
              <Input
                v-model="seq"
                :disabled="disabled"
                class="width-200"
                type="number"
                :number="true"
                placeholder="请输入轮播图顺序"
              />
            </i-col>
            <i-col :span="12">
              <label>请输入轮播图信息：</label>
              <Input
                v-model="info"
                :disabled="disabled"
                class="width-200"
                placeholder="请输入轮播图信息"
              />
            </i-col>
            <i-col :span="24" class="mar-top-10" style="display: flex;">
              <label>请上传轮播图图片：</label>
              <lsg-upload
                :imgUrl.sync="adImg"
                @getImgUrl="uploadImgMethod"
                :uploadImg="updateFlag"
                style="display: inline-block"
              ></lsg-upload>
            </i-col>
          </Row>
          <div class="mar-top-10 space-around">
            <Poptip
              placement="top-start"
              confirm
              :title="popTitle"
              @on-ok="insertAdImg"
              @on-cancel="cancel"
              v-if="!disabled"
            >
              <Button type="primary">{{ updateFlag ? '更新' : '新增' }}</Button>
            </Poptip>
            <Button @click="returnLastPage">返回</Button>
          </div>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import { noticeOrAdInsert, noticeOrAdUpdate } from '@/api/user'
import lsgUpload from '../components/upload/lsg-upload'
import config from '@/config'

export default {
  name: 'searchable-table',
  components: {
    lsgUpload
  },
  data() {
    return {
      adImgUrl: '',
      adImg: '',
      updateFlag: false,
      popTitle: '您确认增加当前轮播图吗？',
      disabled: false,
      seq: '',
      info: '',
      id: ''
    }
  },
  mounted() {
    const beforePageData = this.$route.query
    if (beforePageData && Object.keys(beforePageData).length > 0) {
      if (beforePageData.flag === 'detail') {
        this.disabled = true
      } else {
        this.updateFlag = true
        this.id = this.info = beforePageData.params.id
        this.popTitle = '您确认更新当前轮播图吗？'
      }
      this.adImgUrl = beforePageData.params.imgUrl
      this.adImg = config.baseUrl.imgUrl + beforePageData.params.imgUrl
      this.seq = beforePageData.params.seq
      this.info = beforePageData.params.info
    }
  },
  methods: {
    uploadImgMethod(item) {
      this.adImgUrl = item
      this.adImg = item ? config.baseUrl.imgUrl + item : ''
    },
    returnLastPage() {
      this.$router.go(-1)
    },
    insertAdImg() {
      if (!this.adImgUrl) {
        this.$Message.error({
          content: '请先上传图片'
        })
        return
      }
      if (!this.seq) {
        this.$Message.error({
          content: '请选择轮播顺序'
        })
        return
      }
      if (!this.info) {
        this.$Message.error({
          content: '请输入轮播图信息'
        })
        return
      }

      if (this.updateFlag) {
        noticeOrAdUpdate({
          id: this.id,
          info: this.info,
          seq: this.seq,
          imgUrl: this.adImgUrl
        }).then(res => {
          if (res.data && res.data.retCode === '00000') {
            this.$Notice.success({
              title: '提醒',
              desc: '轮播图信息变更成功'
            })
            this.$router.go(-1)
          } else {
            this.$Notice.error({
              title: '提醒',
              desc: '轮播图信息变更失败'
            })
          }
        })
      } else {
        noticeOrAdInsert({
          info: this.info,
          seq: this.seq,
          imgUrl: this.adImgUrl
        }).then(res => {
          if (res.data.retCode === '00000') {
            this.$Notice.success({
              title: '提醒',
              desc: '轮播图新增成功'
            })
            this.$router.go(-1)
          }
        })
      }
    },
    cancel() {}
  }
}
</script>
<style lang="less" scoped>
.mar-top-10 {
  margin-top: 10px;
}

.width-200 {
  width: 200px;
}

.width-500 {
  width: 500px;
}

.space-around {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
