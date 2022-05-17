import { defineComponent } from "./vendor/vue.esm-browser.js";
import { agendaItemIcons, agendaItemDefaultTitles } from "./meetupService.js";

export default defineComponent({
  name: "MeetupAgendaItem",
  props: {
    agendaItem: {
      required: true,
      type: Object
    }
  },
  computed: {
    type() {
      return this.agendaItem.type;
    },

    startTime() {
      return this.agendaItem.startsAt;
    },
    endTime() {
      return this.agendaItem.endsAt;
    },
    title() {
      return this.agendaItem.title || agendaItemDefaultTitles[this.type];
    },
    description() {
      return this.agendaItem.description;
    },
    language() {
      return this.agendaItem.language;
    },
    speaker() {
      return this.agendaItem.speaker;
    },
    iconSrc() {
      return `/assets/icons/icon-${agendaItemIcons[this.type]}.svg` || "/assets/icons/icon-key.svg";
    },
    iconAlt() {
      return agendaItemIcons[this.type] || "key";
    }
  },
  template: `
    <div class="agenda-item">
    <div class="agenda-item__col">
      <img :src="iconSrc" class="icon" :alt="iconAlt" />
    </div>
    <div class="agenda-item__col">{{ startTime }} - {{ endTime }}</div>
    <div class="agenda-item__col">
      <h3 class="agenda-item__title">{{ title }}</h3>
      <p v-if="type === 'talk'" class="agenda-item__talk">
        <span>{{ speaker}}</span>
        <span class="agenda-item__dot"></span>
        <span class="agenda-item__lang">{{language}}</span>
      </p>
      <p v-if="description">{{description}}</p>
    </div>
    </div>`
});
