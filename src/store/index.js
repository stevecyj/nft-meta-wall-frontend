import { createStore } from "vuex";
import user from "@/store/modules/user";
import ui from "@/store/modules/ui";
import post from "@/store/modules/post";

export default createStore({
  modules: { user, ui, post },
});