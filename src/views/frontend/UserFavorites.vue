<template lang="pug">
//- show if empty
.container-lg.d-flex.flex-column.align-items-center.my-5(v-if="!favorites.length")
  img.favor-img.w-25(
    src="@/assets/images/ufo-svgrepo-com.svg"
    alt="Nothing here!")
  h3.fs-4.text-gray-600.mt-3 還沒有收藏，先去逛逛吧！

.container-lg.d-flex.flex-column.align-items-center.my-5(v-if="!!favorites.length")

  .d-flex
    h3.fs-4.text-gray-600 收藏清單

    //- delete button
    button.btn.btn-sm.hover-red.px-2.mb-2.ms-2(
    type="button" title="清空收藏清單"
    @click="openModal('alertModal')")
      i.bi.bi-trash-fill

  .divider.w-50.border-gray-500.mb-3

  button.fs-5.btn.mb-4.text-cyan(
    type="button"
    title="領取優惠碼"
    v-if="favorites.length >= 6"
    @click="openModal('promotionModal')")
    | 🎊 恭喜！#[br]
    | 完成收集活動，點此領取優惠！

  h5.text-gray-500.mb-3(v-else)
    | 增加收藏以獲取優惠！

  .row.d-flex.justify-content-center.w-100

    .col-md-11
      .row.gy-4.d-flex.justify-content-center

        .col-md-4.col-sm-6(v-for="item of favorites" :key="item.id")
          UserProductCard(:tempPick="item")
          button.btn(type="button" title="移除收藏"
            @click="removeFavor(item.id)")
            small X 移除收藏

UserAlertModal(
  ref="alertModal"
  @emit-clear="clearFavors")

UserPromotionModal(
  ref="promotionModal")

</template>

<script>
import UserProductCard from '@/components/frontend/UserProductCard.vue';
import UserAlertModal from '@/components/frontend/UserAlertModal.vue';
import UserPromotionModal from '@/components/frontend/UserPromotionModal.vue';

export default {
  metaInfo: {
    title: '收藏清單',
  },
  data() {
    return {
      products: [],
      favorites: [],
      key: 'space-coffee-favorites',
    };
  },
  components: {
    UserProductCard,
    UserPromotionModal,
    UserAlertModal,
  },
  methods: {
    async getProducts() {
      this.isLoading = true;
      const api = `
        ${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all
      `;
      let fetchData;

      try {
        const http = await fetch(api);
        fetchData = await http.json();
      } catch (error) {
        console.error(error);
      }

      this.isLoading = false;
      return fetchData.products;
    },

    collectFavorites() {
      let favorites = localStorage.getItem(this.key);

      if (favorites) {
        favorites = JSON.parse(favorites);

        this.products.forEach((product) => {
          favorites.forEach((favor) => {
            if (product.id === favor.id) {
              this.favorites.push(product);
            }
          });
        });
      }
    },

    openModal(modal) {
      this.$refs[modal].showModal();
    },

    clearFavors() {
      localStorage.setItem(this.key, '');
      this.favorites = [];
      this.$refs.alertModal.hideModal();
    },

    removeFavor(id) {
      const favorites = JSON.parse(localStorage.getItem(this.key));
      const newFavorites = favorites.filter((item) => item.id !== id);

      localStorage.setItem(this.key, JSON.stringify(newFavorites));

      this.favorites = [];
      this.collectFavorites();
    },
  },
  async created() {
    try {
      this.products = await this.getProducts();
      this.collectFavorites();
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style lang="scss" scoped>
.favor-img {
  animation: swing 5s ease-in infinite;
}
@keyframes swing {
  0% {
    transform: translateX(0);
  }
  40% {
    transform: translateX(100px) rotate(30deg);
  }
  80% {
    transform: translateX(-100px) rotate(-20deg);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
