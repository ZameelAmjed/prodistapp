<template>
  <div class="dashboard-container">
    <el-row :gutter="10">
      <el-col :span="16">
        <el-input
          ref="code"
          v-model="code"
          placeholder="Please input"
          @input="getProduct"
        />
        <el-table :data="cart" style="width: 100%" max-height="250">
          <el-table-column label="No" :min-width="35">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="name" label="Name" :min-width="200" />
          <el-table-column prop="retail_price" label="Price" />
          <el-table-column prop="qty" label="Qty" align="center" :min-width="150">
            <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.qty"
                size="small"
                :min="1"
                :max="10"
                @change="qtyChange($event, scope.$index)"
              />
            </template>
          </el-table-column>
          <el-table-column prop="total" label="Total" />
          <el-table-column prop="id" label="" align="center">
            <template slot-scope="scope">
              <el-button
                type="danger"
                icon="el-icon-close"
                circle
                size="small"
                @click="removeItem(scope.$index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        {{ cart }}
      </el-col>
      <el-col :span="8">
        <el-card shadow="never" class="el-card-body">
          <div v-for="(item, index) in suggestion" :key="index" class="text item">
            <el-tag @click="addToCart(item)"
              ><i class="el-icon-back" />{{ item.name }}
            </el-tag>
          </div>
        </el-card>
        <Numpad :onInput="onInput" :onDelete="onDelete" :onReset="onReset"></Numpad>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import Numpad from "@/components/Numpad";
export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["suggestion", "cart"]),
  },
  mounted() {
    this.$refs.code.focus();
  },
  components: {
    Numpad,
  },
  data() {
    return {
      code: "",
      num: 1,
    };
  },
  methods: {
    getProduct() {
      if (this.code.length > 4) {
        //push new keyword
        try {
          // get user info
          store.dispatch("suggestion/setSuggestions", this.code).then(
            (response) => {
              response.forEach((element) => {
                if (Number(element.code) === Number(this.code)) {
                  // add to cart
                  this.addToCart(element);
                }
              });
            },
            (error) => {
              // none found
            }
          );
          // for each items in cart
        } catch (error) {}
      }
    },
    removeItem(index) {
      store.dispatch("suggestion/removeCartItem", index);
    },
    qtyChange(event, index) {
      store.dispatch("suggestion/changeCartQty", { index: index, value: event });
    },
    addToCart(item) {
      store.dispatch("suggestion/addCart", item);
      this.code = "";
      this.$refs.code.focus();
    },
    onInput(key) {
      this.code = (this.code + key).slice(0, this.maxLength);
      this.getProduct();
    },
    onDelete() {
      this.code = this.code.slice(0, this.code.length - 1);
    },
    onReset() {
      this.code = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.el-tag {
  width: 100%;
  margin-bottom: 2px;
}
.el-card-body > div {
  padding: 0px;
}
</style>
