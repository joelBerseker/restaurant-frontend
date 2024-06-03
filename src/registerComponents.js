import ButtonXMin from "./common/button/ButtonXMin.vue";

import Input from "./common/form/Input.vue";
import InputValidation from "./common/form/InputValidation.vue";
import Select from "./common/form/Select.vue";
import SelectValidation from "./common/form/SelectValidation.vue";
import Form from "./common/form/Form.vue";
import Button from "./common/button/Button.vue";
import Collapse from "./common/Collapse.vue";

import Section1 from "./common/section/Section1.vue";

function registerComponents(app) {
  app.component("g-button-x-min", ButtonXMin);
  app.component("g-input", Input);
  app.component("g-input-val", InputValidation);
  app.component("g-select", Select);
  app.component("g-select-val", SelectValidation);
  app.component("g-form", Form);
  app.component("g-button", Button);
  app.component("g-collapse", Collapse);
  app.component("g-section-1", Section1);
}
export { registerComponents };
