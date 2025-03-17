const CardFormFields = [
  {
    name: "title",
    placeholder: "Title",
    type: "text",
    required: true,
  },
  {
    name: "subtitle",
    placeholder: "Subtitle",
    type: "text",
    required: true,
  },
  {
    name: "description",
    placeholder: "Description",
    type: "text",
    required: true,
  },
  {
    name: "phone",
    placeholder: "Phone",
    type: "tel",
    required: true,
  },
  {
    name: "email",
    placeholder: "Email",
    type: "email",
    required: true,
  },
  {
    name: "web",
    placeholder: "Website",
    type: "url",
    required: false,
  },
  {
    name: "image.url",
    placeholder: "Image URL",
    type: "text",
    required: true,
  },
  {
    name: "image.alt",
    placeholder: "Image Alt Text",
    type: "text",
    required: true,
  },
  {
    name: "address.state",
    placeholder: "State",
    type: "text",
    required: false,
  },
  {
    name: "address.country",
    placeholder: "Country",
    type: "text",
    required: true,
  },
  {
    name: "address.city",
    placeholder: "City",
    type: "text",
    required: true,
  },
  {
    name: "address.street",
    placeholder: "Street",
    type: "text",
    required: true,
  },
  {
    name: "address.houseNumber",
    placeholder: "House Number",
    type: "number",
    required: true,
  },
  {
    name: "address.zip",
    placeholder: "ZIP Code",
    type: "number",
    required: true,
  },
];

export default CardFormFields;
