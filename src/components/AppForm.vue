<template>
  <form action="" @submit.prevent="submit($event)" class="form">
    <h1 class="form__title">Добавление товаров</h1>

    <div class="form__wrap">
      <div class="form__success">Товар успешно добавлен</div>
      <label class="form__label required">
        <span class="form__label-name">Наименование товара</span>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Введите наименование товара"
          v-model="name"
          :class="['input', { 'input--error': classError.name }]"
          @blur="changeStateValidate('name', name)"
          autocomplete="off"
        />
        <span v-if="classError.name" class="text--error"
          >Поле является обязательным</span
        >
      </label>

      <label class="form__label">
        <span class="form__label-name">Описание товара</span>
        <textarea
          id="description"
          name="description"
          placeholder="Введите описание товара"
          v-model="description"
          class="textarea"
        ></textarea>
      </label>

      <label class="form__label required">
        <span class="form__label-name">Ссылка на изображение товара</span>
        <input
          type="text"
          id="linkImg"
          name="linkImg"
          placeholder="Введите ссылку"
          v-model="linkImg"
          :class="['input', { 'input--error': classError.linkImg }]"
          @blur="changeStateValidate('linkImg', linkImg)"
          autocomplete="off"
        />
        <span v-if="classError.linkImg" class="text--error"
          >Поле является обязательным</span
        >
      </label>

      <label class="form__label required">
        <span class="form__label-name">Цена</span>
        <input
          type="text"
          id="price"
          name="price"
          placeholder="Введите цену"
          v-model="price"
          :class="['input', { 'input--error': classError.price }]"
          @blur="changeStateValidate('price', price)"
          autocomplete="off"
        />
        <span v-if="classError.price" class="text--error"
          >Поле является обязательным</span
        >
      </label>

      <button class="btn-reset btn" :disabled="!isValid">Добавить товар</button>
    </div>
  </form>
</template>

<script>
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const name = ref("");
    const description = ref("");
    const linkImg = ref("");
    const price = ref("");
    const classError = ref({
      name: false,
      linkImg: false,
      price: false,
    });

    function submit(e) {
      const target = e.currentTarget;

      const prod = {
        id: Date.now().toString(),
        name: name.value,
        description: description.value,
        linkImg: linkImg.value,
        price: price.value,
      };

      target.reset();

      target.classList.add("active");
      setTimeout(() => target.classList.remove("active"), 3000);

      store.dispatch("createProd", prod);
    }

    function changeStateValidate(key, str) {
      classError.value[key] = isEmpty(str);
    }

    const isValid = computed(() => {
      return name.value !== "" && linkImg.value !== "" && price.value !== "";
    });

    const isEmpty = (str) => str === "";

    watch(price, (newV, oldV) => {
      const res = newV.replace(/\s/g, "");

      if (isNaN(+res)) {
        price.value = oldV;
        return;
      }

      price.value = res.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$& ");
    });

    return {
      name,
      description,
      linkImg,
      price,
      submit,
      isValid,
      isEmpty,
      classError,
      changeStateValidate,
    };
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

@mixin placeholder {
  &::-webkit-input-placeholder {
    @content;
  }
  &:-moz-placeholder {
    @content;
  }
  &::-moz-placeholder {
    @content;
  }
  &:-ms-input-placeholder {
    @content;
  }
  &::-ms-input-placeholder {
    @content;
  }
  &::placeholder {
    @content;
  }
}

.form {
  width: 100%;
  background-color: #fff;

  &.active {
    .form__success {
      z-index: 1;
      opacity: 1;
      visibility: visible;
      transition: all 0.3s ease-in;
    }
  }

  &__title {
    margin-bottom: 16px;
    font-weight: 600;
    font-size: 28px;
    line-height: 35px;
  }

  &__success {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    background-color: #fffefb;
    visibility: hidden;
  }

  &__wrap {
    position: relative;
    z-index: 1;
    width: 100%;
    background: #fffefb;
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04),
      0px 6px 10px rgba(0, 0, 0, 0.02);
    border-radius: 4px;
    padding: 24px;
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;
    color: #3f3f3f;
    transition: all 0.3s ease-in;
  }

  &__label {
    position: relative;
    display: flex;
    flex-direction: column;

    &.required {
      .form__label-name {
        &::before {
          content: "";
          position: absolute;
          left: 100%;
          top: 0;
          width: 4px;
          height: 4px;
          background-color: #ff8484;
          border-radius: 100%;
        }
      }
    }

    &-name {
      position: relative;
      align-self: flex-start;
      display: inline-block;
      margin-bottom: 4px;
      font-weight: 400;
      font-size: 10px;
      line-height: 13px;
      letter-spacing: -0.02em;
    }

    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }

  &__mark {
    position: absolute;
    right: 0;
    top: 0;
    display: block;
    border-radius: 100%;
    width: 4px;
    height: 4px;
    background-color: #ff8484;
  }
}

.input,
.textarea {
  width: 100%;
  padding: 10px 16px;
  background: #fffefb;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: none;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #3f3f3f;

  @include placeholder {
    color: #b4b4b4;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
  }
}

.input {
  &--error {
    border: 1px solid #ff8484;
  }
}

.text--error {
  position: absolute;
  left: 0;
  bottom: -13px;
  font-weight: 400;
  font-size: 8px;
  line-height: 10px;
  letter-spacing: -0.02em;
  color: #ff8484;
}

.textarea {
  resize: none;
  height: 108px;
}

.btn {
  border-radius: 10px;
  border: none;
  width: 100%;
  padding: 10px 0;
  background-color: rgb(103, 214, 131);
  color: #fff;
  transition: all 0.4s ease-in-out;

  &:hover:not(:disabled) {
    opacity: 0.7;
    transition: all 0.4s ease-in-out;
    cursor: pointer;
  }

  &:disabled {
    color: #b4b4b4;
    background-color: #eee;
    cursor: initial;
  }
}
</style>
