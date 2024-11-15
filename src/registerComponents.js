import ButtonXMin from "./common/button/ButtonXMin.vue";

import Input from "./common/form/input/Input.vue";
import InputCheck from "./common/form/input/InputCheck.vue";

import InputValidation from "./common/form/input/InputValidation.vue";

import InputImage from "./common/form/file/InputImage.vue";
import InputImageValidation from "./common/form/file/InputImageValidation.vue";

import InputFile from "./common/form/file/InputFile.vue";
import InputFileValidation from "./common/form/file/InputFileValidation.vue";

import Select from "./common/form/select/Select.vue";
import SelectConsultValidation from "./common/form/select/SelectConsultValidation.vue";
import SelectMultipleConsultValidation from "./common/form/select/SelectMultipleConsultValidation.vue";

import SelectValidation from "./common/form/select/SelectValidation.vue";
import Form from "./common/form/Form.vue";
import Button from "./common/button/Button.vue";
import ButtonSelect from "./common/button/ButtonSelect.vue";

import Collapse from "./common/Collapse.vue";

import Title1 from "./common/section/Title1.vue";

import Section1 from "./common/section/Section1.vue";
import Section2 from "./common/section/Section2.vue";
import Section3 from "./common/section/Section3.vue";
import Section4 from "./common/section/Section4.vue";

import Image from "./common/Image.vue";

function registerComponents(app) {
  app.component("g-button-x-min", ButtonXMin);
  app.component("g-input", Input);
  app.component("g-input-check", InputCheck);
  app.component("g-input-val", InputValidation);

  app.component("g-input-image", InputImage);
  app.component("g-input-image-val", InputImageValidation);

  app.component("g-input-file", InputFile);
  app.component("g-input-file-val", InputFileValidation);

  app.component("g-select", Select);
  app.component("g-select-val", SelectValidation);
  app.component("g-select-consult-val", SelectConsultValidation);
  app.component(
    "g-select-multiple-consult-val",
    SelectMultipleConsultValidation
  );

  app.component("g-form", Form);
  app.component("g-button", Button);
  app.component("g-collapse", Collapse);
  app.component("g-section-1", Section1);
  app.component("g-title-1", Title1);

  app.component("g-section-2", Section2);
  app.component("g-section-3", Section3);
  app.component("g-section-4", Section4);

  app.component("g-image", Image);

  app.component("g-button-select", ButtonSelect);
}
export { registerComponents };
