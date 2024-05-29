import ButtonXMin from "./common/button/ButtonXMin.vue";

import Input from "./common/form/Input.vue";
import InputValidation from "./common/form/InputValidation.vue";
import Form from "./common/form/Form.vue";
import Button from "./common/button/Button.vue";

function registerComponents(app) {
  app.component("g-button-x-min", ButtonXMin);
  app.component("g-input", Input);
  app.component("g-input-val", InputValidation);
  app.component("g-form", Form);
  app.component("g-button", Button);
}
export { registerComponents };
