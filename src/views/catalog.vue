<template>
  <section class="catalog">
    <div class="container catalog__container">
      <aside>
        <AppForm />
      </aside>
      <div class="catalog__prods-not-found" v-if="prods.length === 0">
        Пока товаров нет
      </div>
      <template v-else>
        <div class="catalog__right">
          <AppSelect :select="sortSelect" @changedSelect="changedSelect" />
          <div class="catalog__prods">
            <div class="catalog__prod" v-for="prod in prods" :key="prod.id">
              <button
                class="btn-reset catalog__prod-cart"
                @click="deleteProd(prod.id)"
              >
                <svg>
                  <use xlink:href="@/assets/sprite.svg#cart"></use>
                </svg>
              </button>
              <div class="catalog__prod-img">
                <img :src="prod.linkImg" />
              </div>
              <div class="catalog__prod-text">
                <h2 class="catalog__prod-title">{{ prod.name }}</h2>
                <p class="catalog__prod-desc">{{ prod.description }}</p>
                <span class="catalog__prod-price">{{ prod.price }} руб.</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import { ref, computed, reactive } from "vue";
import { useStore } from "vuex";
import AppForm from "../components/AppForm";
import AppSelect from "../components/AppSelect";

export default {
  setup() {
    let prevSelected = "";
    const store = useStore();
    const sortSelect = reactive({
      id: "sortSelect",
      class: "sort-select",
      selected: "",
      options: [
        { text: "возрастание цены", value: "priceUp" },
        { text: "убывание цены", value: "priceLow" },
        { text: "наименование", value: "name" },
      ],
    });

    function deleteProd(id) {
      store.dispatch("deleteProd", id);
    }

    function changedSelect() {
      const { selected: filter } = sortSelect;

      if (prevSelected === filter) {
        return;
      }

      store.dispatch("setSort", filter);
      prevSelected = filter;
    }

    const prods = computed(() => store.getters.prods);

    return {
      prods,
      sortSelect,
      deleteProd,
      changedSelect,
    };
  },
  components: {
    AppForm,
    AppSelect,
  },
};
</script>

<style scoped lang="scss">
@mixin xl {
  @media (max-width: (1200px)) {
    @content;
  }
}

@mixin lg {
  @media (max-width: (992px)) {
    @content;
  }
}

@mixin md {
  @media (max-width: (768px)) {
    @content;
  }
}

@mixin sm {
  @media (max-width: (610px)) {
    @content;
  }
}

@mixin xs {
  @media (max-width: (440px)) {
    @content;
  }
}

.catalog {
  padding: 32px 0;
  min-height: 100vh;

  &__container {
    position: relative;
    display: flex;

    @include md {
      flex-direction: column;
    }
  }

  &__prods {
    display: flex;
    flex-wrap: wrap;
    align-self: baseline;
    width: 100%;

    @include xs {
      justify-content: center;
    }

    &-not-found {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      font-weight: 600;
      font-size: 28px;
      line-height: 35px;
      color: #3f3f3f;
    }
  }

  &__right {
    display: flex;
    flex-direction: column;
    width: 100%;

    @include lg {
      flex-basis: 60%;
    }

    @include md {
      flex-basis: 100%;
    }
  }

  &__prod {
    position: relative;
    display: flex;
    flex-direction: column;
    width: calc((100% - 32px) / 3);
    background: #fffefb;
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04),
      0px 6px 10px rgba(0, 0, 0, 0.02);
    border-radius: 4px 4px 0 0;

    @include lg {
      width: calc((100% - 16px) / 2);
    }

    @include xs {
      margin: 0 auto;
      width: 100%;
      max-width: 320px;
    }

    &-price {
      margin-top: auto;
      font-size: 24px;
      font-weight: 600;
    }

    &-text {
      display: flex;
      flex-direction: column;
      padding: 16px 16px 24px;
      height: 100%;
      color: #3f3f3f;
    }

    &-title {
      margin-bottom: 16px;
      font-size: 20px;
      font-weight: 600;
    }

    &-desc {
      margin-bottom: 32px;
    }

    &-cart {
      right: 0;
      position: absolute;
      top: 0;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ff8484;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      transform: translate(50%, -50%);
      width: 32px;
      height: 32px;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease-in-out;
      cursor: pointer;

      svg {
        display: block;
        width: 16px;
        height: 16px;
        object-fit: cover;
      }
    }

    &-img {
      position: relative;
      padding-top: 60%;

      img {
        position: absolute;
        top: 0;
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px 4px 0 0;
      }
    }

    &:hover {
      .catalog__prod-cart {
        opacity: 1;
        visibility: visible;
        transition: all 0.4s ease-in-out;
      }
    }

    &:not(:nth-child(3n)) {
      margin-right: 16px;

      @include lg {
        margin: 0;
      }
    }

    &:not(:nth-child(n + 1):nth-child(-n + 3)) {
      margin-top: 16px;

      @include lg {
        margin: 0;
      }
    }

    &:not(:nth-child(2n)) {
      @include lg {
        margin-right: 16px;
      }

      @include xs {
        margin: 0;
      }
    }

    &:not(:nth-child(n + 1):nth-child(-n + 2)) {
      @include lg {
        margin-top: 16px;
      }

      @include xs {
        margin: 0;
      }
    }

    &:not(:last-child:nth-last-child(1)) {
      @include xs {
        margin-bottom: 16px;
      }
    }
  }
}

aside {
  position: sticky;
  left: 0;
  top: 0;
  flex-shrink: 0;
  align-self: flex-start;
  margin-right: 16px;
  width: 100%;
  max-width: 332px;

  @include lg {
    flex-shrink: 1;
    flex-basis: 40%;
    min-width: 280px;
  }

  @include md {
    flex-basis: auto;
    margin: 0 auto;
    margin-bottom: 40px;
    max-width: 500px;
  }
}
</style>
