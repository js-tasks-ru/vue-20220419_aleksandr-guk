import { defineComponent } from "./vendor/vue.esm-browser.js";
import UiContainer from "./UiContainer.js";
import UiAlert from "./UiAlert.js";
import { fetchMeetupById } from "./meetupService.js";
import MeetupView from "../06-MeetupView/MeetupView";

export default defineComponent({
  name: 'PageMeetup',
  props: {
    meetupId: {
      required: true,
      type: Number
    }
  },

  data() {
    return {
      meetup: null,
      error: null
    }
  },

  components: {
    UiAlert,
    UiContainer,
    MeetupView
  },

  created() {
    this.updateMeetup();
  },

  watch: {
    meetupId() {
     this.updateMeetup();
    }
  },

  methods: {
    updateMeetup() {
      this.meetup = null;
      fetchMeetupById(this.meetupId).then(r => {
        this.meetup = r;
        this.error = null;
      }).catch(e => {
        this.error = e.message;
        this.meetup = null
      });
    }
  },

  template: `
    <div class="page-meetup">
      <!-- meetup view -->
    <meetup-view v-if="meetup" :meetup="meetup" ></meetup-view>
      <ui-container v-else-if="!error">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-if="error">
        <ui-alert>{{error}}</ui-alert>
      </ui-container>
    </div>`,
});
