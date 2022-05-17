import { defineComponent } from './vendor/vue.esm-browser.js';
import UiAlert from './UiAlert.js';
import UiContainer from './UiContainer.js';
import MeetupDescription from "../02-MeetupDescription/MeetupDescription";
import MeetupCover from "../03-MeetupCover/MeetupCover";
import MeetupInfo from "../04-MeetupInfo/MeetupInfo";
import MeetupAgenda from "../05-MeetupAgenda/MeetupAgenda";

export default defineComponent({
  name: 'MeetupView',

  components: {
    UiAlert,
    UiContainer,
    MeetupDescription,
    MeetupCover,
    MeetupInfo,
    MeetupAgenda
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  template: `
    <div>
      <!-- meetup cover-->
      <meetup-cover :title="meetup.title" :image="meetup.image" ></meetup-cover>

      <ui-container>
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <!-- meetup description -->
            <meetup-description :description="meetup.description"></meetup-description>

            <h3>Программа</h3>
            <!-- meetup agenda -->
            <meetup-agenda v-if="meetup.agenda && meetup.agenda.length > 0" :agenda="meetup.agenda" ></meetup-agenda>
            <ui-alert v-else="meetup.agenda">Программа пока пуста...</ui-alert>
          </div>
          <div class="meetup__aside">
            <!-- meetup info -->
            <meetup-info :date="meetup.date" :organizer="meetup.organizer" :place="meetup.place"> </meetup-info>
          </div>
        </div>
      </ui-container>
    </div>`,
});
