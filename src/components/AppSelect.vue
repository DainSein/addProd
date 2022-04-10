<template>
  <div :id="select.id" :class="['select', classActive]" @click="toggleActive">
    <div class="select__backdrop"></div>
    <span class="select__text">
      {{ textSelect }}
      <svg>
        <use xlink:href="@/assets/sprite.svg#arrowDown"></use>
      </svg>
    </span>
    <div class="select__options">
      <button
        class="btn-reset"
        v-for="option in select.options"
        :value="option.value"
        :key="option.value"
        @click="changeSelect(option.value)"
      >
        {{ option.text }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  props: ["select"],
  emits: ["changedSelect"],
  setup(props, context) {
    const classActive = ref("");

    function changeSelect(val) {
      props.select.selected = val;
      context.emit("changedSelect");
    }

    function toggleActive() {
      classActive.value
        ? (classActive.value = "")
        : (classActive.value = "active");
    }

    const textSelect = computed(() => {
      const { selected, options } = props.select;
      const option = options.find((t) => t.value === selected);

      return option ? option.text : "по умолчанию";
    });

    return {
      textSelect,
      toggleActive,
      changeSelect,
      classActive,
    };
  },
};
</script>

<style scoped lang="scss">
.select {
  position: relative;
  margin-left: auto;
  margin-bottom: 16px;
  background: #fffefb;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid #b4b4b4;
  padding: 10px 16px;
  cursor: pointer;
  min-width: 160px;

  &.active {
    .select__options {
      opacity: 1;
      visibility: visible;
      transition: all 0.4s ease-in;
    }

    .select__backdrop {
      display: block;
    }

    > :not(.select__backdrop) {
      z-index: 101;
    }
  }

  &__backdrop {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    display: none;
  }

  &__text {
    position: relative;
    display: flex;
    align-items: center;
    color: #b4b4b4;
    font-size: 12px;
    font-weight: 400;

    svg {
      display: block;
      width: 10px;
      height: 5px;
      object-fit: cover;
      margin-left: 5px;
      margin-left: auto;
    }
  }

  &__options {
    position: absolute;
    left: 0;
    top: 100%;
    z-index: 1;
    display: flex;
    flex-direction: column;
    border-radius: 0 0 4px 4px;
    padding: 10px;
    width: 100%;
    opacity: 0;
    background-color: #fffefb;
    visibility: hidden;
    transition: all 0.4s ease-in;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

    button {
      padding: 10px;

      &:hover {
        background-color: #eee;
        border-radius: 4px;
      }

      &:not(:last-child) {
        display: block;
      }
    }
  }
}
</style>
