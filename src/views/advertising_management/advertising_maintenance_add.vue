<template>
  <div>
    <Row class="margin-top-10">
      <i-col>
        <Card>
          <p slot="title"><Icon type="android-create"></Icon>新增职位</p>
          <Row class="margin-top-10" type="flex" justify="center">
            <i-col :span="14">
              <Upload
                multiple
                type="drag"
                :format="['jpg', 'jpeg', 'png']"
                max-size="10240"
                action="//jsonplaceholder.typicode.com/posts/"
              >
                <div style="padding: 20px 0">
                  <Icon
                    type="ios-cloud-upload"
                    size="52"
                    style="color: #3399ff"
                  ></Icon>
                  <p>点击或者拖拽上传</p>
                </div>
              </Upload>
            </i-col>
          </Row>
          <div class="mar-top-10 space-around">
            <Button type="primary" @click="insertPositon">确认</Button>
            <Button @click="returnLastPage">返回</Button>
          </div>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import { insertPostionRelease } from '@/api/user'

export default {
  name: 'searchable-table',
  data() {
    return {
      positionInfo: {}, // 工作信息
      postionWelfareList: [
        {
          label: '五险一金',
          value: '0'
        },
        {
          label: '餐补',
          value: '1'
        }
      ],
      postionRequireList: [
        {
          label: '体力好',
          value: '0'
        },
        {
          label: '肌肉好',
          value: '1'
        }
      ],
      settlementMethodList: [
        { text: '完工结', value: 2 },
        { text: '次日结', value: 3 },
        { text: '周结', value: 4 },
        { text: '半月结', value: 5 },
        { text: '月结', value: 6 }
      ]
    }
  },
  mounted() {},
  methods: {
    returnLastPage() {
      this.$router.go(-1)
    },
    insertPositon() {
      // {
      //   merchId: '202001019536',
      //   postionName: '揽货员',
      //   postionAddr: '西安',
      //   postionWelfare: '五险一金',
      //   postionRequire: '身体好',
      //   workTime: '8',
      //   price: '30',
      //   priceUnit: '时',
      //   billtype: '日结',
      //   positiondes: '帮助揽货,装货',
      //   insurance: '1',
      //   margin: '1',
      //   health: '1'
      // }
      insertPostionRelease()
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
