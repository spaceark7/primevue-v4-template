<script setup lang="ts">
import { ref, type StyleValue } from 'vue';

const selectedImageIndex = ref<any>(0);
const liked = ref(false);
const quantity = ref(1);
const color = ref('bluegray');
const size = ref('M');
const images = ref([
  'product-overview-3-1.png',
  'product-overview-3-2.png',
  'product-overview-3-3.png',
  'product-overview-3-4.png',
]);

const setColor = (val: string) => {
  color.value = val;
};
const setSize = (val: string) => {
  size.value = val;
};
const setSelectedImageIndex = (index: number) => {
  selectedImageIndex.value = index;
};
</script>

<template>
  <div class="card">
    <div class="grid grid-cols-12 gap-4 mb-16">
      <div class="col-span-12 lg:col-span-7">
        <div class="flex">
          <div class="flex flex-col w-2/12 justify-between gap-y-4">
            <img v-for="(image, i) in images" :alt="i.toString()" :key="i"
              :src="`/demo/images/ecommerce/productoverview/${image}`"
              class="w-full cursor-pointer border-2 border-transparent transition-colors transition-duration-150 rounded-md'"
              :class="{ 'border-primary': selectedImageIndex === i }" @click="setSelectedImageIndex(i)" />
          </div>
          <div class="pl-3 w-10/12 flex">
            <img :alt="images[selectedImageIndex]"
              :src="`/demo/images/ecommerce/productoverview/${images[selectedImageIndex]}`"
              class="w-full border-2 border-transparent rounded-md" />
          </div>
        </div>
      </div>
      <div class="col-span-12 lg:col-span-4 py-3 lg:pl-6">
        <div class="flex items-center text-xl font-medium text-900 mb-4">
          Product Title Placeholder
        </div>
        <div class="flex items-center justify-between mb-5">
          <span class="text-900 font-medium text-3xl block">$120</span>
          <div class="flex items-center">
            <span class="mr-3">
              <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
              <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
              <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
              <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
              <i class="pi pi-star text-600 mr-1"></i>
            </span>
            <span class="text-sm">
              <b class="text-900 mr-1">24</b>
              <span class="text-500"></span>reviews
            </span>
          </div>
        </div>

        <div class="font-bold text-900 mb-3">Color</div>
        <div class="flex items-center mb-5">
          <div
            class="w-8 h-8 flex-shrink-0 rounded-full bg-slate-500 mr-3 cursor-pointer border-2 border-surface-200 dark:border-surface-700 transition-all transition-duration-300"
            :style="{
              boxShadow:
    color === 'slate'
      ? '0 0 0 0.2rem var(--p-slate-500)'
      : null,
} as StyleValue
  " @click="setColor('slate')"></div>
          <div
            class="w-8 h-8 flex-shrink-0 rounded-full bg-green-500 mr-3 cursor-pointer border-2 border-surface-200 dark:border-surface-700 transition-all transition-duration-300"
            :style="{
              boxShadow:
    color === 'green' ? '0 0 0 0.2rem var(--p-green-500)' : null,
} as StyleValue
  " @click="setColor('green')"></div>
          <div
            class="w-8 h-8 flex-shrink-0 rounded-full bg-blue-500 cursor-pointer border-2 border-surface-200 dark:border-surface-700 transition-all transition-duration-300"
            :style="{
              boxShadow:
    color === 'blue' ? '0 0 0 0.2rem var(--p-blue-500)' : null,
} as StyleValue
  " @click="setColor('blue')"></div>
        </div>

        <div class="mb-3 flex items-center justify-between">
          <span class="font-bold text-900">Size</span>
          <a tabindex="0" class="cursor-pointer text-surface-600 dark:text-surface-200 text-sm flex items-center">
            Size Guide <i class="ml-1 pi pi-angle-right"></i>
          </a>
        </div>
        <div class="flex flex-wrap gap-6 items-center mb-6">
          <div
            class="h-12 grow border border-surface-300 dark:border-surface-500 text-surface-900 dark:text-surface-0 inline-flex justify-center items-center flex-shrink-0 rounded cursor-pointer hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors"
            :class="{ 'border-primary! border-2! text-primary!': size === 'XS' }" @click="setSize('XS')">
            XS
          </div>
          <div
            class="h-12 grow border border-surface-300 dark:border-surface-500 text-surface-900 dark:text-surface-0 inline-flex justify-center items-center flex-shrink-0 rounded cursor-pointer hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors"
            :class="{ 'border-primary! border-2! text-primary!': size === 'S' }" @click="setSize('S')">
            S
          </div>
          <div
            class="h-12 grow border border-surface-300 dark:border-surface-500 text-surface-900 dark:text-surface-0 inline-flex justify-center items-center flex-shrink-0 rounded cursor-pointer hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors"
            :class="{ 'border-primary! border-2! text-primary!': size === 'M' }" @click="setSize('M')">
            M
          </div>
          <div
            class="h-12 grow border border-surface-300 dark:border-surface-500 text-surface-900 dark:text-surface-0 inline-flex justify-center items-center flex-shrink-0 rounded cursor-pointer hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors"
            :class="{ 'border-primary! border-2! text-primary!': size === 'L' }" @click="setSize('L')">
            L
          </div>
          <div
            class="h-12 grow border border-surface-300 dark:border-surface-500 text-surface-900 dark:text-surface-0 inline-flex justify-center items-center flex-shrink-0 rounded cursor-pointer hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors"
            :class="{ 'border-primary! border-2! text-primary!': size === 'XL' }" @click="setSize('XL')">
            XL
          </div>
        </div>

        <div class="font-bold text-900 mb-3">Quantity</div>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <InputNumber showButtons buttonLayout="horizontal" :min="0"
            inputClass="w-12 text-center py-2 px-1 outline-0 shadow-none" v-model="quantity" class=" rounded-lg"
            decrementButtonClass="p-button-text text-600 hover:text-primary py-1 px-1"
            incrementButtonClass="p-button-text text-600 hover:text-primary py-1 px-1" incrementButtonIcon="pi pi-plus"
            decrementButtonIcon="pi pi-minus"></InputNumber>
          <div class="flex items-center flex-1 mt-4 sm:mt-0 ml-0 sm:ml-8">
            <Button label="Add to Cart" class="flex-1 mr-5"></Button>
            <i class="pi text-2xl cursor-pointer" :class="{
              'pi-heart text-600': !liked,
              'pi-heart-fill text-orange-500': liked,
}" @click="liked = !liked"></i>
          </div>
        </div>
      </div>
    </div>

    <Tabs value="0">
      <TabList>
        <Tab value="0">Details</Tab>
        <Tab value="1">Reviews</Tab>
        <Tab value="2">Shipping and Returns</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <div class="text-900 font-bold text-3xl mb-4 mt-2">Product Details</div>
          <p class="line-height-3 text-600 p-0 mx-0 mt-0 mb-4">
            Volutpat maecenas volutpat blandit aliquam etiam erat velit
            scelerisque in. Duis ultricies lacus sed turpis tincidunt id. Sed
            tempus urna et pharetra. Metus vulputate eu scelerisque felis
            imperdiet proin fermentum. Venenatis urna cursus eget nunc scelerisque
            viverra mauris in. Viverra justo nec ultrices dui sapien eget mi
            proin. Laoreet suspendisse interdum consectetur libero id faucibus.
          </p>

          <div class="grid grid-cols-12 mt-4">
            <div class="col-span-12 lg:col-span-4">
              <span class="text-900 block font-medium mb-3 font-bold">Highlights</span>
              <ul class="py-0 pl-3 m-0 text-600 mb-3">
                <li class="mb-2">Vulputate sapien nec.</li>
                <li class="mb-2">Purus gravida quis blandit.</li>
                <li class="mb-2">Nisi quis eleifend quam adipiscing.</li>
                <li>Imperdiet proin fermentum.</li>
              </ul>
            </div>
            <div class="col-span-12 lg:col-span-4">
              <span class="text-900 block mb-3 font-bold">Size and Fit</span>
              <ul class="list-none p-0 m-0 text-600 mb-4 text-600">
                <li class="mb-3">
                  <span class="font-semibold">Leo vel:</span> Egestas congue.
                </li>
                <li class="mb-3">
                  <span class="font-semibold">Sociis natoque:</span> Parturient
                  montes nascetur.
                </li>
                <li>
                  <span class="font-semibold">Suspendisse in:</span> Purus sit
                  amet volutpat.
                </li>
              </ul>
            </div>
            <div class="col-span-12 lg:col-span-4">
              <span class="text-900 block mb-3 font-bold">Material & Care</span>
              <ul class="p-0 m-0 flex flex-wrap flex-column xl:flex-row text-600">
                <li class="flex align-items-center white-space-nowrap w-10rem block mr-2 mb-3">
                  <i class="pi pi-sun mr-2 text-900"></i>
                  <span>Not dryer safe</span>
                </li>
                <li class="flex align-items-center white-space-nowrap w-10rem block mb-3">
                  <i class="pi pi-times-circle mr-2 text-900"></i>
                  <span>No chemical wash</span>
                </li>
                <li class="flex align-items-center white-space-nowrap w-10rem block mb-3 mr-2">
                  <i class="pi pi-sliders-h mr-2 text-900"></i>
                  <span>Iron medium heat</span>
                </li>
                <li class="flex align-items-center white-space-nowrap w-10rem block mb-3">
                  <i class="pi pi-minus-circle mr-2 text-900"></i>
                  <span>Dry flat</span>
                </li>
              </ul>
            </div>
          </div>
        </TabPanel>
        <TabPanel value="1">
          <div class="text-900 font-bold text-3xl mb-4 mt-2">
            Customer Reviews
          </div>
          <ul class="list-none p-0 m-0">
            <li class="pb-5 border-bottom-1 surface-border">
              <span>
                <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                <i class="pi pi-star-fill text-gray-500"></i>
              </span>
              <div class="text-900 font-bold text-xl my-3">
                Absolute Perfection!
              </div>
              <p class="mx-0 mt-0 mb-3 text-600 line-height-3">
                Blandit libero volutpat sed cras ornare arcu dui vivamus. Arcu
                dictum varius duis at consectetur lorem donec massa. Imperdiet
                proin fermentum leo vel orci porta non. Porttitor rhoncus dolor
                purus non.
              </p>
              <span class="font-medium">Darlene Robertson, 2 days ago</span>
            </li>
            <li class="py-5 border-bottom-1 surface-border">
              <span>
                <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                <i class="pi pi-star-fill text-yellow-500"></i>
              </span>
              <div class="text-900 font-bold text-xl my-3">Classy</div>
              <p class="mx-0 mt-0 mb-3 text-600 line-height-3">
                Venenatis cras sed felis eget. Proin nibh nisl condimentum id
                venenatis a condimentum.
              </p>
              <span class="font-medium">Kristin Watson, 2 days ago</span>
            </li>
          </ul>
        </TabPanel>
        <TabPanel value="2">
          <div class="text-900 font-bold text-3xl mb-4 mt-2">
            Shipping Placeholder
          </div>
          <p class="line-height-3 text-600 p-0 mx-0 mt-0 mb-4">
            Mattis aliquam faucibus purus in massa tempor nec feugiat nisl. Justo
            donec enim diam vulputate ut pharetra. Tempus egestas sed sed risus.
            Feugiat sed lectus vestibulum mattis. Tristique nulla aliquet enim
            tortor at auctor urna nunc. Habitant morbi tristique senectus et.
            Facilisi nullam vehicula ipsum.
          </p>

          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12 md:col-span-6">
              <span class="text-900 block font-bold mb-3 font-bold">Shipping Costs</span>
              <ul class="py-0 pl-3 m-0 text-600 mb-3">
                <li class="mb-2">Japan - JPY 2,500.</li>
                <li class="mb-2">Europe - EUR 10</li>
                <li class="mb-2">Switzerland - CHF 10</li>
                <li class="mb-2">Canada - CAD 25</li>
                <li class="mb-2">USA - USD 20</li>
                <li class="mb-2">Australia - AUD 30</li>
                <li class="mb-2">United Kingdom - GBP 10</li>
              </ul>
            </div>
            <div class="col-span-12 md:col-span-6">
              <span class="text-900 block font-bold mb-3">Return Policy</span>
              <p class="line-height-3 text-600 p-0 m-0">
                Pharetra et ultrices neque ornare aenean euismod elementum nisi.
                Diam phasellus vestibulum lorem sed. Mattis molestie a iaculis at.
              </p>
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>
