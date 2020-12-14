<template>
  <div>
    <div class="combobox">
      <label class="label">{{label}}</label>
      <ul class="combobox-input">
        <li v-for="(value,index) in settingValues" :key="index">
          <span class="combobox-tag">
            <span>{{ value }}</span>
            <font-awesome-icon class="icon" :icon="['fas','times']" @click="deleteValue(index)" />
          </span>
        </li>
        <li>
          <input
            v-model="comboboxValue"
            type="text"
            list="Noodles"
            autocomplete="on"
            @blur="setValue"
            @keyup.enter="setValue"
            @keyup.space="setValue"
          >
        </li>
      </ul>
      <datalist id="Noodles">
        <option value="ラーメン" />
        <option value="日本そば" />
        <option value="つけ麺" />
        <option value="油そば" />
        <option value="焼きそば" />
      </datalist>
    </div>
  </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop, PropSync, Provide} from 'nuxt-property-decorator'

    @Component
    export default class Combobox extends Vue {
        @Provide() private comboboxValue: string | null = null

        @Prop()
        public label!: string

        @PropSync('values')
        settingValues: string[]

        setValue (): void {
            if (this.comboboxValue) {
                this.settingValues.push(this.comboboxValue)
                this.comboboxValue = null
            }
        }

        deleteValue (index:number):void{
            this.settingValues.splice(index, 1)
        }
    }
</script>

<style scoped lang="scss">
  .combobox{
    display: flex;
    align-items: center;
    margin-bottom: $size-l;
    .label {
      margin-right: $size-m;
      min-width: 120px;
      text-align: left;
    }
  }
  .combobox-input {
    border: 1px solid #cccccc;
    padding: $size-xs $size-s;
    border-radius: 4px;
    text-align: left;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-width: 400px;

    li:last-child{
      flex: 1 0 auto;
    }

    input {
      border: none;
      width: 100%;
      padding: 0;

      &::-webkit-calendar-picker-indicator {
        display: none;
      }

      &:focus {
        outline: none
      }
    }
  }

  .combobox-tag {
    background: $color-black;
    padding: $size-xs $size-s;
    border-radius: $size-xs;
    color: #FFF;
    margin-right: $size-s;

    span {
      margin-right: $size-s;
    }

    .icon{
      cursor: pointer;
    }
  }
</style>
