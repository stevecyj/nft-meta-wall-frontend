import { createStore } from "vuex";
import user from "@/store/modules/user";
import ui from "@/store/modules/ui";

export default createStore({
  modules: { user, ui },
});