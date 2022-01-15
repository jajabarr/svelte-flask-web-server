export const FormOptions = {
    username: undefined,
    password: undefined,
    confirm: undefined,
    submit: undefined,
} as const;

interface IFormOptionData {
    type: string;
    name: string;
    component: HTMLInputElement | HTMLButtonElement;
    text: string;
}

// export const options: {
//     -readonly [property in keyof typeof FormOptions]: IFormOptionData;
// } = {
//     username: {
//         type: "text",
//         name: "username",
//         component: label,
//     },
// };
