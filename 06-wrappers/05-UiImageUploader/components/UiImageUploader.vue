<template>
  <div class="image-uploader">
    <label @click="remove" class="image-uploader__preview" :class="{'image-uploader__preview-loading': isLoading}"
           :style="bgUrl">
      <span class="image-uploader__text">{{ text }}</span>
      <input ref="input" v-bind="$attrs" @change="upload" type="file" accept="image/*" class="image-uploader__input"/>
    </label>
  </div>
</template>

<script>
const texts = {
  loading: 'Загрузка...',
  empty: 'Загрузить изображение',
  loaded: 'Удалить изображение'
}
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,
  props: {
    preview: String,
    uploader: Function
  },
  data() {
    return {
      localPreview: null,
      isLoading: false,
      text: texts[this.getState()]
    }
  },
  computed: {
    bgUrl() {
      if ( this.localPreview ) {
        return `--bg-url: url('${this.localPreview}')`
      }
      return this.preview ? `--bg-url: url('${this.preview}')` : '--bg-url: var(--default-cover);';
    }
  },
  methods: {
    remove($event) {
      if ( this.getState() === 'loaded' ) {
        $event.preventDefault();
        this.setEmptyState();
      }
    },

    async upload($event) {
      try {
        const input = $event.target;
        const file = input.files[0];
        const image = URL.createObjectURL(file);
        this.setLoadingState(image, file);
        if ( !this.uploader ) {
          this.setLoadedState('loaded', this.localPreview);
          return;
        }
        const response = await this.uploader(file);
        this.$emit('upload', response);
        this.setLoadedState(response.image);

      } catch (e) {
        this.setEmptyState(e);
      }
    },

    setEmptyState(error) {
      const input = this.$refs.input;
      input.value = '';
      this.isLoading = false;
      this.localPreview = null;
      this.$emit('remove');
      this.text = texts['empty'];
      if ( error ) {
        this.$emit('error', error);
      }
    },
    setLoadingState(image, file) {
      this.isLoading = true;
      this.localPreview = image;
      this.text = texts['loading'];
      this.$emit('select', file);
    },
    setLoadedState(image) {
      this.isLoading = false;
      this.text = texts['loaded']
      this.localPreview = image;
    },

    getState() {
      if ( this.isLoading ) {
        return 'loading';
      }
      if ( this.preview || this.localPreview ) {
        return 'loaded';
      }
      if ( !this.preview ) {
        return 'empty';
      }
    }
  }
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
