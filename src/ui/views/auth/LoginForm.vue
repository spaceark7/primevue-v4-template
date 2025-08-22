<template>
  <div>
    <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
    <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-[30rem] mb-8" v-model="email" />

    <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
    <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="mb-4" fluid
      :feedback="false"></Password>

    <div class="flex items-center justify-between mt-2 mb-8 gap-8">
      <div class="flex items-center">
        <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
        <label for="rememberme1">Remember me</label>
      </div>
      <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Forgot
        password?</span>
    </div>
    <Button label="Sign In" class="w-full" @click="() => handleLogin()" :loading="login.isPending.value"></Button>
  </div>
</template>

<script setup lang="ts">
import useAuthApi from '@/ui/composables/apis/AuthApi';
import { Button } from 'primevue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const { login } = useAuthApi()
const router = useRouter();

const email = ref('');
const password = ref('');
const checked = ref(false);


const handleLogin = async () => {
  console.log('login initiated');
  // Handle the result of the login
  // await login.mutateAsync({ email: email.value, password: password.value });
  // if (login.isSuccess) {
  //   // Handle successful login
  //   console.log('handleLogin:success', login.data.value);
  //   router.push('/app');
  // } else {
  //   // Handle login error
  //   console.error('handleLogin:error', login.error);
  // }
};

</script>

<style scoped>

</style>
