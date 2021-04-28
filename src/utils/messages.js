
const typeTemplate = "${name} không đúng định dạng ${type}";
const typeTemplateLabel = "${label} không đúng định dạng ${type}";

export const defaultValidateMessages = {
  default: "Validation error on field ${label}",
  required: "${label} không được để trống",
  enum: "${label} must be one of [${label}]",
  whitespace: "${label} cannot be empty",
  date: {
    format: "${label} is invalid for format date",
    parse: "${label} could not be parsed as date",
    invalid: "${label} is invalid date",
  },
  types: {
    string: typeTemplateLabel,
    method: typeTemplateLabel,
    array: typeTemplateLabel,
    object: typeTemplateLabel,
    number: "${label} không đúng định dạng số",
    date: typeTemplateLabel,
    boolean: typeTemplateLabel,
    integer: typeTemplateLabel,
    float: typeTemplateLabel,
    regexp: typeTemplateLabel,
    email: typeTemplateLabel,
    url: typeTemplateLabel,
    hex: typeTemplateLabel,
  },
  string: {
    len: "${label} có đúng ${len} ký tự",
    min: "${label} tối thiểu ${min} ký tự",
    max: "${label} tối đa ${max} ký tự",
    range: "${label} từ ${min} đến ${max} ký tự",
  },
  number: {
    len: "${label} must equal ${len}",
    min: "${label} cannot be less than ${min}",
    max: "${label} cannot be greater than ${max}",
    range: "${label} must be between ${min} and ${max}",
  },
  array: {
    len: "${label} must be exactly ${len} in length",
    min: "${label} cannot be less than ${min} in length",
    max: "${label} cannot be greater than ${max} in length",
    range: "${label} must be between ${min} and ${max} in length",
  },
  pattern: {
    mismatch: "'${label}' does not match pattern ${pattern}",
  },
};
export const validateMessages = {
    default: "Validation error on field ${name}",
    required: "${name} không được để trống",
    enum: "${name} must be one of [${name}]",
    whitespace: "${name}' cannot be empty",
    date: {
      format: "${name} is invalid for format date",
      parse: "${name} could not be parsed as date",
      invalid: "${name} is invalid date",
    },
    types: {
      string: typeTemplate,
      method: typeTemplate,
      array: typeTemplate,
      object: typeTemplate,
      number: typeTemplate,
      date: typeTemplate,
      boolean: typeTemplate,
      integer: typeTemplate,
      float: typeTemplate,
      regexp: typeTemplate,
      email: typeTemplate,
      url: typeTemplate,
      hex: typeTemplate,
    },
    string: {
      len: "${name} có đúng ${len} ký tự",
      min: "${name} tối thiểu ${min} ký tự",
      max: "${name} tối đa ${max} ký tự",
      range: "${name} từ ${min} đến ${max} ký tự",
    },
    number: {
      len: "${name} must equal ${len}",
      min: "${name} cannot be less than ${min}",
      max: "${name} cannot be greater than ${max}",
      range: "${name} must be between ${min} and ${max}",
    },
    array: {
      len: "${name} must be exactly ${len} in length",
      min: "${name} cannot be less than ${min} in length",
      max: "${name} cannot be greater than ${max} in length",
      range: "${name} must be between ${min} and ${max} in length",
    },
    pattern: {
      mismatch: "${name} does not match pattern ${pattern}",
    },
  };
  export const defaultMessages = {
    required: "Hạng mục không được để trống",
  };

