<template>
  <div class="config-panel  right-0 w-64 p-4 bg-surface-0 dark:bg-surface-900 origin-top ">
    <div class="flex flex-col gap-4">
      <div>
        <span class="text-sm text-muted-color font-semibold">Primary</span>
        <div class="pt-2 flex gap-2 flex-wrap justify-between">
          <button v-for="primaryColor of colors.primaryColors" :key="primaryColor.name" type="button"
            :title="primaryColor.name" @click="updateColors('primary', primaryColor)" :class="[
              'border-none w-5 h-5 rounded-full p-0 cursor-pointer  outline-offset-1',
              { 'outline-primary': layoutConfig.primary === primaryColor.name },
            ]" :style="{
              backgroundColor: `${primaryColor.name === 'noir' ? 'var(--text-color)' : primaryColor.palette['500']}`,
            }"></button>
        </div>
      </div>
      <div>
        <span class="text-sm text-muted-color font-semibold">Surface</span>
        <div class="pt-2 flex gap-2 flex-wrap justify-between">
          <button v-for="surface of colors.surfaces" :key="surface.name" type="button" :title="surface.name"
            @click="updateColors('surface', surface)" :class="[
              'border-none w-5 h-5 rounded-full p-0 cursor-pointer outline-offset-1',
              {
                'outline-primary': layoutConfig.surface
                  ? layoutConfig.surface === surface.name
                  : isDarkTheme
                    ? surface.name === 'zinc'
                    : surface.name === 'slate',
              },
            ]" :style="{ backgroundColor: `${surface.palette['500']}` }"></button>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <span class="text-sm text-muted-color font-semibold">Presets</span>
        <SelectButton v-model="preset" @change="onPresetChange" :options="presetOptions.slice(0, 3)"
          :allowEmpty="false" />
        <SelectButton v-model="preset" @change="onPresetChange" :options="presetOptions.slice(3, 4)"
          :allowEmpty="false" />
      </div>

      <div class="flex flex-col gap-2">
        <span class="text-sm text-muted-color font-semibold">Color Scheme</span>
        <SelectButton v-model="colorScheme" @change="onColorSchemeChange" :options="colorSchemeOptions"
          :allowEmpty="false" optionLabel="label" optionValue="value" />
      </div>
      <div class="flex flex-col gap-2">
        <span class="text-sm text-muted-color font-semibold">Menu Mode</span>
        <div class="flex flex-wrap flex-col gap-3">
          <div class="flex">
            <div class="flex items-center gap-2 w-1/2">
              <RadioButton v-model="menuMode" inputId="menuModeStatic" :value="'static'" @change="onMenuModeChange" />
              <label for="menuModeStatic">Static</label>
            </div>
            <div class="flex items-center gap-2 w-1/2">
              <RadioButton v-model="menuMode" inputId="menuModeOverlay" :value="'overlay'" @change="onMenuModeChange" />
              <label for="menuModeOverlay">Overlay</label>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap flex-col gap-3">
          <div class="flex">
            <div class="flex items-center gap-2 w-1/2">
              <RadioButton v-model="menuMode" inputId="menuModeSlim" :value="'slim'" @change="onMenuModeChange" />
              <label for="menuModeSlim">Slim</label>
            </div>
            <div class="flex items-center gap-2 w-1/2">
              <RadioButton v-model="menuMode" inputId="menuModeSlimPlus" :value="'slim-plus'"
                @change="onMenuModeChange" />
              <label for="menuModeSlimPlus">Slim+</label>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap flex-col gap-3">
          <div class="flex">
            <div class="flex items-center gap-2 w-1/2">
              <RadioButton v-model="menuMode" inputId="menuModeReveal" :value="'reveal'" @change="onMenuModeChange" />
              <label for="menuModeReveal">Reveal</label>
            </div>
            <div class="flex items-center gap-2 w-1/2">
              <RadioButton v-model="menuMode" inputId="menuModeDrawer" :value="'drawer'" @change="onMenuModeChange" />
              <label for="menuModeDrawer">Drawer</label>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap flex-col gap-3">
          <div class="flex">
            <div class="flex items-center gap-2 w-1/2">
              <RadioButton v-model="menuMode" inputId="menuModeHorizontal" :value="'horizontal'"
                @change="onMenuModeChange" />
              <label for="menuModeHorizontal">Horizontal</label>
            </div>

          </div>
        </div>
        <!-- <SelectButton v-model="menuMode" @change="onMenuModeChange" :options="menuModeOptions" :allowEmpty="false"
          optionLabel="label" optionValue="value" /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLayout } from '@/ui/composables/Layout'
import { ref } from 'vue'

const { layoutConfig, isDarkTheme, updatePresetChange, updateColors, colors, presets, changeMenuMode, changeColorScheme } = useLayout()

const preset = ref(layoutConfig.preset)
const colorScheme = ref(layoutConfig.colorScheme)
const presetOptions = ref(Object.keys(presets))
const colorSchemeOptions = ref([
  { label: 'Auto', value: 'auto' },
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
])

const menuMode = ref(layoutConfig.menuMode)
const menuModeOptions = ref([
  { label: 'Static', value: 'static' },
  { label: 'Overlay', value: 'overlay' },
])


function onPresetChange() {
  updatePresetChange(preset.value)
}

function onMenuModeChange() {
  changeMenuMode(menuMode.value)
}

function onColorSchemeChange() {
  changeColorScheme(colorScheme.value)
}
</script>
