<template>
  <div class="card">
    <span class="block text-900 font-bold text-xl mb-4">Create Product</span>
    <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
      <div class="col-12 lg:col-8">
        <div class="grid formgrid">
          <div class="col-12 field">
            <InputText
              type="text"
              placeholder="Product Name"
              v-model="product.name"
            />
          </div>
          <div class="col-12 lg:col-4 field">
            <InputText
              type="text"
              placeholder="Price"
              label="Price"
              v-model="product.price"
            />
          </div>
          <div class="col-12 lg:col-4 field">
            <InputText
              type="text"
              placeholder="Product Code"
              label="Product Code"
              v-model="product.code"
            />
          </div>
          <div class="col-12 lg:col-4 field">
            <InputText
              type="text"
              placeholder="Product SKU"
              label="SKU"
              v-model="product.sku"
            />
          </div>
          <div class="col-12">
            <Editor editorStyle="height: 320px"></Editor>
          </div>
          <div class="col-12 mt-3">
            <FileUpload
              ref="fileUploaderRef"
              id="files-fileupload"
              name="demo[]"
              accept="image/*"
              customUpload
              multiple
              auto
              class="border-1 surface-border surface-card p-0 border-round"
              :maxFileSize="1000000"
              @select="onSelectedFiles"
            >
              <template v-if="uploadFiles.length > 0" #content>
                <div class="h-20rem m-1 border-round">
                  <div
                    v-for="file in uploadFiles"
                    :key="file.name"
                    class="w-full h-full relative border-round p-0"
                    :style="{ cursor: 'copy' }"
                  >
                    <div
                      class="remove-file-wrapper h-full relative border-3 border-transparent border-round hover:bg-primary transition-duration-100 cursor-auto"
                    >
                      <img
                        :src="file.objectURL"
                        alt="{file.name}"
                        class="w-full h-full border-round"
                      />
                      <Button
                        icon="pi pi-times"
                        class="remove-button p-button-rounded p-button-primary text-sm absolute justify-content-center align-items-center cursor-pointer"
                        :style="{
                          top: '-10px',
                          right: '-10px',
                          display: 'none',
                          width: '3rem',
                        }"
                        @click="onRemoveFile(file)"
                      ></Button>
                    </div>
                  </div>
                </div>
              </template>
              <template #empty>
                <div
                  v-if="uploadFiles.length < 1"
                  class="h-20rem m-1 border-round"
                >
                  <div
                    @click="onChooseUploadFiles"
                    class="flex flex-column w-full h-full justify-content-center align-items-center cursor-pointer"
                    :style="{ cursor: 'copy' }"
                  >
                    <i class="pi pi-fw pi-file text-4xl text-primary"></i>
                    <span class="block font-semibold text-900 text-lg mt-3"
                      >Drop or select a cover image</span
                    >
                  </div>
                </div>
              </template>
            </FileUpload>
          </div>
        </div>
      </div>
      <div class="flex-1 w-full lg:w-3 xl:w-4 flex flex-column row-gap-3">
        <div class="border-1 surface-border border-round">
          <span
            class="text-900 font-bold block border-bottom-1 surface-border p-3"
            >Publish</span
          >
          <div class="p-3">
            <div
              class="surface-100 py-2 px-3 flex align-items-center border-round"
            >
              <span class="text-black-alpha-90 font-bold mr-3">Status:</span>
              <span class="text-black-alpha-60 font-semibold">Draft</span>
              <Button
                type="button"
                icon="pi pi-fw pi-pencil"
                class="p-button-rounded p-button-text ml-auto"
              ></Button>
            </div>
          </div>
        </div>
        <div class="border-1 surface-border border-round">
          <span
            class="text-900 font-bold block border-bottom-1 surface-border p-3"
            >Tags</span
          >
          <div class="p-3 flex flex-wrap gap-1">
            <Chip
              v-for="(tag, i) in product.tags"
              :key="i"
              :label="tag"
              class="mr-2 py-2 px-3 text-900 font-bold surface-card border-1 surface-border"
              style="border-radius: 20px"
            >
              <span class="mr-3">{{ tag }}</span>
              <span
                class="chip-remove-icon flex align-items-center justify-content-center border-1 surface-border bg-gray-100 border-circle cursor-pointer"
                @click="onRemoveTags(tag)"
              >
                <i class="pi pi-fw pi-times text-black-alpha-60"></i> </span
            ></Chip>
          </div>
        </div>
        <div class="border-1 surface-border border-round">
          <span
            class="text-900 font-bold block border-bottom-1 surface-border p-3"
            >Category</span
          >
          <div class="p-3">
            <Dropdown
              :options="categoryOptions"
              v-model="selectedCategory"
              placeholder="Select a category"
            ></Dropdown>
          </div>
        </div>

        <div class="border-1 surface-border border-round">
          <span
            class="text-900 font-bold block border-bottom-1 surface-border p-3"
            >Colors</span
          >
          <div class="p-3 flex">
            <div
              v-for="(color, i) in colorOptions"
              :key="i"
              class="w-2rem h-2rem mr-2 border-1 surface-border border-circle cursor-pointer flex justify-content-center align-items-center"
              :class="color.background"
              @click="toggleColor(color.name)"
            >
              <i
                v-if="product.colors.includes(color.name)"
                :key="i"
                class="pi pi-check text-sm text-white z-5"
              ></i>
            </div>
          </div>
        </div>

        <div class="border-1 surface-border border-round">
          <span
            class="text-900 font-bold block border-bottom-1 surface-border p-3"
            >Stock</span
          >
          <div class="p-3">
            <Dropdown
              :options="categoryOptions"
              v-model="selectedStock"
              placeholder="Select stock"
            ></Dropdown>
          </div>
        </div>
        <div
          class="border-1 surface-border flex justify-content-between align-items-center px-3 border-round"
        >
          <span class="text-900 font-bold p-3">In stock</span>
          <InputSwitch v-model="product.inStock"></InputSwitch>
        </div>
        <div class="flex justify-content-between gap-3">
          <Button
            class="p-button-danger flex-1 p-button-outlined"
            label="Discard"
            icon="pi pi-fw pi-trash"
          ></Button>
          <Button
            class="p-button-primary flex-1"
            label="Publish"
            icon="pi pi-fw pi-check"
          ></Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const colorOptions = ref([
  { name: 'Black', background: 'bg-gray-900' },
  { name: 'Orange', background: 'bg-orange-500' },
  { name: 'Navy', background: 'bg-blue-500' },
]);
const product: any = ref({
  name: '',
  price: '',
  code: '',
  sku: '',
  status: 'Draft',
  tags: ['Nike', 'Sneaker'],
  category: 'Sneakers',
  colors: [],
  stock: 'Sneakers',
  inStock: true,
  description: '',
  images: [],
});
const selectedCategory = ref<any>(null);
const selectedStock = ref<any>(null);
const categoryOptions = ['Sneakers', 'Apparel', 'Socks'];
const fileUploaderRef = ref<any>(null);
const uploadFiles = ref<any>([]);

const onChooseUploadFiles = () => {
  fileUploaderRef.value.choose();
};
const onSelectedFiles = (event: any) => {
  uploadFiles.value = event.files;
};
const onRemoveFile = (removeFile: any) => {
  uploadFiles.value = uploadFiles.value.filter(
    (file: any) => file.name !== removeFile.name,
  );
};

const toggleColor = (color: any) => {
  const index = product.value.colors.indexOf(color);
  if (index > -1) {
    product.value.colors.splice(index, 1);
  } else {
    product.value.colors.push(color);
  }
};
const onRemoveTags = (tag: any) => {
  product.value.tags = product.value.tags.filter((t: any) => t !== tag);
};
</script>

<style scoped lang="scss">
::v-deep(#files-fileupload) {
  .p-fileupload-buttonbar {
    display: none;
  }
}

.remove-file-wrapper:hover {
  .remove-button {
    display: flex !important;
  }
}
</style>
