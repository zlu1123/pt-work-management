<template>
  <div class="lsg__upload">
    <div class="demo-upload-list">
      <template v-if="imgUrl">
        <img :src="imgUrl" />
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView"></Icon>
          <Icon
            v-if="uploadImg"
            type="ios-trash-outline"
            @click.native="handleRemove"
          ></Icon>
        </div>
      </template>
      <Upload
        v-else
        ref="upload"
        :show-upload-list="false"
        type="drag"
        name="files"
        :format="['jpg', 'jpeg', 'png']"
        :max-size="10240"
        :action="uploadImageUpload"
        :data="imgData"
        :on-success="handleSuccess"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        class="upload-div"
      >
        <div class="upload-content">
          <Icon type="ios-camera" size="20"></Icon>
        </div>
      </Upload>
      <Modal title="图片详情" v-model="visible">
        <img :src="imgUrl" v-if="visible" style="width: 100%" />
      </Modal>
    </div>
  </div>
</template>

<script>
import { uploadImageUrl } from '@/api/user'
// import config from '@/config'
export default {
  props: {
    imgUrl: {
      type: String,
      default: ''
    },
    uploadImg: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      uploadImageUpload: uploadImageUrl,
      imgData: { type: 'postion' },
      uploadList: [],
      imgName: '',
      visible: false
    }
  },
  methods: {
    handleRemove() {
      this.$emit('getImgUrl', '')
    },
    handleSuccess(res) {
      if (res) {
        if (res.retCode === '00000') {
          // let imgURL = config.baseUrl.imgUrl + res.data[0].imgUrl
          let imgURL = res.data[0].imgUrl
          this.$emit('getImgUrl', imgURL)
        } else {
          this.$Notice.warning({
            desc: res.retInfo
          })
        }
      }
    },
    handleView() {
      this.visible = true
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: '文件类型不正确',
        desc: '文件类型 ' + file.name + ' 不正确, 请选择 jpg、png或者jpeg.'
      })
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '文件大小不正确',
        desc: '文件  ' + file.name + ' 有点大, 不能超过10M.'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.demo-upload-list {
  display: inline-block;
  width: 202px;
  height: 200px;
  text-align: center;
  line-height: 200px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.upload-div {
  display: inline-block;
  width: 200px;
}

.upload-content {
  width: 200px;
  height: 200px;
  line-height: 200px;
}
</style>
