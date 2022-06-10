<template>
  <div>
    <div class="block-title">
      張貼動態
    </div>
    <div class="draft-post">
      <div class="draft-post__post">
        <p class="draft-post__post__label">貼文內容</p>
        <div class="draft-post__textarea">
          <textarea
            v-model="content"
            type="text"
            name="nickname"
            placeholder="輸入您的貼文內容稱"
          ></textarea>
        </div>
      </div>
      <div style="margin-top: 16px;">
        <label
          for="upload"
          class="text-btn black"
        >上傳圖片</label>
        <input
          id="upload"
          style="visibility:hidden;"
          type="file"
          accept="image/png, image/gif, image/jpeg"
          @change="showFile"
        >
      </div>
      <img
        v-if="preViewImage"
        class="draft-post__img"
        style="margin-top: 16px;"
        :src="preViewImage"
      />
      <div
        v-else
        class="draft-post__img"
      />

      <!-- 錯誤訊息 -->
      <p
        v-if="errorImageMessageVised"
        class="error-message"
      >
        {{ errorImageMessage }}
      </p>
      <p
        v-if="errorContentMessageVised"
        class="error-message"
      >
        {{ errorContentMessage }}
      </p>
      <div style="max-width: 323px; margin: 0 auto;">
        <button
          style="margin-top: 32px;"
          class="btn secondary"
          @click="submitPost"
        >
          送出貼文
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, watch, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { uploadImage } from '@/api/image.js';
import { createPost } from '@/api/post';
import router from '../router';
import { imageTypeRule } from '@/utils/validation';
import { io } from 'socket.io-client';
import { getLocalStorageToken } from '@/utils/auth';

export default defineComponent({
  name: 'PublishPost',
  components: {},
  setup() {
    const store = useStore();

    // get follower id list
    const followerIdList = ref([]);
    const storeFollowerList = computed(() => {
      const data = store.getters['user/followerList'];
      data.forEach((item) => {
        console.log(item.id._id);
        followerIdList.value.push(item.id._id);
      });
      return data;
    });

    // socket
    const host = import.meta.env.VITE_BASE_API;
    const token = getLocalStorageToken();
    const socket = io(host, {
      path: '/socket.io/connect',
      transports: ['websocket'],
      autoConnect: true, //启动自从自动连接
      secure: true,
      transports: ['websocket'], // ['websocket', 'polling']
      reconnection: true, //启动重新连接
      reconnectionAttempts: 5, //最大重试连接次数
      reconnectionDelay: 2000, //最初尝试新的重新连接等待时间
      reconnectionDelayMax: 10000,
      query: {
        Authorization: `Bearer ${token}`,
      },
    });
    // 送貼文
    const sendUpdateNotification = async () => {
      socket.emit('updatePost');
    };

    const errorMessageEnum = {
      noContent: '沒有貼文內容，請填寫',
      imageSizeError: '圖片檔案過大，僅限 1mb 以下檔案',
      imageTypeError: '圖片格式錯誤，僅限 JPG、PNG 圖片',
    };
    let file = reactive({}); // 準備拿 input type="file" 的值
    let fs = reactive({
      name: '', // input 的圖檔名稱
      thumbnail: null, // input 的圖片縮圖
      size: null, // input 的圖片大小
      unit: 'KB',
    });
    let title = ref(''); // 圖片標題
    let content = ref(''); // 貼文描述
    let preViewImage = ref(null); // 圖片預覽
    let errorImageMessageVised = ref(false);
    let errorImageMessage = ref('');
    let errorContentMessageVised = ref(false);
    let errorContentMessage = ref('');

    const showFile = (e) => {
      file = e.target.files[0]; // input type="file" 的值
      fs.name = file.name; // input 的圖檔名稱
      fs.thumbnail = window.URL.createObjectURL(file); // input 的圖片縮圖
      fs.size = ~~(file.size * 0.001); // input 的圖片大小
      title.value = fs.name; // 預設 input 的圖檔名稱為圖片上傳時的圖片標題
      preViewImage.value = URL.createObjectURL(file);

      if (fs.size > 1000) {
        errorImageMessageVised.value = true;
        errorImageMessage.value = errorMessageEnum.imageSizeError;
      } else if (!imageTypeRule(fs.name)) {
        errorImageMessageVised.value = true;
        errorImageMessage.value = errorMessageEnum.imageTypeError;
      } else {
        errorImageMessageVised.value = false;
      }
    };

    let submitImage = async () => {
      try {
        const form = {
          file,
          title: title.value,
          description: content.value,
        };

        const uploadResult = await uploadImage(form);
        console.log(uploadResult);
        return uploadResult?.data?.data?.link;
      } catch (error) {
        console.log(error);
      }
    };

    const submitPost = async () => {
      try {
        // loading 動畫載入
        store.dispatch('ui/toggleLoading', true);
        errorContentMessageVised.value = false;

        if (content.value === '') {
          errorContentMessageVised.value = true;
          errorContentMessage.value = errorMessageEnum.noContent;
          return false;
        }

        if (errorImageMessageVised.value) {
          return false;
        }

        let image = '';
        file?.size && (image = await submitImage());

        const userId = store.getters['user/userInfo']?.id; // login後要有值，目前使用預設
        const { status, data } = await store.dispatch('post/addPost', {
          userId,
          tags: 'test',
          type: 'person',
          content: content.value,
          image,
        });
        // 成功轉到動態牆
        status === 'success' && sendUpdateNotification();
        status === 'success' && router.push({ path: '/home' });
      } catch (error) {
        console.log('create post error', error);
        // router.push({ path: '/home' });
      } finally {
        store.dispatch('ui/toggleLoading', false);
      }
    };

    // 檢查 content 值
    watch(content, (val) => {
      if (val === '') {
        errorContentMessageVised.value = true;
        errorContentMessage.value = errorMessageEnum.noContent;
      } else {
        errorContentMessageVised.value = false;
      }
      // console.log(content.value);
    });
    // 一開始 show content error
    onMounted(() => {
      errorContentMessageVised.value = true;
      errorContentMessage.value = errorMessageEnum.noContent;
    });
    onUnmounted(() => {
      socket.close();
    });

    return {
      errorImageMessageVised,
      errorImageMessage,
      errorContentMessageVised,
      errorContentMessage,
      content,
      preViewImage,
      followerIdList,
      storeFollowerList,
      showFile,
      submitPost,
      submitImage,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
